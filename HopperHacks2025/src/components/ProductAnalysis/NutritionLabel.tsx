interface NutritionLabelProps {
  nutritionInfo: {
    product: {
      name: string;
      brand: string;
    };
    nutrition: {
      serving_size: string;
      calories: string;
      [key: string]: any;
    };
    ingredients: string[];
  };
}

export function NutritionLabel({ nutritionInfo }: NutritionLabelProps) {
  return (
    <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Nutrition Facts</h2>
      <div className="space-y-4">
        <div>
          <p>Serving Size {nutritionInfo.nutrition.serving_size}</p>
          <p>Calories {nutritionInfo.nutrition.calories}</p>
        </div>
        <div>
          <h3 className="font-bold">Ingredients</h3>
          <p className="text-sm">{nutritionInfo.ingredients.join(", ")}</p>
        </div>
      </div>
    </section>
  );
}
