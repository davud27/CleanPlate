import { createFileRoute } from "@tanstack/react-router";
import { RisksSection } from "@/components/ProductAnalysis/RisksSection";
import { BenefitsSection } from "@/components/ProductAnalysis/BenefitsSection";
import { AlternativesSection } from "@/components/ProductAnalysis/AlternativesSection";
import { ProductDetails } from "@/components/ProductAnalysis/ProductDetails";
import { LabelExplanations } from "@/components/ProductAnalysis/LabelExplanations";
import { NutritionLabel } from "@/components/ProductAnalysis/NutritionLabel";

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

export const Route = createFileRoute("/results")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      product: String(search.product || ""),
      productBrand: String(search.productBrand || ""),
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { product, productBrand } = Route.useSearch();

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
        <div className="flex gap-8 animate-fadeIn">
          {/* Left Sidebar */}
          <div className="w-1/3 space-y-6 animate-slideIn">
            <ProductDetails productName={product} productBrand={productBrand} />
            <NutritionLabel />
          </div>

          {/* Right Content */}
          <div className="w-2/3 space-y-8">
            <section className="text-center animate-fadeDown">
              <h2 className="text-3xl font-bold text-[#2E7D32] dark:text-[#4CAF50] mb-2">
                Product Analysis Results
              </h2>
            </section>

            <RisksSection risks={foodItems.risks} />
            <BenefitsSection benefits={foodItems.benefits} />
            <AlternativesSection alternatives={foodItems.alternatives} />
            <LabelExplanations />
          </div>
        </div>
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
