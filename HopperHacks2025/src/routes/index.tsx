import { createFileRoute } from "@tanstack/react-router";
import { SearchForm } from "@/components/SearchForm";
import { Features } from "@/components/Features";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

interface FoodData {
  foodInfo?: any;
  nutritionInfo?: any;
  certifications?: any;
}

function Index() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen pt-20 bg-[#FAF3E0] dark:bg-gray-900 transition-colors duration-200">
      {/* Abstract background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-[#2E7D32]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-[#4CAF50]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto py-20 px-6">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] leading-tight dark:text-[#4CAF50] transition-colors duration-200">
            Welcome to Clean Plate!
          </h1>
          <p className="text-2xl text-[#37474F] dark:text-gray-300 max-w-2xl mx-auto leading-relaxed transition-colors duration-200">
            Make informed choices about your food with our comprehensive
            analysis tool
          </p>
        </div>

        <div>
          <SearchForm isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>
        <Features />
      </div>
    </div>
  );
}
