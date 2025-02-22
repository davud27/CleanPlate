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
    <div className="p-2 min-h-screen bg-[#FAF3E0]">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-6xl font-bold text-[#2E7D32] text-center mb-6">
          Welcome to Clean Plate!
        </h1>
        <p className="text-[#37474F]/70 text-center text-2xl mb-12">
          Enter your food details below
        </p>

        <form 
          onSubmit={handleSubmit} 
          autoComplete="off"
          className="space-y-8 bg-white/80 p-8 rounded-lg shadow-lg"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="brand"
                className="text-lg font-semibold text-[#37474F] block"
              >
                Food Brand
              </label>
              <Input
                id="brand"
                value={foodBrand}
                onChange={(e) => setFoodBrand(e.target.value)}
                placeholder="Enter food brand (e.g., Tyson)"
                required
                autoComplete="off"
                className="border-[#8D6E63] focus-visible:ring-[#4CAF50] h-11
                         placeholder:text-[#8D6E63]/60"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="foodName"
                className="text-lg font-semibold text-[#37474F] block"
              >
                Food Name
              </label>
              <Input
                id="foodName"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                placeholder="Enter food name (e.g., chicken nuggets)"
                required
                autoComplete="off"
                className="border-[#8D6E63] focus-visible:ring-[#4CAF50] h-11
                         placeholder:text-[#8D6E63]/60"
              />
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button 
              type="submit"
              className="bg-[#4CAF50] hover:bg-[#2E7D32] text-white px-8 py-2 text-lg"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
