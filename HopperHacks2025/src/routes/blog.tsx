import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  component: Blog,
});

// Blog post data structure
const blogPosts = [
  {
    title: "Understanding Food Labels and Making Informed Choices",
    date: "May 15, 2021",
    summary: "Learn how to interpret food labels and make informed decisions about your food purchases. Research shows that consumers increasingly value transparency in food labeling.",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8156633/",
    // readTime: "6 min read",
    tags: ["Food Labels", "Consumer Education", "Health"]
  },
  {
    title: "The Health Benefits of Choosing Organic Foods",
    date: "-----",
    summary: "Organic products reduce public health risks by minimizing exposure to toxic chemicals in food, soil, air, and water. Discover how organic choices protect both consumers and farm workers.",
    link: "https://www.ota.com/health-benefits-organic",
    // readTime: "5 min read",
    tags: ["Organic", "Health", "Environment"]
  },
  {
    title: "Why GMOs Raise Concerns: A Comprehensive Look",
    date: "May 19, 2022",
    summary: "Explore the environmental and health implications of GMOs in our food system, and why many consumers are choosing non-GMO alternatives for their families.",
    link: "https://www.nongmoproject.org/blog/whats-wrong-with-gmos-a-lot/",
    // readTime: "7 min read",
    tags: ["GMO", "Food Safety", "Environment"]
  },
  {
    title: "The Benefits of Pasture-Raised Animals",
    date: "Fall 2003",
    summary: "Discover why pasture-raised animals produce healthier meat and dairy products, with higher levels of beneficial nutrients like omega-3 fatty acids and vitamins.",
    link: "https://www.mofga.org/resources/pasture/pasture/",
    // readTime: "8 min read",
    tags: ["Pasture-Raised", "Nutrition", "Animal Welfare"]
  },
  {
    title: "Why 100% Grass-Fed Beef Matters",
    date: "-----",
    summary: "Learn about the three main benefits of choosing 100% grass-fed beef: humane treatment of animals, environmental sustainability, and superior nutritional value.",
    link: "https://foxhollow.com/blogs/blog/why-100-grassfed-matters",
    // readTime: "5 min read",
    tags: ["Grass-Fed", "Sustainability", "Nutrition"]
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen pt-28 md:pt-32 bg-[#FAF3E0] dark:bg-gray-900 p-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-[#2E7D32] dark:text-[#4CAF50] transition-colors duration-200">
          Blog
        </h1>
        
        <div className="space-y-6">
          {blogPosts.map((post, index) => (
            <article 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg transition-colors duration-200"
            >
              <a 
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-2xl font-semibold text-[#2E7D32] dark:text-[#4CAF50] hover:text-[#4CAF50] transition-colors duration-200">
                    {post.title}
                  </h2>
                  {/* <span className="text-sm text-[#37474F]/60 dark:text-gray-400">{post.readTime}</span> */}
                </div>
                
                <p className="text-[#37474F] dark:text-gray-300 mb-4 transition-colors duration-200">
                  {post.summary}
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 flex-wrap">
                    {post.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-3 py-1 bg-[#E8F5E9] dark:bg-[#1B5E20] text-[#2E7D32] dark:text-[#4CAF50] rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-[#37474F]/60 dark:text-gray-400">{post.date}</span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
} 