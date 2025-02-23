import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
// import { Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [foodBrand, setFoodBrand] = useState("");
  const [foodName, setFoodName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!foodBrand.trim() || !foodName.trim()) {
      return; // Don't submit if fields are empty
    }

    // First clear the form
    setFoodBrand("");
    setFoodName("");
    
    // Then navigate
    navigate({
      to: "/results",
      search: {
        product: foodName,
        productBrand: foodBrand,
      },
    });
  };

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
            Make informed choices about your food with our comprehensive analysis tool
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-10 border border-white/20 dark:bg-gray-800 dark:border-gray-700">
          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label
                  htmlFor="brand"
                  className="text-lg font-semibold text-[#37474F] dark:text-gray-200 block"
                >
                  Food Brand
                  <span className="text-[#4CAF50] ml-1">*</span>
                </label>
                <Input
                  id="brand"
                  value={foodBrand}
                  onChange={(e) => setFoodBrand(e.target.value)}
                  placeholder="Enter food brand (e.g., Tyson)"
                  required
                  autoComplete="off"
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#8D6E63]/20 dark:border-gray-700 focus:border-[#4CAF50] focus:ring-[#4CAF50]/20 focus:ring-4 transition-all duration-300 bg-white dark:bg-gray-800 text-[#37474F] dark:text-gray-200 placeholder:text-[#8D6E63]/40 text-lg"
                />
              </div>

              <div className="space-y-4">
                <label
                  htmlFor="foodName"
                  className="text-lg font-semibold text-[#37474F] dark:text-gray-200 block"
                >
                  Food Name
                  <span className="text-[#4CAF50] ml-1">*</span>
                </label>
                <Input
                  id="foodName"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  placeholder="Enter food name (e.g., Chicken Nuggets)"
                  required
                  autoComplete="off"
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#8D6E63]/20 dark:border-gray-700 focus:border-[#4CAF50] focus:ring-[#4CAF50]/20 focus:ring-4 transition-all duration-300 bg-white dark:bg-gray-800 text-[#37474F] dark:text-gray-200 placeholder:text-[#8D6E63]/40 text-lg"
                />
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <Button 
                type="submit"
                className="bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] dark:from-[#4CAF50] dark:to-[#66BB6A] text-white text-xl px-12 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold cursor-pointer"
              >
                Analyze Food
              </Button>
            </div>
          </form>
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <div className="text-[#2E7D32] mb-4 text-2xl">🔍</div>
            <h3 className="text-xl font-semibold text-[#37474F] mb-2">Detailed Analysis</h3>
            <p className="text-[#37474F]/70">Get comprehensive insights about your food's ingredients and production methods.</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <div className="text-[#2E7D32] mb-4 text-2xl">🌱</div>
            <h3 className="text-xl font-semibold text-[#37474F] mb-2">Healthier Alternatives</h3>
            <p className="text-[#37474F]/70">Discover better options that align with your health and ethical preferences.</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <div className="text-[#2E7D32] mb-4 text-2xl">📊</div>
            <h3 className="text-xl font-semibold text-[#37474F] mb-2">Clear Insights</h3>
            <p className="text-[#37474F]/70">Understand food labels and certifications with our easy-to-read format.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
