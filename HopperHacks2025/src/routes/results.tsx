import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

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
    <section className="bg-white/80 rounded-lg p-6 shadow-lg">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-[#2E7D32] hover:text-[#1B5E20] transition-colors"
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
              className="border-b border-gray-200 last:border-0 pb-4 last:pb-0"
            >
              <h3 className="font-semibold text-[#2E7D32] mb-1">
                {item.label}
              </h3>
              <p className="text-[#37474F] text-sm leading-relaxed">
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
  return (
    <div className="flex gap-8">
      {/* Left Sidebar */}
      <div className="w-1/3 space-y-6">
        <section className="bg-white/80 rounded-lg p-6 shadow-lg">
          <h1 className="text-4xl font-bold text-[#2E7D32] mb-2">
            {productBrand} - {productName}
          </h1>
          <p className="text-[#37474F]/70 text-xl">Product Details</p>
          {/* Image placeholder */}
          <div className="mt-6 aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Product Image</p>
          </div>
        </section>
      </div>

      {/* Right Content */}
      <div className="w-2/3 space-y-8">
        {/* Analysis Title */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-[#2E7D32] mb-2">
            Product Analysis Results
          </h2>
        </section>

        {/* Risks Section */}
        <section className="bg-white/80 rounded-lg p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-amber-600" size={24} />
            <h2 className="text-2xl font-bold text-[#37474F]">
              Risks to Consider
            </h2>
          </div>
          <ul className="space-y-3">
            {item.risks.map((risk, index) => (
              <li
                key={index}
                className="flex items-center bg-red-50 p-3 rounded-md text-red-700"
              >
                <span className="ml-2">{risk}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Benefits Section */}
        <section className="bg-white/80 rounded-lg p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="text-green-600" size={24} />
            <h2 className="text-2xl font-bold text-[#37474F]">Benefits</h2>
          </div>
          <ul className="space-y-3">
            {item.benefits.map((benefit, index) => (
              <li
                key={index}
                className="flex items-center bg-green-50 p-3 rounded-md text-green-700"
              >
                <span className="ml-2">{benefit}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Recommendations Section */}
        <section className="bg-white/80 rounded-lg p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Star className="text-yellow-500" size={24} />
            <h2 className="text-2xl font-bold text-[#37474F]">
              Better Alternatives
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
                className="block bg-blue-50 p-4 rounded-md transition-all hover:bg-blue-100"
              >
                <h3 className="font-semibold text-blue-800">
                  {alternative.name}
                </h3>
                <p className="text-blue-600 mt-1 text-sm">
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
      <div className="min-h-screen bg-[#FAF3E0] p-8">
        <div className="max-w-4xl mx-auto space-y-8 pt-16">
          <section className="text-center">
            <h1 className="text-4xl font-bold text-[#2E7D32] mb-2">
              No product selected
            </h1>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF3E0] p-8">
      <div className="max-w-7xl mx-auto pt-16">
        <FoodItemCard
          item={foodItems[0]}
          productName={product}
          productBrand={productBrand}
        />
      </div>
    </div>
  );
}
