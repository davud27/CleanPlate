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

// Initialize Gemini with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });



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
