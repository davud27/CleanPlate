import { createFileRoute } from "@tanstack/react-router";
import { RisksSection } from "@/components/ProductAnalysis/RisksSection";
import { BenefitsSection } from "@/components/ProductAnalysis/BenefitsSection";
import { AlternativesSection } from "@/components/ProductAnalysis/AlternativesSection";
import { ProductDetails } from "@/components/ProductAnalysis/ProductDetails";
import { LabelExplanations } from "@/components/ProductAnalysis/LabelExplanations";
import { NutritionLabel } from "@/components/ProductAnalysis/NutritionLabel";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";

// Example data structure - this could come from an API or database
const foodItems = {
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
};

interface FoodData {
  foodInfo: any;
  nutritionInfo: any;
  certifications: any;
}

export const Route = createFileRoute("/results")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      product: String(search.product || ""),
      productBrand: String(search.productBrand || ""),
    };
  },
  component: Results,
});

function Results() {
  const { product, productBrand } = Route.useSearch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [foodData, setFoodData] = useState<FoodData | null>(null);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("foodData");

      if (!storedData) {
        console.error("No food data found in localStorage");
        navigate({ to: "/" });
        return;
      }

      const parsedData = JSON.parse(storedData);

      // Validate the parsed data
      if (
        !parsedData.foodInfo ||
        !parsedData.nutritionInfo ||
        !parsedData.certifications
      ) {
        console.error("Invalid food data structure");
        navigate({ to: "/" });
        return;
      }

      setFoodData(parsedData);
      setLoading(false);
    } catch (error) {
      console.error("Error loading food data:", error);
      setError("Failed to load analysis results");
      setLoading(false);
    }
  }, [navigate]);

  if (!product || !productBrand) {
    return (
      <div className="min-h-screen pt-28 bg-[#FAF3E0] dark:bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-red-600">
            No product selected
          </h1>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-28 bg-[#FAF3E0] dark:bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-[#2E7D32]">
            Loading analysis...
          </h1>
        </div>
      </div>
    );
  }

  if (error || !foodData) {
    return (
      <div className="min-h-screen pt-28 bg-[#FAF3E0] dark:bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-red-600">
            {error || "Failed to load analysis results"}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 bg-[#FAF3E0] dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Product Details */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Product Details</h2>
          <div className="mb-2">
            <span className="font-semibold">Brand:</span> {productBrand}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Product:</span> {product}
          </div>
        </section>

        {/* Food Info Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Product Information</h2>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(foodData.foodInfo, null, 2)}
          </pre>
        </section>

        {/* Nutrition Info Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Nutrition Information</h2>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(foodData.nutritionInfo, null, 2)}
          </pre>
        </section>

        {/* Certifications Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Certifications</h2>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(foodData.certifications, null, 2)}
          </pre>
        </section>
      </div>
    </div>
  );
}
