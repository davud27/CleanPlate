import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

export default function About() {
  return (
    <div className="min-h-screen pt-20 bg-[#FAF3E0] dark:bg-gray-900 p-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-12">
        <section>
          <h1 className="text-4xl font-bold text-[#2E7D32] dark:text-[#4CAF50] mb-4 transition-colors duration-200">
            Why Clean Plate?
          </h1>
          <p className="text-[#37474F] dark:text-gray-300 text-lg leading-relaxed transition-colors duration-200">
            At Clean Plate, we believe that knowing what's in your food is the
            first step to making healthier, more ethical choices. With so many
            labels and marketing terms thrown around, it's easy to feel
            overwhelmed. That's why we do the research for you—so you can eat
            with confidence.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-[#2E7D32] dark:text-[#4CAF50] mb-4 transition-colors duration-200">
            Our Mission
          </h2>
          <p className="text-[#37474F] dark:text-gray-300 text-lg leading-relaxed transition-colors duration-200">
            We're here to bring transparency to your plate. Our goal is to
            empower consumers with honest, easy-to-understand information about
            how their food is produced. From organic certifications to ethical
            farming practices, we break it down so you can make informed
            decisions.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-[#2E7D32] dark:text-[#4CAF50] mb-4 transition-colors duration-200">
            How It Works
          </h2>
          <ul className="list-disc list-inside text-[#37474F] dark:text-gray-300 text-lg leading-relaxed space-y-2 ml-4 transition-colors duration-200">
            <li>
              <span className="font-semibold">Search Your Food</span> – Enter a
              brand or product name in our search tool.
            </li>
            <li>
              <span className="font-semibold">Get the Facts</span> – Instantly
              see if it's organic, free-range, hormone-free, ethically sourced,
              and more.
            </li>
            <li>
              <span className="font-semibold">Make Informed Choices</span> –
              Understand what's behind the label and feel confident in what
              you're eating.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-[#2E7D32] dark:text-[#4CAF50] mb-4 transition-colors duration-200">
            Why It Matters
          </h2>
          <p className="text-[#37474F] dark:text-gray-300 text-lg leading-relaxed transition-colors duration-200">
            Every food choice you make impacts not only your health but also the
            environment, local farmers, and animal welfare. By choosing
            transparency, you're taking a step toward a cleaner, healthier, and
            more ethical food system.
          </p>
        </section>
      </div>
    </div>
  );
}
