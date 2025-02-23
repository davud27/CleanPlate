import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState, useEffect } from "react";
//import { motion } from "framer-motion";

// Add this helper function
const groupBy = <T extends Record<string, any>>(
  array: T[],
  key: keyof T
): Record<string, T[]> => {
  return array.reduce(
    (result, item) => {
      const group = item[key] || "Other"; // Use 'Other' as fallback category
      result[group] = result[group] || [];
      result[group].push(item);
      return result;
    },
    {} as Record<string, T[]>
  );
};

// Example data structure
const foodItems = [
  {
    id: "organic-valley-milk",
    name: "Organic Valley - Milk",
    risks: [
      "Contains synthetic growth hormones",
      "Animals were not raised on pasture",
      "May contain traces of antibiotics",
      "Includes artificial additives",
    ],
    benefits: [
      "Free from synthetic pesticides and fertilizers",
      "Produced without the use of hormones",
      "Meets ethical animal welfare standards",
    ],
    alternatives: [
      {
        id: "brand-x-organic-milk",
        name: "Brand X - Organic Whole Milk",
        reason: "Certified Organic, no hormones, pasture-raised",
      },
      {
        id: "brand-y-grassfed-milk",
        name: "Brand Y - Grass-Fed Milk",
        reason: "100% grass-fed, higher in nutrients, ethical farming",
      },
      {
        id: "brand-z-pasture-milk",
        name: "Brand Z - Pasture-Raised Dairy",
        reason: "Humane certified, no antibiotics, sustainable practices",
      },
    ],
  },
];

// Add the labels data
const labelDefinitions = [
  {
    label: "USDA Organic",
    definition:
      "Certified by the United States Department of Agriculture, indicating that the food is produced without synthetic pesticides, GMOs, or artificial fertilizers.",
  },
  {
    label: "Non-GMO Project Verified",
    definition:
      "Indicates that the product has been tested and confirmed to be free from genetically modified organisms (GMOs).",
  },
  {
    label: "Cage-Free",
    definition:
      "Hens are not kept in cages and have some space to move around indoors, but may not have outdoor access.",
  },
  {
    label: "Free-Range",
    definition:
      "Animals are given some access to the outdoors, allowing for more natural behavior compared to conventional farming.",
  },
  {
    label: "Pasture-Raised",
    definition:
      "Animals spend a significant amount of time outdoors on pasture, with access to grass and a natural diet.",
  },
  {
    label: "Certified Humane",
    definition:
      "Indicates that animals are raised according to humane standards, with proper care and living conditions.",
  },
  {
    label: "Fair Trade Certified",
    definition:
      "Ensures that producers receive fair wages and work in safe conditions, promoting sustainable farming practices.",
  },
  {
    label: "Grass-Fed",
    definition:
      "Refers to animals that have been raised primarily on grass, promoting better animal welfare and nutrition.",
  },
  {
    label: "No Added Hormones",
    definition:
      "Indicates that no synthetic hormones have been used in the production of the animal product.",
  },
  {
    label: "rBST-Free (Dairy)",
    definition:
      "Dairy products from cows that have not been treated with the synthetic hormone recombinant bovine somatotropin (rBST).",
  },
  {
    label: "Vegan Certified",
    definition:
      "No animal-derived ingredients are used in the product, making it suitable for vegan diets.",
  },
  {
    label: "Gluten-Free Certified",
    definition:
      "Indicates that the product meets standards for being free from gluten, making it safe for those with gluten intolerance or celiac disease.",
  },
  {
    label: "Kosher",
    definition:
      "Food that meets Jewish dietary laws, ensuring proper preparation and ingredients.",
  },
  {
    label: "Halal",
    definition:
      "Food that is permissible according to Islamic law, following specific dietary guidelines.",
  },
  {
    label: "Regenerative Organic Certified",
    definition:
      "A holistic label focusing on soil health, biodiversity, and animal welfare, going beyond traditional organic standards.",
  },
];

// Add these interfaces for type safety
interface NutritionData {
  product: {
    name: string;
    brand: string;
    matched_product: string;
  };
  nutrition: {
    serving_size: string;
    calories: number;
    fat: string;
    saturated_fat: string;
    trans_fat: string;
    cholesterol: string;
    sodium: string;
    carbohydrates: string;
    fiber: string;
    sugar: string;
    protein: string;
  };
  ingredients: string[];
  allergens: string[];
  dietary_info: {
    vegan: boolean;
    vegetarian: boolean;
    gluten_free: boolean;
    kosher: boolean;
    halal: boolean;
  };
}

interface SafetyData {
  product: {
    name: string;
    brand: string;
    matched_product: string;
  };
  analysis: {
    contaminants: string[];
    malpractices: string[];
    healthConcerns: string[];
    productionMethods: string[];
    safetyRecord: string;
  };
}

interface CertificationData {
  product: {
    name: string;
    brand: string;
    matched_product: string;
  };
  certifications: Array<{
    name: string;
    verified: boolean;
    details: string;
  }>;
}

export const Route = createFileRoute("/results")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      product: String(search.product || ""),
      productBrand: String(search.productBrand || ""),
    };
  },
  component: RouteComponent,
});

function LabelExplanations() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-lg transition-colors duration-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-[#2E7D32] dark:text-[#4CAF50] hover:text-[#1B5E20] transition-colors"
      >
        <h2 className="text-2xl font-bold">
          Common Food Labels & Their Definitions
        </h2>
        {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>

      {isExpanded && (
        <div className="mt-6 space-y-4">
          {labelDefinitions.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0"
            >
              <h3 className="font-semibold text-[#2E7D32] dark:text-[#4CAF50] mb-1">
                {item.label}
              </h3>
              <p className="text-[#37474F] dark:text-gray-300 text-sm leading-relaxed">
                {item.definition}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function FoodItemCard({
  item,
  productName,
  productBrand,
}: {
  item: (typeof foodItems)[0];
  productName: string;
  productBrand: string;
}) {
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(
    null
  );
  const [safetyData, setSafetyData] = useState<SafetyData | null>(null);
  const [certificationData, setCertificationData] =
    useState<CertificationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Cloud Run Function URLs
        const urls = {
          analyze: "https://analyzefoodproduct-cmx325nlca-uc.a.run.app",
          foodInfo: "https://getfoodinfo-cmx325nlca-uc.a.run.app",
          certifications:
            "https://getfoodcertifications-cmx325nlca-uc.a.run.app",
        };

        const [nutritionRes, safetyRes, certificationRes] = await Promise.all([
          fetch(
            `${urls.analyze}?foodName=${encodeURIComponent(productName)}&foodBrand=${encodeURIComponent(productBrand)}`
          ),
          fetch(
            `${urls.foodInfo}?foodName=${encodeURIComponent(productName)}&foodBrand=${encodeURIComponent(productBrand)}`
          ),
          fetch(
            `${urls.certifications}?foodName=${encodeURIComponent(productName)}&foodBrand=${encodeURIComponent(productBrand)}`
          ),
        ]);

        const [nutritionData, safetyData, certificationData] =
          await Promise.all([
            nutritionRes.json(),
            safetyRes.json(),
            certificationRes.json(),
          ]);

        console.log("Safety Data:", safetyData);
        console.log("Certification Data:", certificationData);

        setNutritionData(nutritionData);
        setSafetyData(safetyData);
        setCertificationData(certificationData);
      } catch (err) {
        setError("Failed to fetch product data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productName, productBrand]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex gap-8 animate-fadeIn">
      {/* Left Sidebar */}
      <div className="w-1/3 space-y-6 animate-slideIn">
        <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <h1 className="text-4xl font-bold text-[#2E7D32] dark:text-[#4CAF50]">
            {nutritionData?.product.matched_product ||
              `${productBrand} - ${productName}`}
          </h1>
          <p className="text-[#37474F] dark:text-gray-300 text-xl">
            Product Details
          </p>
          {/* Image placeholder */}
          <div className="mt-6 aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Product Image</p>
          </div>
        </section>

        {/* Nutrition Label */}
        <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4 border-b-2 pb-2">
            Nutrition Facts
          </h2>
          {nutritionData && (
            <div className="space-y-4">
              <div className="border-b pb-2">
                <p className="font-bold">
                  Serving Size {nutritionData.nutrition.serving_size}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Calories</span>
                  <span>{nutritionData.nutrition.calories}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fat</span>
                  <span>{nutritionData.nutrition.fat}</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturated Fat</span>
                  <span>{nutritionData.nutrition.saturated_fat}</span>
                </div>
                <div className="flex justify-between">
                  <span>Trans Fat</span>
                  <span>{nutritionData.nutrition.trans_fat}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cholesterol</span>
                  <span>{nutritionData.nutrition.cholesterol}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sodium</span>
                  <span>{nutritionData.nutrition.sodium}</span>
                </div>
                <div className="flex justify-between">
                  <span>Carbohydrates</span>
                  <span>{nutritionData.nutrition.carbohydrates}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fiber</span>
                  <span>{nutritionData.nutrition.fiber}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sugar</span>
                  <span>{nutritionData.nutrition.sugar}</span>
                </div>
                <div className="flex justify-between">
                  <span>Protein</span>
                  <span>{nutritionData.nutrition.protein}</span>
                </div>
              </div>
              <div className="border-t pt-4 mt-4">
                <p className="font-bold text-lg mb-2">Ingredients</p>
                <p className="text-sm leading-relaxed">
                  {nutritionData.ingredients.join(", ")}
                </p>
              </div>
              <div className="border-t pt-4">
                <p className="font-bold text-lg mb-2">Allergens</p>
                <p className="text-sm text-red-600">
                  {nutritionData.allergens.join(", ")}
                </p>
              </div>
              <div className="border-t pt-4">
                <p className="font-bold text-lg mb-2">Dietary Information</p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    Vegan: {nutritionData.dietary_info.vegan ? "Yes" : "No"}
                  </div>
                  <div>
                    Vegetarian:{" "}
                    {nutritionData.dietary_info.vegetarian ? "Yes" : "No"}
                  </div>
                  <div>
                    Gluten-Free:{" "}
                    {nutritionData.dietary_info.gluten_free ? "Yes" : "No"}
                  </div>
                  <div>
                    Kosher: {nutritionData.dietary_info.kosher ? "Yes" : "No"}
                  </div>
                  <div>
                    Halal: {nutritionData.dietary_info.halal ? "Yes" : "No"}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Right Content */}
      <div className="w-2/3 space-y-8">
        <section className="text-center animate-fadeDown">
          <h2 className="text-3xl font-bold text-[#2E7D32] dark:text-[#4CAF50] mb-2">
            Product Analysis Results
          </h2>
        </section>

        {/* Risks Section */}
        <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-amber-600" size={24} />
            <h2 className="text-2xl font-bold">Risks to Consider</h2>
          </div>
          {safetyData && safetyData.analysis && (
            <div className="space-y-4">
              {safetyData.analysis.healthConcerns?.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Health Concerns</h3>
                  <ul className="space-y-2">
                    {safetyData.analysis.healthConcerns.map(
                      (concern, index) => (
                        <li
                          key={index}
                          className="flex items-center bg-red-50 p-3 rounded-md text-red-700"
                        >
                          <div>
                            <p className="font-semibold">{concern.issue}</p>
                            <p className="text-sm">{concern.summary}</p>
                            <p className="text-xs italic mt-1">
                              Source: {concern.source}
                            </p>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
              {safetyData.analysis.contaminants?.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Contaminants</h3>
                  <ul className="space-y-2">
                    {safetyData.analysis.contaminants.map(
                      (contaminant, index) => (
                        <li
                          key={index}
                          className="flex items-center bg-orange-50 p-3 rounded-md text-orange-700"
                        >
                          <div>
                            <p className="font-semibold">{contaminant.issue}</p>
                            <p className="text-sm">{contaminant.summary}</p>
                            <p className="text-xs italic mt-1">
                              Source: {contaminant.source}
                            </p>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
              {safetyData.analysis.productionMethods?.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Production Methods</h3>
                  <ul className="space-y-2">
                    {safetyData.analysis.productionMethods.map(
                      (method, index) => (
                        <li
                          key={index}
                          className="flex items-center bg-blue-50 p-3 rounded-md text-blue-700"
                        >
                          <div>
                            <p className="font-semibold">{method.method}</p>
                            <p className="text-sm">{method.impact}</p>
                            <p className="text-xs italic mt-1">
                              Source: {method.source}
                            </p>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <h3 className="font-semibold mb-2">Safety Record</h3>
                <p>{safetyData.analysis.safetyRecord}</p>
              </div>
            </div>
          )}
        </section>

        {/* Certifications Section */}
        <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="text-green-600" size={24} />
            <h2 className="text-2xl font-bold">Certifications</h2>
          </div>
          {certificationData &&
            certificationData.certifications?.length > 0 && (
              <div className="space-y-4">
                {Object.entries(
                  groupBy(certificationData.certifications, "category")
                ).map(([category, certs]) => (
                  <div key={category} className="border-b last:border-0 pb-4">
                    <h3 className="font-semibold mb-2">{category}</h3>
                    <ul className="space-y-2">
                      {certs.map((cert, index) => (
                        <li
                          key={index}
                          className={`flex items-center p-3 rounded-md ${
                            cert.verified
                              ? "bg-green-50 text-green-700"
                              : "bg-gray-50 text-gray-700"
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold">{cert.name}</span>
                              {cert.verified && (
                                <CheckCircle
                                  className="text-green-600"
                                  size={16}
                                />
                              )}
                            </div>
                            <p className="text-sm mt-1">{cert.details}</p>
                            {cert.verifying_body !== "N/A" && (
                              <p className="text-xs italic mt-1">
                                Verified by: {cert.verifying_body}
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
        </section>

        {/* Recommendations with interactive cards */}
        <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-lg animate-slideUpFade [animation-delay:800ms] transition-colors duration-200">
          <div className="flex items-center gap-2 mb-4">
            <Star className="text-yellow-500" size={24} />
            <h2 className="text-2xl font-bold text-[#37474F] dark:text-gray-300">
              Recommended Alternatives
            </h2>
          </div>
          <ul className="space-y-4">
            {item.alternatives.map((alternative, index) => (
              <Link
                key={index}
                to="/results"
                search={{
                  product: alternative.name,
                  productBrand: alternative.id,
                }}
                className="block bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <h3 className="font-semibold text-blue-800 dark:text-blue-200">
                  {alternative.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-300 mt-1 text-sm">
                  {alternative.reason}
                </p>
              </Link>
            ))}
          </ul>
        </section>

        {/* Label Explanations */}
        <LabelExplanations />
      </div>
    </div>
  );
}

function RouteComponent() {
  const search = Route.useSearch();
  const { product, productBrand } = search;

  if (!product || !productBrand) {
    return (
      <div className="min-h-screen pt-28 bg-[#FAF3E0] dark:bg-gray-900 p-8 transition-colors duration-200">
        <div className="max-w-4xl mx-auto space-y-8">
          <section className="text-center">
            <h1 className="text-4xl font-bold text-[#2E7D32] dark:text-[#4CAF50] mb-2">
              No product selected
            </h1>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 bg-[#FAF3E0] dark:bg-gray-900 p-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <FoodItemCard
          item={foodItems[0]}
          productName={product}
          productBrand={productBrand}
        />
      </div>
    </div>
  );
}

export default function Results() {
  return (
    <div className="min-h-screen pt-28 bg-[#FAF3E0] dark:bg-gray-900 p-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-lg transition-colors duration-200">
          <h1 className="text-4xl font-bold text-[#2E7D32] dark:text-[#4CAF50] mb-4 transition-colors duration-200">
            Results
          </h1>
          <div className="text-[#37474F] dark:text-gray-300 transition-colors duration-200">
            {/* Results content */}
          </div>
        </section>
      </div>
    </div>
  );
}
