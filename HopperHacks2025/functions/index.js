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

// Initialize Gemini with your API key from Firebase config
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.getFoodInfo = onRequest({ cors: true }, async (req, res) => {
  try {
    const { foodName, foodBrand } = req.query;

    if (!foodName || !foodBrand) {
      return res.status(400).json({ error: "Missing food name or brand." });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Return ONLY a raw JSON object analyzing ${foodName} by ${foodBrand}. 
      Include details about:
      - Known contaminants (any harmful substances found in production or final product)
      - Production malpractices (documented issues with manufacturing or handling)
      - Health concerns (specific health risks associated with consumption)
      - Production methods (how the product is made, including industrial processes)
      - Safety record (history of recalls, violations, or safety issues)
      
      Format as:
      {
        "product": {
          "name": "${foodName}",
          "brand": "${foodBrand}"
        },
        "analysis": {
          "contaminants": ["list specific contaminants found"],
          "malpractices": ["list specific documented malpractices"],
          "healthConcerns": ["list specific health risks"],
          "productionMethods": ["list specific production steps and methods"],
          "safetyRecord": "detailed safety history including dates and incidents"
        }
      }
      Be factual and specific. No markdown, no code blocks, no backticks, no explanation.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    // Clean the response
    const text = response
      .text()
      .replace(/```json\n|```/g, "")
      .replace(/\n/g, "")
      .trim();

    try {
      const parsed = JSON.parse(text);
      return res.json(parsed);
    } catch (parseError) {
      console.error("Raw text received:", text);
      return res.status(500).json({
        error: "Failed to parse AI response",
        details: parseError.message,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Failed to fetch data",
      details: error.message,
    });
  }
});

exports.analyzeFoodProduct = onRequest({ cors: true }, async (req, res) => {
  try {
    const { foodName, foodBrand } = req.query;

    if (!foodName || !foodBrand) {
      return res.status(400).json({ error: "Missing food name or brand" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Return ONLY a raw JSON object analyzing ${foodName} by ${foodBrand}. 
    Format the response as:
    {
      "product": {
        "name": "${foodName}",
        "brand": "${foodBrand}"
      },
      "nutrition": {
        "serving_size": "exact serving size with grams",
        "calories": number,
        "fat": "grams with % daily value",
        "saturated_fat": "grams with % daily value",
        "trans_fat": "grams",
        "cholesterol": "mg with % daily value",
        "sodium": "mg with % daily value",
        "carbohydrates": "grams with % daily value",
        "fiber": "grams with % daily value",
        "sugar": "grams",
        "protein": "grams"
      },
      "ingredients": [
        "list all ingredients in order of predominance"
      ],
      "allergens": [
        "list all major allergens present"
      ],
      "dietary_info": {
        "vegan": boolean,
        "vegetarian": boolean,
        "gluten_free": boolean,
        "kosher": boolean,
        "halal": boolean
      }
    }
    Be specific and accurate. No markdown, no code blocks, no backticks, no explanation.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    // Clean the response
    const text = response
      .text()
      .replace(/```json\n|```/g, "")
      .replace(/\n/g, "")
      .trim();

    try {
      const parsed = JSON.parse(text);
      return res.json(parsed);
    } catch (parseError) {
      console.error("Raw text received:", text);
      return res.status(500).json({
        error: "Failed to parse AI response",
        details: parseError.message,
      });
    }
  } catch (error) {
    console.error("Error analyzing food:", error);
    return res.status(500).json({
      error: "Failed to analyze food product",
      details: error.message,
    });
  }
});

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

exports.getFoodCertifications = onRequest({ cors: true }, async (req, res) => {
  try {
    const { foodName, foodBrand } = req.query;

    if (!foodName || !foodBrand) {
      return res.status(400).json({ error: "Missing food name or brand" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Return ONLY a raw JSON object analyzing certifications for ${foodName} by ${foodBrand}.
    Research and verify each certification:
    - USDA Organic (USDA certified organic production)
    - Non-GMO Project Verified (independently verified GMO-free)
    - Cage-Free (for egg/poultry products)
    - Free-Range (animals have outdoor access)
    - Pasture-Raised (animals primarily raised outdoors)
    - Certified Humane (meets humane animal treatment standards)
    - Fair Trade Certified (meets fair labor and sustainable practices)
    - Grass-Fed (for meat/dairy products)
    - No Added Hormones (no synthetic hormone use)
    - rBST-Free (for dairy products)
    - Vegan Certified (contains no animal products)
    - Gluten-Free Certified (meets gluten-free standards)
    - Kosher (meets Jewish dietary laws)
    - Halal (meets Islamic dietary laws)
    - Regenerative Organic Certified (meets soil health and welfare standards)

    Format as:
    {
      "product": {
        "name": "${foodName}",
        "brand": "${foodBrand}"
      },
      "certifications": [
        {
          "name": "certification name",
          "verified": boolean,
          "details": "specific verification details including dates and certifying body",
          "evidence": "link to verification or explanation of status"
        }
      ]
    }
    Be factual and specific. No markdown, no code blocks, no backticks, no explanation.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    // Clean the response
    const text = response
      .text()
      .replace(/```json\n|```/g, "")
      .replace(/\n/g, "")
      .trim();

    try {
      const parsed = JSON.parse(text);
      return res.json(parsed);
    } catch (parseError) {
      console.error("Raw text received:", text);
      return res.status(500).json({
        error: "Failed to parse AI response",
        details: parseError.message,
      });
    }
  } catch (error) {
    console.error("Error getting certifications:", error);
    return res.status(500).json({
      error: "Failed to get food certifications",
      details: error.message,
    });
  }
});
