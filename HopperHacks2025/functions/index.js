/* eslint-disable object-curly-spacing */
/* eslint-disable quote-props */
/* eslint-disable max-len */
/* eslint-disable indent */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const functions = require("firebase-functions");
const axios = require("axios");
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors")({ origin: true });
const NodeCache = require("node-cache");

// Initialize cache with 30-minute TTL
const responseCache = new NodeCache({ stdTTL: 1800 });

// Initialize Gemini with your API key from Firebase config
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Request throttling configuration
const rateLimit = {
  maxCalls: 50,
  periodSeconds: 60,
  maxConcurrent: 10,
};

// Response validation schemas
const responseSchemas = {
  foodInfo: {
    required: ["product", "analysis"],
    product: [
      "name",
      "brand",
      "category",
      "variant",
      "inferredFrom",
      "verificationSource",
    ],
    analysis: [
      "contaminants",
      "healthConcerns",
      "productionMethods",
      "safetyRecord",
      "dataConfidence",
      "lastVerified",
      "sources",
    ],
  },
  nutritionInfo: {
    required: [
      "product",
      "nutrition",
      "ingredients",
      "dietary_info",
      "allergens",
      "dataConfidence",
      "lastVerified",
    ],
    product: ["name", "brand", "variant", "inferredFrom", "dataSource"],
  },
  certifications: {
    required: [
      "product",
      "certifications",
      "alternatives",
      "dataConfidence",
      "lastVerified",
    ],
    certifications: [
      "name",
      "verified",
      "certifier",
      "details",
      "verificationSource",
    ],
  },
};

// Validate request parameters
const validateRequest = (req) => {
  const { foodName, foodBrand } = req.query;

  if (!foodName?.trim() || !foodBrand?.trim()) {
    throw new Error("Missing or invalid food name or brand");
  }

  if (foodName.length > 100 || foodBrand.length > 100) {
    throw new Error("Input parameters too long");
  }

  // Sanitize inputs
  return {
    foodName: foodName.trim().replace(/[^\w\s-]/g, ""),
    foodBrand: foodBrand.trim().replace(/[^\w\s-]/g, ""),
  };
};

// Validate AI response structure
const validateResponse = (data, type) => {
  const schema = responseSchemas[type];

  if (!schema) {
    throw new Error("Invalid schema type");
  }

  for (const field of schema.required) {
    if (!data[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  if (
    type === "foodInfo" &&
    (!data.analysis ||
      !schema.analysis.every((field) => Array.isArray(data.analysis[field])))
  ) {
    throw new Error("Invalid analysis structure");
  }

  return data;
};

// Clean and parse AI response
const cleanAndParseResponse = (response, type) => {
  try {
    const text = response
      .text()
      .replace(/```json\n|```/g, "")
      .replace(/\n/g, "")
      .trim();

    const parsed = JSON.parse(text);
    return validateResponse(parsed, type);
  } catch (error) {
    logger.error("Response parsing error:", error);
    throw new Error("Failed to parse AI response");
  }
};

// Generate cache key
const getCacheKey = (foodName, foodBrand, endpoint) => {
  return `${foodName.toLowerCase()}_${foodBrand.toLowerCase()}_${endpoint}`;
};

// Common error handler with detailed logging
const handleError = (error, res) => {
  const errorDetails = {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
  };

  logger.error("Function error:", errorDetails);

  const status = error.message.includes("Missing")
    ? 400
    : error.message.includes("rate limit")
      ? 429
      : error.message.includes("Invalid")
        ? 422
        : 500;

  return res.status(status).json({
    error: error.message,
    timestamp: errorDetails.timestamp,
  });
};

// Generate AI content with retries
const generateAIContent = async (prompt, type, retries = 2) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  for (let i = 0; i <= retries; i++) {
    try {
      const result = await model.generateContent(prompt);
      return cleanAndParseResponse(result.response, type);
    } catch (error) {
      if (i === retries) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};

// Enhanced prompt generators with product disambiguation
const promptGenerators = {
  foodInfo: (foodName, foodBrand) => `
    You are a food safety and analysis expert. Analyze this product:
    Food Name: ${foodName}
    Brand: ${foodBrand}

    Important Guidelines:
    1. Only include FACTUAL, VERIFIED information
    2. If information is uncertain, exclude it
    3. Use official sources (FDA, USDA, manufacturer data)
    4. Do not make assumptions without clear evidence
    5. Include source citations where possible

    Return ONLY a raw JSON object with this structure:
    {
      "product": {
        "name": "exact product name",
        "brand": "verified manufacturer name",
        "category": "FDA/USDA product category",
        "variant": "specific product variant",
        "inferredFrom": "explain how product was identified",
        "verificationSource": "source of product verification"
      },
      "analysis": {
        "contaminants": [
          "only include documented contaminants with citation"
        ],
        "healthConcerns": [
          "only verified health concerns with research backing"
        ],
        "productionMethods": [
          "only confirmed production practices from manufacturer/regulators"
        ],
        "safetyRecord": [
          "only documented recalls/incidents with dates"
        ],
        "dataConfidence": "high|medium|low",
        "lastVerified": "date of most recent data verification",
        "sources": [
          "list of authoritative sources used"
        ]
      }
    }`,

  nutritionInfo: (foodName, foodBrand) => `
    You are a nutritionist specializing in food composition. Analyze this product:
    Food Name: ${foodName}
    Brand: ${foodBrand}

    Important Guidelines:
    1. Use only official nutrition facts from manufacturer/USDA
    2. Do not estimate values without clear indication
    3. Include serving sizes exactly as labeled
    4. Verify all dietary claims
    5. List all ingredients in order as shown on label

    Return ONLY a raw JSON object with this structure:
    {
      "product": {
        "name": "exact product name",
        "brand": "verified manufacturer name",
        "variant": "specific variant",
        "inferredFrom": "source of nutritional data",
        "dataSource": "USDA/manufacturer label/other official source"
      },
      "nutrition": {
        "serving_size": "exact amount as labeled",
        "servings_per_container": "number",
        "calories": "exact number",
        "total_fat": {"amount": "g", "dv": "%"},
        "saturated_fat": {"amount": "g", "dv": "%"},
        "trans_fat": {"amount": "g"},
        "cholesterol": {"amount": "mg", "dv": "%"},
        "sodium": {"amount": "mg", "dv": "%"},
        "total_carbohydrates": {"amount": "g", "dv": "%"},
        "dietary_fiber": {"amount": "g", "dv": "%"},
        "sugars": {"amount": "g"},
        "protein": {"amount": "g"}
      },
      "ingredients": [
        "exact ingredient list in order"
      ],
      "dietary_info": {
        "vegan": "boolean with verification",
        "vegetarian": "boolean with verification",
        "gluten_free": "boolean with certification if applicable",
        "organic": "boolean with certification if applicable"
      },
      "allergens": [
        "verified allergen statements"
      ],
      "dataConfidence": "high|medium|low",
      "lastVerified": "date of nutrition data"
    }`,

  certifications: (foodName, foodBrand) => `
    You are a food certification verification specialist. Analyze this product:
    Food Name: ${foodName}
    Brand: ${foodBrand}

    Important Guidelines:
    1. Only include current, verified certifications
    2. Check certification validity dates
    3. Verify through official certification bodies
    4. Include certification numbers where available
    5. Only suggest alternatives with verified better certifications

    Return ONLY a raw JSON object with this structure:
    {
      "product": {
        "name": "exact product name",
        "brand": "verified manufacturer name",
        "variant": "specific variant",
        "inferredFrom": "certification verification source"
      },
      "certifications": [
        {
          "name": "certification name",
          "verified": "boolean based on current verification",
          "certifier": "certifying body name",
          "certificationNumber": "if available",
          "validUntil": "expiration date if available",
          "details": "specific certification criteria met",
          "verificationSource": "source used to verify certification"
        }
      ],
      "alternatives": [
        {
          "id": "unique identifier",
          "name": "verified product name",
          "brand": "verified brand name",
          "reason": "specific certification advantages",
          "certifications": [
            "list of verified certifications"
          ],
          "verificationSource": "source of alternative product data"
        }
      ],
      "dataConfidence": "high|medium|low",
      "lastVerified": "date of certification verification"
    }

    Only include alternatives with definitively better certification profiles.
    If certification status is unclear, set verified to false and explain in details.`,
};

// Update the createEndpointHandler to use the new prompt generators
const createEndpointHandler = (type) => {
  return async (req, res) => {
    try {
      const { foodName, foodBrand } = validateRequest(req);
      const cacheKey = getCacheKey(foodName, foodBrand, type);

      // Check cache
      const cachedResponse = responseCache.get(cacheKey);
      if (cachedResponse) {
        return res.json(cachedResponse);
      }

      const prompt = promptGenerators[type](foodName, foodBrand);
      const result = await generateAIContent(prompt, type);

      // Cache the result
      responseCache.set(cacheKey, result);

      return res.json(result);
    } catch (error) {
      return handleError(error, res);
    }
  };
};

// Update the exports to use the simplified handler
exports.getFoodInfo = onRequest(
  {
    cors: true,
    ...rateLimit,
    memory: "256MiB",
    timeoutSeconds: 30,
  },
  createEndpointHandler("foodInfo")
);

exports.analyzeFoodProduct = onRequest(
  {
    cors: true,
    ...rateLimit,
    memory: "256MiB",
    timeoutSeconds: 30,
  },
  createEndpointHandler("nutritionInfo")
);

exports.getFoodCertifications = onRequest(
  {
    cors: true,
    ...rateLimit,
    memory: "256MiB",
    timeoutSeconds: 30,
  },
  createEndpointHandler("certifications")
);

exports.debugAI = onRequest({ cors: true }, async (req, res) => {
  try {
    const { prompt } = req.query;

    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt parameter" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;

    return res.json({
      success: true,
      prompt: prompt,
      response: response.text(),
    });
  } catch (error) {
    console.error("Debug Error:", error);
    return res.status(500).json({
      error: "Debug API failed",
      details: error.message,
    });
  }
});
