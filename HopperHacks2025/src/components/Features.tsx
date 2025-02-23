export function Features() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-24">
      <FeatureCard
        emoji="🔍"
        title="Detailed Analysis"
        description="Get comprehensive insights about your food's ingredients and production methods."
      />
      <FeatureCard
        emoji="🌱"
        title="Healthier Alternatives"
        description="Discover better options that align with your health and ethical preferences."
      />
      <FeatureCard
        emoji="📊"
        title="Clear Insights"
        description="Understand food labels and certifications with our easy-to-read format."
      />
    </div>
  );
}

interface FeatureCardProps {
  emoji: string;
  title: string;
  description: string;
}

function FeatureCard({ emoji, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white/80 dark:bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg">
      <div className="text-[#4CAF50] mb-4 text-2xl">{emoji}</div>
      <h3 className="text-xl font-semibold text-[#2E7D32] dark:text-[#4CAF50] mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}
