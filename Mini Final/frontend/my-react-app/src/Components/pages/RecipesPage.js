import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar";
import RecipeList from "../RecipeList";
import "./RecipesPage.css"; // ✅ Import the CSS

const RecipesPage = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (query === "") return;

    const fetchRecipes = async () => {
      try {
        if (query.toLowerCase() === "indian") {
          const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian`
          );
          const data = await res.json();

          if (!data.meals) {
            setRecipes([]);
            return;
          }

          const detailedMeals = await Promise.all(
            data.meals.map(async (meal) => {
              const detailRes = await fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
              );
              const detailData = await detailRes.json();
              return detailData.meals[0];
            })
          );

          setRecipes(detailedMeals);
        } else {
          const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
          );
          const data = await res.json();
          setRecipes(data.meals || []);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setRecipes([]);
      }
    };

    fetchRecipes();
  }, [query]);

  return (
    <div className="recipes-page-container">
      <h1 className="recipes-page-title">Find Your Favorite Recipes 🍽️</h1>
      <SearchBar query={query} onChange={(e) => setQuery(e.target.value)} />
      <div className="recipes-page-list">
        <RecipeList recipes={recipes} />
      </div>
    </div>
  );
};

export default RecipesPage;