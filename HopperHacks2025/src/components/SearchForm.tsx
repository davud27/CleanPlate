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
    <div className="bg-white/80 dark:bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-6 sm:p-10 border border-white/20">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="space-y-6 sm:space-y-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
          <div className="space-y-2 sm:space-y-4 relative">
            <label
              htmlFor="brand"
              className="text-base sm:text-lg font-semibold text-[#2E7D32] dark:text-[#4CAF50] block"
            >
              Food Brand
              <span className="text-[#4CAF50] ml-1">*</span>
            </label>
            <Input
              id="brand"
              value={foodBrand}
              onChange={(e) => setFoodBrand(e.target.value)}
              placeholder="Enter food brand"
              required
              autoComplete="off"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border-2 border-[#4CAF50]/20 focus:border-[#4CAF50] focus:ring-[#4CAF50]/20 focus:ring-4 transition-all duration-300 bg-white dark:bg-white/10 text-gray-600 dark:text-gray-300 placeholder:text-gray-400 text-base sm:text-lg"
            />
          </div>

          <div className="space-y-2 sm:space-y-4 relative">
            <label
              htmlFor="foodName"
              className="text-base sm:text-lg font-semibold text-[#2E7D32] dark:text-[#4CAF50] block"
            >
              Food Name
              <span className="text-[#4CAF50] ml-1">*</span>
            </label>
            <Input
              id="foodName"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              placeholder="Enter food name"
              required
              autoComplete="off"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border-2 border-[#4CAF50]/20 focus:border-[#4CAF50] focus:ring-[#4CAF50]/20 focus:ring-4 transition-all duration-300 bg-white dark:bg-white/10 text-gray-600 dark:text-gray-300 placeholder:text-gray-400 text-base sm:text-lg"
            />
          </div>
        </div>

        <div className="flex justify-center pt-4 sm:pt-6">
          <Button
            type="submit"
            className="w-full sm:w-auto bg-[#4CAF50] hover:bg-[#2E7D32] text-white text-lg sm:text-xl px-8 sm:px-12 py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold cursor-pointer"
          >
            Analyze Food
          </Button>
        </div>
      </form>
    </div>
  );
}
