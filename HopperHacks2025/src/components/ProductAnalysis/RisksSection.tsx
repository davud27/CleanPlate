import { AlertTriangle } from "lucide-react";

interface RisksSectionProps {
  risks: string[];
}

export function RisksSection({ risks }: RisksSectionProps) {
  return (
    <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-lg animate-slideUpFade [animation-delay:400ms] transition-colors duration-200">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="text-amber-600" size={24} />
        <h2 className="text-2xl font-bold text-[#37474F] dark:text-gray-300">
          Risks to Consider
        </h2>
      </div>
      <ul className="space-y-3">
        {risks.map((risk, index) => (
          <li
            key={index}
            className="flex items-center bg-red-50 p-3 rounded-md text-red-700"
          >
            <span className="ml-2">{risk}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
