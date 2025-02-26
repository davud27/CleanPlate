/* eslint-disable object-curly-spacing */
/* eslint-disable quote-props */
/* eslint-disable max-len */
/* eslint-disable indent */

const { onRequest } = require("firebase-functions/v2/https");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const parseAIResponse = (response) => {
  try {
    const rawText = response.text();
    const cleanText = rawText
      .replace(/```json\n|```\n|```/g, "")
      .replace(/^\s+|\s+$/g, "")
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ");

    const parsed = JSON.parse(cleanText);
    if (
      !parsed.product ||
      !parsed.product.name ||
      !parsed.product.brand ||
      !parsed.product.category
    ) {
      throw new Error("Missing required product fields");
    }
    return parsed;
  } catch (error) {
    console.error("Raw response:", response.text());
    throw new Error(`Failed to parse AI response: ${error.message}`);
  }
};

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

  const prompt = `You are a food safety database. For ${foodBrand}'s ${foodName}, provide safety and ethical sourcing information in EXACTLY the following JSON format. Every field is required and must follow these specific formatting rules:

{
  "product": {
    "name": "${foodName}",
    "brand": "${foodBrand}",
    "category": "[Must be one of: Dairy, Meat, Produce, Grains, Beverages, Snacks, Condiments, or Prepared Foods]"
  },
  "general_safety_info": {
    "storage_guidelines": "[Must start with temperature requirements, followed by storage location, then duration. Example: 'Store at 40°F or below in refrigerator for up to 7 days']",
    "handling_tips": "[Must list 2-3 specific handling instructions in comma-separated format. Example: 'Wash hands before handling, use clean utensils, avoid cross-contamination']",
    "common_concerns": [
      {
        "concern": "[Must be a specific safety issue, not general advice. Example: 'Risk of Listeria contamination']",
        "explanation": "[Must explain why the concern exists and how to mitigate it in 1-2 sentences]"
      }
    ],
    "disclaimer": "[Must include the phrase 'This information is for general guidance only' and mention consulting official guidelines]"
  },
  "ethical_sourcing": {
    "sourcing_practices": "[Must describe specific sourcing methods and locations in 1-2 sentences]",
    "sustainability_initiatives": "[Must list concrete environmental or social initiatives, not vague claims]",
    "controversies": [
      {
        "year": "[Must be a specific year, 'Ongoing', or 'Past']",
        "issue": "[Must describe a specific controversy in 1-2 sentences]",
        "resolution": "[Must state current status: 'Resolved', 'In Progress', or 'No Resolution']"
      }
    ],
    "ethical_certifications": "[Must list specific certifications or explicitly state 'No known certifications']",
    "disclaimer": "[Must include the phrase 'Information based on publicly available data' and mention potential updates]"
  }
}

The response MUST:
1. Include ALL fields exactly as shown above
2. Follow the specific formatting rules for each field
3. Use proper JSON formatting with no markdown
4. Include at least one item in common_concerns
5. Include at least one item in controversies
6. Use consistent language and tone throughout
7. Avoid vague or non-specific statements`;

  return handleAIRequest(prompt, res);
});

// Endpoint for nutritional analysis
exports.analyzeFoodProduct = onRequest({ cors: true }, async (req, res) => {
  const { foodName, foodBrand } = req.query;

  if (!foodName || !foodBrand) {
    return res.status(400).json({ error: "Missing food name or brand." });
  }

  const prompt = `You are a nutrition database. For ${foodBrand}'s ${foodName}, provide nutritional information in EXACTLY the following JSON format. Every field is required and must follow these specific formatting rules:

{
  "product": {
    "name": "${foodName}",
    "brand": "${foodBrand}",
    "category": "[Must be one of: Dairy, Meat, Produce, Grains, Beverages, Snacks, Condiments, or Prepared Foods]"
  },
  "general_nutrition_info": {
    "typical_nutrients": "[Must list nutrients in format: 'Nutrient: Amount per serving'. Example: 'Protein: 5g per serving, Fat: 2g per serving']",
    "nutritional_benefits": "[Must list 2-3 specific health benefits with scientific basis]",
    "considerations": "[Must include specific dietary considerations or restrictions]"
  },
  "common_ingredients": {
    "typical_ingredients": "[Must list ingredients in order of predominance, comma-separated]",
    "common_allergens": "[Must list specific allergens or explicitly state 'No common allergens']"
  },
  "dietary_considerations": {
    "general_suitability": "[Must specify suitability for common diets: vegan, vegetarian, gluten-free, etc.]",
    "disclaimer": "[Must include the phrase 'Nutritional content may vary' and mention consulting product packaging]"
  }
}

The response MUST:
1. Include ALL fields exactly as shown above
2. Follow the specific formatting rules for each field
3. Use proper JSON formatting with no markdown
4. Use consistent measurements (g, mg, mcg) throughout
5. Include specific quantities where applicable
6. Avoid vague or non-specific statements`;

  return handleAIRequest(prompt, res);
});

// Endpoint for food certifications
exports.getFoodCertifications = onRequest({ cors: true }, async (req, res) => {
  const { foodName, foodBrand } = req.query;

  if (!foodName || !foodBrand) {
    return res.status(400).json({ error: "Missing food name or brand." });
  }

  const prompt = `You are a food certification database. For ${foodBrand}'s ${foodName}, provide certification information in EXACTLY the following JSON format. Every field is required and must follow these specific formatting rules:

{
  "product": {
    "name": "${foodName}",
    "brand": "${foodBrand}",
    "category": "[Must be one of: Dairy, Meat, Produce, Grains, Beverages, Snacks, Condiments, or Prepared Foods]"
  },
  "certification_education": {
    "relevant_certifications": [
      {
        "name": "[Must be exactly one of the approved certifications listed below]",
        "description": "[Must explain what the certification means in 1-2 sentences]",
        "typical_requirements": "[Must list 2-3 specific requirements for obtaining this certification]"
      }
    ],
    "how_to_verify": "[Must include specific steps to verify authenticity, including where to look on packaging]",
    "disclaimer": "[Must include the phrase 'Certification status may change' and mention verifying current status]"
  }
}

Approved certifications MUST be exactly one of:
- USDA Organic
- Non-GMO Project Verified
- Cage-Free
- Free-Range
- Pasture-Raised
- Certified Humane
- Fair Trade Certified
- Grass-Fed
- No Added Hormones
- rBST-Free
- Vegan Certified
- Gluten-Free Certified
- Kosher
- Halal
- Regenerative Organic Certified

The response MUST:
1. Include ALL fields exactly as shown above
2. Follow the specific formatting rules for each field
3. Use proper JSON formatting with no markdown
4. Include at least one certification
5. Use exact certification names from the approved list
6. Provide specific, verifiable information
7. Maintain consistent language and tone throughout`;

  return handleAIRequest(prompt, res);
});

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
