import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
// import { Link } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash"; // You'll need to install this package

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [foodBrand, setFoodBrand] = useState("");
  const [foodName, setFoodName] = useState("");
  const [brandSuggestions, setBrandSuggestions] = useState<string[]>([]);
  const [foodSuggestions, setFoodSuggestions] = useState<string[]>([]);
  const [showBrandSuggestions, setShowBrandSuggestions] = useState(false);
  const [showFoodSuggestions, setShowFoodSuggestions] = useState(false);
  const navigate = useNavigate();

  const searchUSDA = async (query: string, type: "brand" | "food") => {
    try {
      const formattedQuery = encodeURIComponent(query.trim());
      const response = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=vkSSiGfkDonu3zSRPGsIoMeRpejLQ27wUm198G9l&query=${formattedQuery}&pageSize=8`
      );
      const data = await response.json();

      if (type === "brand") {
        // Remove duplicates and null/undefined values, then normalize cases
        const uniqueBrands = [
          ...new Set(
            data.foods
              .map((food: any) => food.brandOwner?.trim())
              .filter(
                (brand: string | null) =>
                  brand && brand.toLowerCase().includes(query.toLowerCase())
              )
              .map((brand: string) => {
                // Normalize capitalization
                return brand
                  .split(" ")
                  .map(
                    (word) =>
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  )
                  .join(" ");
              })
          ),
        ];

        // Sort by relevance
        const sortedBrands = uniqueBrands
          .sort((a, b) => {
            const aLower = a.toLowerCase();
            const bLower = b.toLowerCase();
            const queryLower = query.toLowerCase();

            // Exact matches first
            if (aLower === queryLower) return -1;
            if (bLower === queryLower) return 1;

            // Then starts with matches
            if (aLower.startsWith(queryLower) && !bLower.startsWith(queryLower))
              return -1;
            if (!aLower.startsWith(queryLower) && bLower.startsWith(queryLower))
              return 1;

            // Then by length
            return a.length - b.length;
          })
          .slice(0, 5);

        setBrandSuggestions(sortedBrands);
      } else {
        // Remove duplicates and normalize food descriptions
        const uniqueFoods = [
          ...new Set(
            data.foods
              .map((food: any) => ({
                description: food.description?.trim(),
                brandOwner: food.brandOwner,
              }))
              .filter(
                (food: any) =>
                  food.description &&
                  food.description.toLowerCase().includes(query.toLowerCase())
              )
              .map((food: any) => ({
                ...food,
                description: food.description
                  .split(" ")
                  .map(
                    (word: string) =>
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  )
                  .join(" "),
              }))
          ),
        ]
          .sort((a: any, b: any) => {
            const aLower = a.description.toLowerCase();
            const bLower = b.description.toLowerCase();
            const queryLower = query.toLowerCase();

            // Exact matches first
            if (aLower === queryLower) return -1;
            if (bLower === queryLower) return 1;

            // Then starts with matches
            if (aLower.startsWith(queryLower) && !bLower.startsWith(queryLower))
              return -1;
            if (!aLower.startsWith(queryLower) && bLower.startsWith(queryLower))
              return 1;

            // Then by length
            return a.description.length - b.description.length;
          })
          .slice(0, 5);

        setFoodSuggestions(uniqueFoods.map((f: any) => f.description));
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const debouncedSearch = useCallback(
    debounce((query: string, type: "brand" | "food") => {
      if (query.trim().length > 1) {
        searchUSDA(query, type);
      }
    }, 250),
    []
  );

  useEffect(() => {
    if (foodBrand.trim().length > 2) {
      debouncedSearch(foodBrand, "brand");
    } else {
      setBrandSuggestions([]);
    }
  }, [foodBrand]);

  useEffect(() => {
    if (foodName.trim().length > 2) {
      debouncedSearch(foodName, "food");
    } else {
      setFoodSuggestions([]);
    }
  }, [foodName]);

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

  const handleSuggestionClick = (
    suggestion: string,
    type: "brand" | "food"
  ) => {
    if (type === "brand") {
      setFoodBrand(suggestion);
      setShowBrandSuggestions(false);
      const foodNameInput = document.getElementById("foodName");
      if (foodNameInput) foodNameInput.focus();
    } else {
      setFoodName(suggestion);
      setShowFoodSuggestions(false);
    }
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
            Make informed choices about your food with our comprehensive
            analysis tool
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-10 border border-white/20 dark:bg-gray-800 dark:border-gray-700">
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4 relative">
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
                  onFocus={() => setShowBrandSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowBrandSuggestions(false), 200)
                  }
                  placeholder="Enter food brand (e.g., Tyson)"
                  required
                  autoComplete="off"
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#8D6E63]/20 dark:border-gray-700 focus:border-[#4CAF50] focus:ring-[#4CAF50]/20 focus:ring-4 transition-all duration-300 bg-white dark:bg-gray-800 text-[#37474F] dark:text-gray-200 placeholder:text-[#8D6E63]/40 text-lg"
                />
                {showBrandSuggestions && brandSuggestions.length > 0 && (
                  <div className="absolute w-full bg-white dark:bg-gray-800 mt-1 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-60 overflow-y-auto">
                    {brandSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150"
                        onClick={() =>
                          handleSuggestionClick(suggestion, "brand")
                        }
                      >
                        <div className="font-medium">{suggestion}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4 relative">
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
                  onFocus={() => setShowFoodSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowFoodSuggestions(false), 200)
                  }
                  placeholder="Enter food name (e.g., Chicken Nuggets)"
                  required
                  autoComplete="off"
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#8D6E63]/20 dark:border-gray-700 focus:border-[#4CAF50] focus:ring-[#4CAF50]/20 focus:ring-4 transition-all duration-300 bg-white dark:bg-gray-800 text-[#37474F] dark:text-gray-200 placeholder:text-[#8D6E63]/40 text-lg"
                />
                {showFoodSuggestions && foodSuggestions.length > 0 && (
                  <div className="absolute w-full bg-white dark:bg-gray-800 mt-1 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-60 overflow-y-auto">
                    {foodSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150"
                        onClick={() =>
                          handleSuggestionClick(suggestion, "food")
                        }
                      >
                        <div className="font-medium">{suggestion}</div>
                      </div>
                    ))}
                  </div>
                )}
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
            <h3 className="text-xl font-semibold text-[#37474F] mb-2">
              Detailed Analysis
            </h3>
            <p className="text-[#37474F]/70">
              Get comprehensive insights about your food's ingredients and
              production methods.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <div className="text-[#2E7D32] mb-4 text-2xl">🌱</div>
            <h3 className="text-xl font-semibold text-[#37474F] mb-2">
              Healthier Alternatives
            </h3>
            <p className="text-[#37474F]/70">
              Discover better options that align with your health and ethical
              preferences.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <div className="text-[#2E7D32] mb-4 text-2xl">📊</div>
            <h3 className="text-xl font-semibold text-[#37474F] mb-2">
              Clear Insights
            </h3>
            <p className="text-[#37474F]/70">
              Understand food labels and certifications with our easy-to-read
              format.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
