import { Star } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface Alternative {
  id: string;
  name: string;
  reason: string;
}

interface AlternativesSectionProps {
  alternatives: Alternative[];
}

export function AlternativesSection({
  alternatives,
}: AlternativesSectionProps) {
  return (
    <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-lg animate-slideUpFade [animation-delay:800ms] transition-colors duration-200">
      <div className="flex items-center gap-2 mb-4">
        <Star className="text-yellow-500" size={24} />
        <h2 className="text-2xl font-bold text-[#37474F] dark:text-gray-300">
          Recommended Alternatives
        </h2>
      </div>
      <ul className="space-y-4">
        {alternatives.map((alternative, index) => (
          <Link
            key={index}
            to="/results"
            search={{
              product: alternative.name,
              productBrand: alternative.id,
            }}
            className="block bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            <h3 className="font-semibold text-blue-800 dark:text-blue-200">
              {alternative.name}
            </h3>
            <p className="text-blue-600 dark:text-blue-300 mt-1 text-sm">
              {alternative.reason}
            </p>
          </Link>
        ))}
      </ul>
    </section>
  );
}
