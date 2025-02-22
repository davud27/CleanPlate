import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
// import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2 min-h-screen bg-[#FAF3E0]">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-6xl font-bold text-[#2E7D32] text-center mb-6">
          Welcome to Clean Plate!
        </h1>
        <p className="text-[#37474F]/70 text-center text-2xl mb-12">
          Enter your food details below
        </p>

        <div className="space-y-8 bg-white/80 p-8 rounded-lg shadow-lg">
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
                placeholder="Enter food brand (e.g., Tyson)"
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
                placeholder="Enter food name (e.g., chicken nuggets)"
                className="border-[#8D6E63] focus-visible:ring-[#4CAF50] h-11
                         placeholder:text-[#8D6E63]/60"
              />
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button className="bg-[#4CAF50] hover:bg-[#2E7D32] text-white px-8 py-2 text-lg">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
