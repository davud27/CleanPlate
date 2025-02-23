import { createFileRoute } from "@tanstack/react-router";
import { SearchForm } from "@/components/SearchForm";
import { Features } from "@/components/Features";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen pt-12 sm:pt-20 bg-[#FAF3E0] dark:bg-gray-900 transition-colors duration-200">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-[#2E7D32]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-[#4CAF50]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto py-8 sm:py-20 px-4 sm:px-6">
        <div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-16">
          <h1 className="text-4xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] leading-tight dark:text-[#4CAF50]">
            Welcome to Clean Plate!
          </h1>
          <p className="text-lg sm:text-2xl text-[#37474F] dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Make informed choices about your food with our comprehensive
            analysis tool
          </p>
        </div>

        <SearchForm />
        <Features />
      </div>
    </div>
  );
}
