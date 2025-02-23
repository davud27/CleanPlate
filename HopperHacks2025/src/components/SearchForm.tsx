import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchFormProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export function SearchForm({ isLoading, setIsLoading }: SearchFormProps) {
  const [foodBrand, setFoodBrand] = useState("");
  const [foodName, setFoodName] = useState("");

Search]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodBrand.trim() || !foodName.trim()) return;

    setIsLoading(true);

    try {
      console.log("Sending request for:", { foodName, foodBrand });

      const [foodInfoRes, nutritionRes, certificationsRes] = await Promise.all([
        fetch(
          `/api/getFoodInfo?foodName=${encodeURIComponent(foodName)}&foodBrand=${encodeURIComponent(foodBrand)}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        ),
        fetch(
          `/api/analyzeFoodProduct?foodName=${encodeURIComponent(foodName)}&foodBrand=${encodeURIComponent(foodBrand)}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        ),
        fetch(
          `/api/getFoodCertifications?foodName=${encodeURIComponent(foodName)}&foodBrand=${encodeURIComponent(foodBrand)}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        ),
      ]);

      // Log responses
      console.log("Response status codes:", {
        foodInfo: foodInfoRes.status,
        nutrition: nutritionRes.status,
        certifications: certificationsRes.status,
      });

      // Check each response individually
      if (!foodInfoRes.ok) {
        const errorText = await foodInfoRes.text();
        console.error("Food info error:", errorText);
        throw new Error(`Food info request failed: ${foodInfoRes.status}`);
      }
      if (!nutritionRes.ok) {
        const errorText = await nutritionRes.text();
        console.error("Nutrition error:", errorText);
        throw new Error(`Nutrition request failed: ${nutritionRes.status}`);
      }
      if (!certificationsRes.ok) {
        const errorText = await certificationsRes.text();
        console.error("Certifications error:", errorText);
        throw new Error(
          `Certifications request failed: ${certificationsRes.status}`
        );
      }

      const [foodInfo, nutritionInfo, certifications] = await Promise.all([
        foodInfoRes.json(),
        nutritionRes.json(),
        certificationsRes.json(),
      ]);

      // Log the received data
      console.log("Received data:", {
        foodInfo,
        nutritionInfo,
        certifications,
      });

      if (!foodInfo || !nutritionInfo || !certifications) {
        throw new Error("Invalid data received from API");
      }

      const foodData = {
        foodInfo,
        nutritionInfo,
        certifications,
      };

      localStorage.setItem("foodData", JSON.stringify(foodData));

      // Small delay to ensure localStorage is updated
      await new Promise((resolve) => setTimeout(resolve, 100));

      navigate({
        to: "/results",
        search: {
          product: foodName,
          productBrand: foodBrand,
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to analyze food product. Please try again."
      );
    } finally {
      setIsLoading(false);
      setFoodBrand("");
      setFoodName("");
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
            disabled={isLoading}
            className={`bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] dark:from-[#4CAF50] dark:to-[#66BB6A] text-white text-xl px-12 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold cursor-pointer flex items-center gap-2 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Analyzing...</span>
              </>
            ) : (
              "Analyze Food"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
