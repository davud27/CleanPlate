import { CheckCircle } from "lucide-react";

interface BenefitsSectionProps {
  benefits: string[];
}

export function BenefitsSection({ benefits }: BenefitsSectionProps) {
  return (
    <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-lg animate-slideUpFade [animation-delay:600ms] transition-colors duration-200">
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle className="text-green-600" size={24} />
        <h2 className="text-2xl font-bold text-[#37474F] dark:text-gray-300">
          Benefits
        </h2>
      </div>
      <ul className="space-y-3">
        {benefits.map((benefit, index) => (
          <li
            key={index}
            className="flex items-center bg-green-50 p-3 rounded-md text-green-700"
          >
            <span className="ml-2">{benefit}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
