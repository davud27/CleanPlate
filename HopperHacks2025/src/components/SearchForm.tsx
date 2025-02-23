import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchForm() {
  const [foodBrand, setFoodBrand] = useState("");
  const [foodName, setFoodName] = useState("");

  const navigate = useNavigate();

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
              placeholder="Enter food brand (e.g., Tyson)"
              required
              autoComplete="off"
              className="w-full px-4 py-3 rounded-xl border-2 border-[#8D6E63]/20 dark:border-gray-700 focus:border-[#4CAF50] focus:ring-[#4CAF50]/20 focus:ring-4 transition-all duration-300 bg-white dark:bg-gray-800 text-[#37474F] dark:text-gray-200 placeholder:text-[#8D6E63]/40 text-lg"
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
  );
}
