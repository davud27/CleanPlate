export function NutritionLabel() {
  return (
    <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-lg transition-colors duration-200">
      <h2 className="text-xl font-bold text-[#37474F] dark:text-gray-300 mb-4 border-b-2 border-[#37474F] dark:border-gray-300 pb-2">
        Nutrition Facts
      </h2>
      <div className="space-y-4">
        <div className="border-b border-[#37474F] dark:border-gray-300 pb-2">
          <p className="font-bold text-[#37474F] dark:text-gray-300">
            Serving Size 1 cup (228g)
          </p>
          <p className="font-bold text-[#37474F] dark:text-gray-300">
            Servings Per Container 4
          </p>
        </div>

        <div className="space-y-2">
          <div className="border-b border-[#37474F] dark:border-gray-300 pb-1">
            <p className="font-bold text-lg text-[#37474F] dark:text-gray-300">
              Amount Per Serving
            </p>
            <div className="flex justify-between text-[#37474F] dark:text-gray-300">
              <span className="font-bold">Calories</span>
              <span>250</span>
            </div>
          </div>

          <NutritionRow label="Total Fat" value="8g" />
          <NutritionRow label="Sodium" value="620mg" />
          <NutritionRow label="Total Carbohydrate" value="37g" />
          <NutritionRow label="Protein" value="8g" />
        </div>

        <div className="text-sm space-y-1">
          <NutritionRow label="Vitamin D" value="2mcg 10%" />
          <NutritionRow label="Calcium" value="260mg 20%" />
          <NutritionRow label="Iron" value="4.5mg 25%" />
          <NutritionRow label="Potassium" value="235mg 6%" />
        </div>

        <div className="border-t border-[#37474F] dark:border-gray-300 pt-4 mt-4">
          <p className="font-bold text-lg mb-2 text-[#37474F] dark:text-gray-300">
            Ingredients
          </p>
          <p className="text-sm leading-relaxed text-[#37474F] dark:text-gray-300">
            Organic Grade A Milk, Vitamin D3, Vitamin A Palmitate
          </p>
        </div>
      </div>
    </section>
  );
}

interface NutritionRowProps {
  label: string;
  value: string;
}

function NutritionRow({ label, value }: NutritionRowProps) {
  return (
    <div className="border-b border-[#37474F] dark:border-gray-300 pb-1">
      <div className="flex justify-between text-[#37474F] dark:text-gray-300">
        <span>{label}</span>
        <span>{value}</span>
      </div>
    </div>
  );
}
