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

// Initialize Gemini with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Helper function to clean and parse AI response
const parseAIResponse = (response) => {
  try {
    // First get the raw text
    const rawText = response.text();

    // Remove any markdown code blocks, backticks, and normalize whitespace
    const cleanText = rawText
      .replace(/```json\n|```\n|```/g, "") // Remove code block markers
      .replace(/^\s+|\s+$/g, "") // Trim whitespace
      .replace(/\n/g, " ") // Replace newlines with spaces
      .replace(/\s+/g, " "); // Normalize spaces

    // Attempt to parse the cleaned JSON
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Raw response:", response.text());
    throw new Error(`Failed to parse AI response: ${error.message}`);
  }
};

// Generic function to handle AI requests
const handleAIRequest = async (prompt, res) => {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const parsed = parseAIResponse(response);
    return res.json(parsed);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Request failed",
      details: error.message,
    });
  }
};

// Endpoint for food safety information
exports.getFoodInfo = onRequest({ cors: true }, async (req, res) => {
  const { foodName, foodBrand } = req.query;

  if (!foodName || !foodBrand) {
    return res.status(400).json({ error: "Missing food name or brand." });
  }

  const prompt = `You are a precise JSON generator focused on food safety. For ${foodName} by ${foodBrand}, search reputable sources like FDA.gov, USDA.gov, and FoodSafety.gov for real safety information. Always return data - use "N/A" if information is unavailable. Generate a single, valid JSON object. Format must be exactly:
  {
    "product":{
      "name":"${foodName}",
      "brand":"${foodBrand}",
      "matched_product":"[Exact match or closest similar product or 'N/A']"
    },
    "analysis":{
      "contaminants":[
        {"issue":"[Issue or 'N/A']","source":"[Source or 'N/A']","summary":"[One-sentence summary or 'No reported issues found']"}
      ],
      "malpractices":[
        {"issue":"[Issue or 'N/A']","source":"[Source or 'N/A']","summary":"[One-sentence summary or 'No reported issues found']"}
      ],
      "healthConcerns":[
        {"issue":"[Issue or 'N/A']","source":"[Source or 'N/A']","summary":"[One-sentence summary or 'No reported issues found']"}
      ],
      "productionMethods":[
        {"method":"[Method or 'N/A']","impact":"[Impact or 'N/A']","source":"[Source or 'N/A']"}
      ],
      "safetyRecord":"[Safety record summary or 'No significant safety records found']"
    }
  }
  
  IMPORTANT: Never return empty arrays. If no information is found for a category, include one item with 'N/A' values. Always provide at least one entry for each array with either real information or placeholder 'N/A' values. Response must be valid JSON only.`;

  return handleAIRequest(prompt, res);
});

// Endpoint for nutritional analysis
exports.analyzeFoodProduct = onRequest({ cors: true }, async (req, res) => {
  const { foodName, foodBrand } = req.query;

  if (!foodName || !foodBrand) {
    return res.status(400).json({ error: "Missing food name or brand." });
  }

  const prompt = `You are a precise JSON generator with access to Nutritionix database (nutritionix.com). For ${foodName} by ${foodBrand}, generate a single, valid JSON object. Always return data - use "N/A" for unknown values and "0" for unknown numbers. Format must be exactly:
  {
    "product":{
      "name":"${foodName}",
      "brand":"${foodBrand}",
      "matched_product":"[Exact match or closest similar product or 'N/A']"
    },
    "nutrition":{
      "serving_size":"[Size or 'N/A']",
      "calories":[Number or 0],
      "fat":"[Amount or 'N/A']",
      "saturated_fat":"[Amount or 'N/A']",
      "trans_fat":"[Amount or 'N/A']",
      "cholesterol":"[Amount or 'N/A']",
      "sodium":"[Amount or 'N/A']",
      "carbohydrates":"[Amount or 'N/A']",
      "fiber":"[Amount or 'N/A']",
      "sugar":"[Amount or 'N/A']",
      "protein":"[Amount or 'N/A']"
    },
    "ingredients":["[At least one ingredient or 'Ingredients not available']"],
    "allergens":["[At least one allergen or 'No allergen information available']"],
    "dietary_info":{
      "vegan":[true/false],
      "vegetarian":[true/false],
      "gluten_free":[true/false],
      "kosher":[true/false],
      "halal":[true/false]
    }
  }
  
  IMPORTANT: Never return empty arrays. Arrays must contain at least one item, even if it's just a placeholder message. All fields must have a value - use 'N/A' for unknown text, 0 for unknown numbers, and false for unknown booleans. Response must be valid JSON only.`;

  return handleAIRequest(prompt, res);
});

// Endpoint for food certifications
exports.getFoodCertifications = onRequest({ cors: true }, async (req, res) => {
  const { foodName, foodBrand } = req.query;

  if (!foodName || !foodBrand) {
    return res.status(400).json({ error: "Missing food name or brand." });
  }

  const prompt = `You are a precise JSON generator focused on food certifications. For ${foodName} by ${foodBrand}, search for official certifications and generate a single, valid JSON object. Format must be exactly:
  {
    "product": {
      "name": "${foodName}",
      "brand": "${foodBrand}",
      "matched_product": "[Exact match or closest similar product or 'N/A']"
    },
    "certifications": [
      {
        "name": "[Certification name]",
        "verified": [true/false],
        "details": "[Verification details or 'Not certified']",
        "category": "[One of: Organic, Safety, Quality, Ethical, Dietary, Environmental, Animal Welfare]",
        "verifying_body": "[Organization name or 'N/A']"
      }
    ]
  }

  Search specifically for these certifications:
  
  Organic Certifications:
  - USDA Organic
  - EU Organic
  - Canada Organic
  - JAS Organic (Japan)
  - Bio Suisse
  - Demeter
  
  Safety & Quality:
  - HACCP
  - GFSI
  - SQF
  - BRCGS
  - ISO 22000
  - FSSC 22000
  - USDA Grade A/B
  
  Sustainability & Ethical:
  - Rainforest Alliance
  - Fair Trade Certified
  - Food Justice Certified
  - Regenerative Organic
  
  Animal & Marine:
  - Certified Humane
  - Animal Welfare Approved
  - Marine Stewardship Council (MSC)
  - Aquaculture Stewardship Council (ASC)
  
  Dietary & Allergen:
  - Non-GMO Project Verified
  - Gluten-Free (GFCO)
  - Whole30 Approved
  - Kosher (OU, Star-K, etc.)
  - Halal (IFANCA, etc.)
  - Paleo Certified
  - Vegan Certified
  
  Product-Specific:
  - A2 Milk Certified
  - Real California Milk

  IMPORTANT RULES:
  1. Always include at least one certification in the array
  2. If no certifications found, include {"name": "No certifications found", "verified": false, "details": "No verified certifications available", "category": "N/A", "verifying_body": "N/A"}
  3. For each found certification, verify against official certification databases where possible
  4. Include specific verifying body names when available
  5. Set verified=true only when there's concrete evidence of current certification
  6. Response must be valid JSON only
  7. Never return empty arrays

  Focus on current, verifiable certifications from official sources only. No speculation.`;

  return handleAIRequest(prompt, res);
});

// Debug endpoint for testing prompts
exports.debugAI = onRequest({ cors: true }, async (req, res) => {
  const { prompt } = req.query;

  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt parameter" });
  }

  try {
    const result = await model.generateContent(prompt);
    return res.json({
      success: true,
      response: (await result.response).text(),
    });
  } catch (error) {
    return res.status(500).json({
      error: "Debug failed",
      details: error.message,
    });
  }
});
