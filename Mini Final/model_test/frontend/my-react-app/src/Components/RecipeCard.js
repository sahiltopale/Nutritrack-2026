import React, { useState } from "react";

const RecipeCard = ({ recipe }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="recipe-card">
      {" "}
      {/* Apply the CSS class here */}
      <h3>{recipe.strMeal}</h3>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} width="100%" />
      <p>
        <strong>Category:</strong> {recipe.strCategory}
      </p>
      <p>
        {showMore
          ? recipe.strInstructions
          : recipe.strInstructions.substring(0, 100) + "..."}
      </p>
      <button onClick={() => setShowMore(!showMore)}>
        {showMore ? "Show Less" : "Read More"}
      </button>
    </div>
  );
};

export default RecipeCard;