import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  component: Blog,
});

function Blog() {
  return (
    <div className="min-h-screen bg-[#FAF3E0] p-8">
      <div className="max-w-4xl mx-auto space-y-12 pt-16">
        <section>
          <h1 className="text-4xl font-bold text-[#2E7D32] mb-4">Blog</h1>
          <p className="text-[#37474F] text-lg">
            Coming soon... Stay tuned for articles about food transparency and healthy eating!
          </p>
        </section>
      </div>
    </div>
  );
} 