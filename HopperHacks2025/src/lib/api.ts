interface Food {
  description?: string;
  brandOwner?: string;
}

export async function searchUSDA(
  query: string,
  type: "brand" | "food",
  setResults: (results: string[]) => void
) {
  try {
    const formattedQuery = encodeURIComponent(query.trim());
    const response = await fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=vkSSiGfkDonu3zSRPGsIoMeRpejLQ27wUm198G9l&query=${formattedQuery}&pageSize=8`
    );
    const data = await response.json();

    if (type === "brand") {
      const uniqueBrands = [
        ...new Set(
          data.foods
            .map((food: Food) => food.brandOwner?.trim())
            .filter(
              (brand: string | null) =>
                brand && brand.toLowerCase().includes(query.toLowerCase())
            )
            .map((brand: string) => {
              return brand
                .split(" ")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ");
            })
        ),
      ];

      const sortedBrands = uniqueBrands
        .sort((a: string, b: string) => {
          const aLower = a.toLowerCase();
          const bLower = b.toLowerCase();
          const queryLower = query.toLowerCase();

          if (aLower === queryLower) return -1;
          if (bLower === queryLower) return 1;
          if (aLower.startsWith(queryLower) && !bLower.startsWith(queryLower))
            return -1;
          if (!aLower.startsWith(queryLower) && bLower.startsWith(queryLower))
            return 1;
          return a.length - b.length;
        })
        .slice(0, 5);

      setResults(sortedBrands);
    } else {
      const uniqueFoods = [
        ...new Set(
          data.foods
            .map((food: Food) => ({
              description: food.description?.trim(),
              brandOwner: food.brandOwner,
            }))
            .filter(
              (food: Food) =>
                food.description &&
                food.description.toLowerCase().includes(query.toLowerCase())
            )
            .map((food: Food) => ({
              ...food,
              description: food
                .description!.split(" ")
                .map(
                  (word: string) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" "),
            }))
        ),
      ]
        .sort((a: Food, b: Food) => {
          const aLower = a.description!.toLowerCase();
          const bLower = b.description!.toLowerCase();
          const queryLower = query.toLowerCase();

          if (aLower === queryLower) return -1;
          if (bLower === queryLower) return 1;
          if (aLower.startsWith(queryLower) && !bLower.startsWith(queryLower))
            return -1;
          if (!aLower.startsWith(queryLower) && bLower.startsWith(queryLower))
            return 1;
          return a.description!.length - b.description!.length;
        })
        .slice(0, 5);

      setResults(uniqueFoods.map((f: Food) => f.description!));
    }
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    setResults([]);
  }
}
