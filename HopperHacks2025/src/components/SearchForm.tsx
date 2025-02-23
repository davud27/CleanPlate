import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";
import { SuggestionsDropdown } from "./SuggestionsDropdown";
import { searchUSDA } from "@/lib/api";

export function SearchForm() {
  const [foodBrand, setFoodBrand] = useState("");
  const [foodName, setFoodName] = useState("");
  const [brandSuggestions, setBrandSuggestions] = useState<string[]>([]);
  const [foodSuggestions, setFoodSuggestions] = useState<string[]>([]);
  const [showBrandSuggestions, setShowBrandSuggestions] = useState(false);
  const [showFoodSuggestions, setShowFoodSuggestions] = useState(false);
  const navigate = useNavigate();

  const debouncedSearch = useCallback(
    debounce((query: string, type: "brand" | "food") => {
      if (query.trim().length > 1) {
        searchUSDA(
          query,
          type,
          type === "brand" ? setBrandSuggestions : setFoodSuggestions
        );
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
      return;
    }

    setFoodBrand("");
    setFoodName("");

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
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-10 border border-white/20 dark:bg-gray-800 dark:border-gray-700">
      <form onSubmit={handleSubmit} autoComplete="off" className="space-y-8">
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
            <SuggestionsDropdown
              show={showBrandSuggestions}
              suggestions={brandSuggestions}
              onSuggestionClick={(suggestion) =>
                handleSuggestionClick(suggestion, "brand")
              }
            />
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
            <SuggestionsDropdown
              show={showFoodSuggestions}
              suggestions={foodSuggestions}
              onSuggestionClick={(suggestion) =>
                handleSuggestionClick(suggestion, "food")
              }
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
  );
}
