import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle,
  Star,
  ChevronDown,
  ChevronUp,
  Scale,
  AlertCircle,
  Search,
  Shield,
  Info,
} from "lucide-react";
import { useState, useEffect } from "react";
import React from "react";
//import { motion } from "framer-motion";

// Add this helper function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const groupBy = <T extends Record<string, unknown>>(
  array: T[],
  key: keyof T
): Record<string, T[]> => {
  return array.reduce(
    (result, item) => {
      const group = item[key] || "Other";
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

interface NutritionData {
  product: {
    name: string;
    brand: string;
    category: string;
  };
  general_nutrition_info: {
    typical_nutrients: string;
    nutritional_benefits: string;
    considerations: string;
  };
  common_ingredients: {
    typical_ingredients: string;
    common_allergens: string;
  };
  dietary_considerations: {
    general_suitability: string;
    disclaimer: string;
  };
}

interface EthicalSourcing {
  sourcing_practices: string;
  sustainability_initiatives: string;
  controversies: Array<{
    year: string;
    issue: string;
    resolution: string;
  }>;
  ethical_certifications: string;
  disclaimer: string;
}

interface SafetyData {
  product: {
    name: string;
    brand: string;
    category: string;
  };
  general_safety_info: {
    storage_guidelines: string;
    handling_tips: string;
    common_concerns: Array<{
      concern: string;
      explanation: string;
    }>;
    disclaimer: string;
  };
  ethical_sourcing: EthicalSourcing;
}

interface CertificationData {
  product: {
    name: string;
    brand: string;
    category: string;
  };
  certification_education: {
    relevant_certifications: Array<{
      name: string;
      description: string;
      typical_requirements: string;
    }>;
    how_to_verify: string;
    disclaimer: string;
  };
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

function EthicalSourcingSection({
  ethicalData,
}: {
  ethicalData: EthicalSourcing;
}) {
  return (
    <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-6">
        <Scale className="text-blue-600" size={24} />
        <h2 className="text-2xl font-bold">Ethical Sourcing</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-[#2E7D32] dark:text-[#4CAF50] mb-2">
            Sourcing Practices
          </h3>
          <p className="text-sm">{ethicalData.sourcing_practices}</p>
        </div>

        <div>
          <h3 className="font-semibold text-[#2E7D32] dark:text-[#4CAF50] mb-2">
            Sustainability Initiatives
          </h3>
          <p className="text-sm">{ethicalData.sustainability_initiatives}</p>
        </div>

        {ethicalData.controversies.length > 0 && (
          <div>
            <h3 className="font-semibold text-red-600 mb-2">
              Known Controversies
            </h3>
            <div className="space-y-3">
              {ethicalData.controversies.map((controversy, index) => (
                <div
                  key={index}
                  className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="text-red-600" size={16} />
                    <span className="font-semibold text-sm">
                      {controversy.year}
                    </span>
                  </div>
                  <p className="text-sm mb-2">{controversy.issue}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Resolution: {controversy.resolution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {ethicalData.ethical_certifications && (
          <div>
            <h3 className="font-semibold text-[#2E7D32] dark:text-[#4CAF50] mb-2">
              Ethical Certifications
            </h3>
            <p className="text-sm">{ethicalData.ethical_certifications}</p>
          </div>
        )}

        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
          <p className="text-sm italic text-gray-600 dark:text-gray-400">
            {ethicalData.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}

function CertificationSection({
  certificationData,
}: {
  certificationData: CertificationData;
}) {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  return (
    <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="text-green-600" size={24} />
        <h2 className="text-2xl font-bold">Certifications</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificationData.certification_education.relevant_certifications.map(
            (cert, index) => (
              <div
                key={index}
                className={`
                bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg cursor-pointer
                transition-all duration-200 hover:shadow-md
                ${selectedCert === cert.name ? "ring-2 ring-green-500" : ""}
              `}
                onClick={() =>
                  setSelectedCert(selectedCert === cert.name ? null : cert.name)
                }
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#2E7D32] dark:text-[#4CAF50] mb-2 flex items-center gap-2">
                      <CheckCircle size={16} />
                      {cert.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {cert.description}
                    </p>
                  </div>
                  <Info
                    size={16}
                    className={`mt-1 transition-transform duration-200 ${
                      selectedCert === cert.name ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {selectedCert === cert.name && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      Requirements:
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {cert.typical_requirements}
                    </p>
                  </div>
                )}
              </div>
            )
          )}
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Search className="text-blue-600 dark:text-blue-400" size={20} />
            <h3 className="font-semibold text-blue-800 dark:text-blue-300">
              How to Verify These Certifications
            </h3>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-200">
            {certificationData.certification_education.how_to_verify}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <p className="text-sm italic text-gray-600 dark:text-gray-400">
            {certificationData.certification_education.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}

function ErrorState({ error, retry }: { error: string; retry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="text-red-500">
        <AlertTriangle size={32} />
      </div>
      <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
      <button
        onClick={retry}
        className="px-4 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-200 rounded-md transition-colors"
      >
        Try Again
      </button>
    </div>
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

  const isValidSafetyData = (data: any): data is SafetyData => {
    return (
      data?.general_safety_info &&
      typeof data.general_safety_info.storage_guidelines === "string" &&
      typeof data.general_safety_info.handling_tips === "string" &&
      Array.isArray(data.general_safety_info.common_concerns)
    );
  };

  const isValidNutritionData = (data: any): data is NutritionData => {
    return (
      data?.general_nutrition_info &&
      data?.common_ingredients &&
      data?.dietary_considerations
    );
  };

  const isValidCertificationData = (data: any): data is CertificationData => {
    return (
      data?.certification_education &&
      Array.isArray(data.certification_education.relevant_certifications)
    );
  };

  useEffect(() => {
    let isSubscribed = true;

    const fetchData = async () => {
      if (!productName || !productBrand) return;

      setLoading(true);
      setError(null);

      try {
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

        if (isSubscribed) {
          if (!isValidNutritionData(nutritionData)) {
            console.error("Invalid nutrition data format:", nutritionData);
            setError("Received invalid nutrition data format");
            return;
          }

          if (!isValidSafetyData(safetyData)) {
            console.error("Invalid safety data format:", safetyData);
            setError("Received invalid safety data format");
            return;
          }

          if (!isValidCertificationData(certificationData)) {
            console.error(
              "Invalid certification data format:",
              certificationData
            );
            setError("Received invalid certification data format");
            return;
          }

          setNutritionData(nutritionData);
          setSafetyData(safetyData);
          setCertificationData(certificationData);
        }
      } catch (err) {
        if (isSubscribed) {
          setError("Failed to fetch product data");
          console.error(err);
        }
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      isSubscribed = false;
    };
  }, [productName, productBrand]); // Only these dependencies

  const renderSafetySection = () => {
    if (!safetyData?.general_safety_info) {
      return <div>No safety information available</div>;
    }

    return (
      <div className="space-y-4">
        {safetyData.general_safety_info.common_concerns && (
          <div>
            <h3 className="font-semibold mb-2">Common Safety Concerns</h3>
            <ul className="space-y-2">
              {safetyData.general_safety_info.common_concerns.map(
                (concern, index) => (
                  <li
                    key={index}
                    className="flex items-center bg-red-50 dark:bg-red-900/30 p-3 rounded-md text-red-700 dark:text-red-200"
                  >
                    <AlertTriangle className="flex-shrink-0 mr-2" size={16} />
                    <div>
                      <p className="font-semibold">{concern.concern}</p>
                      <p className="text-sm">{concern.explanation}</p>
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>
        )}

        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
          <p className="text-sm italic text-gray-600 dark:text-gray-400">
            {safetyData.general_safety_info.disclaimer}
          </p>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        error={error}
        retry={() => {
          setError(null);
          setLoading(true);
          fetchData();
        }}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 animate-fadeIn">
      <div className="lg:col-span-1 space-y-4 sm:space-y-6">
        <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 sm:p-6 shadow-lg">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2">
              <Star className="text-yellow-500" size={20} />
              <h1 className="text-xl sm:text-2xl font-bold text-[#2E7D32] dark:text-[#4CAF50] break-words">
                {nutritionData?.product.name ||
                  `${productBrand} - ${productName}`}
              </h1>
            </div>
            <p className="text-[#37474F] dark:text-gray-300">
              {nutritionData?.product.category || "Food Product"}
            </p>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Brand: {nutritionData?.product.brand}
              </p>
            </div>
          </div>
        </section>

        {nutritionData && (
          <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="border-b-8 border-black dark:border-gray-200 pb-1">
              <h2 className="text-3xl font-extrabold text-black dark:text-white">Nutrition Facts</h2>
            </div>
            
            <div className="border-b border-black dark:border-gray-200 py-2">
              <p className="text-sm text-black dark:text-white">
                {nutritionData.general_nutrition_info.typical_nutrients}
              </p>
            </div>

            <div className="border-b-4 border-black dark:border-gray-200 py-2">
              <h3 className="text-sm font-bold text-black dark:text-white">Nutritional Benefits</h3>
              <p className="text-sm text-black dark:text-white">
                {nutritionData.general_nutrition_info.nutritional_benefits}
              </p>
            </div>

            <div className="border-b border-black dark:border-gray-200 py-2">
              <h3 className="text-sm font-bold text-black dark:text-white">Common Ingredients</h3>
              <p className="text-sm text-black dark:text-white">
                {nutritionData.common_ingredients.typical_ingredients}
              </p>
            </div>

            <div className="border-b border-black dark:border-gray-200 py-2">
              <h3 className="text-sm font-bold text-black dark:text-white">Allergens</h3>
              <p className="text-sm text-black dark:text-white">
                {nutritionData.common_ingredients.common_allergens}
              </p>
            </div>

            <div className="py-2">
              <h3 className="text-sm font-bold text-black dark:text-white">Dietary Considerations</h3>
              <p className="text-sm text-black dark:text-white">
                {nutritionData.dietary_considerations.general_suitability}
              </p>
            </div>

            <div className="mt-4 text-xs italic text-gray-600 dark:text-gray-400">
              {nutritionData.dietary_considerations.disclaimer}
            </div>
          </section>
        )}

        <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="text-amber-600" size={24} />
            <h2 className="text-2xl font-bold">Safety Concerns</h2>
          </div>
          {renderSafetySection()}
        </section>
      </div>

      <div className="lg:col-span-2 space-y-4 sm:space-y-6">
        {safetyData?.ethical_sourcing && (
          <EthicalSourcingSection ethicalData={safetyData.ethical_sourcing} />
        )}

        {certificationData && (
          <CertificationSection certificationData={certificationData} />
        )}
      </div>
    </div>
  );
}

function RouteComponent() {
  const search = Route.useSearch();
  const { product, productBrand } = search;

  const productInfo = React.useMemo(
    () => ({
      product,
      productBrand,
    }),
    [product, productBrand]
  );

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
          productName={productInfo.product}
          productBrand={productInfo.productBrand}
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
          <div className="text-[#37474F] dark:text-gray-300 transition-colors duration-200"></div>
        </section>
      </div>
    </div>
  );
}
