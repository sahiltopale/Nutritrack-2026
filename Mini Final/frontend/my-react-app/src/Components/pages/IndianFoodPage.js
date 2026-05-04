import React, { useEffect } from "react";
import "./IndianFoodPage.css";

const IndianFoodPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="indian-food-container">
      <h1>Our Trained Indian Foods</h1>
      <p>
        Explore the diverse and rich Indian food varieties that NutriTrack has
        been trained on. Each food item comes with nutritional information to
        help you make healthier food choices.
      </p>

      {/* Popular Indian Dishes section */}
      <section>
        <h2>Popular Indian Dishes</h2>
        <div className="food-list">
          <div className="food-card">
            <img src="/images_used/samosa.jpg" alt="Samosa" />
            <h3>Samosa</h3>
            <p>Vegetarian | 100g</p>
            <ul>
              <li>Calories: 150 kcal</li>
              <li>Protein: 5g</li>
              <li>Fats: 8g</li>
              <li>Carbs: 18g</li>
            </ul>
          </div>

          <div className="food-card">
            <img src="/images_used/palakpaneer.jpg" alt="Paalak Paneer" />
            <h3>Paalak Paneer</h3>
            <p>Vegetarian | 200g</p>
            <ul>
              <li>Calories: 300 kcal</li>
              <li>Protein: 15g</li>
              <li>Fats: 20g</li>
              <li>Carbs: 18g</li>
            </ul>
          </div>

          <div className="food-card">
            <img src="/images_used/dosa.jpg" alt="Dosa" />
            <h3>Dosa</h3>
            <p>Vegetarian | 150g</p>
            <ul>
              <li>Calories: 180 kcal</li>
              <li>Protein: 6g</li>
              <li>Fats: 7g</li>
              <li>Carbs: 30g</li>
            </ul>
          </div>

          <div className="food-card">
            <img src="/images_used/idli.jpg" alt="Idli" />
            <h3>Idli</h3>
            <p>Vegetarian | 100g</p>
            <ul>
              <li>Calories: 120 kcal</li>
              <li>Protein: 4g</li>
              <li>Fats: 2g</li>
              <li>Carbs: 24g</li>
            </ul>
          </div>

          <div className="food-card">
            <img src="/images_used/besanchilee.jpg" alt="Besan Chilaa" />
            <h3>Besan Chilaa</h3>
            <p>Vegetarian | 100g</p>
            <ul>
              <li>Calories: 200 kcal</li>
              <li>Protein: 10g</li>
              <li>Fats: 10g</li>
              <li>Carbs: 25g</li>
            </ul>
          </div>

          <div className="food-card">
            <img src="/images_used/gulabjamun.jpg" alt="Gulab Jamun" />
            <h3>Gulab Jamun</h3>
            <p>Dessert | 100g</p>
            <ul>
              <li>Calories: 150 kcal</li>
              <li>Protein: 2g</li>
              <li>Fats: 6g</li>
              <li>Carbs: 25g</li>
            </ul>
          </div>

          <div className="food-card">
            <img src="/images_used/poha.jpg" alt="Poha" />
            <h3>Poha</h3>
            <p>Vegetarian | 150g</p>
            <ul>
              <li>Calories: 180 kcal</li>
              <li>Protein: 5g</li>
              <li>Fats: 6g</li>
              <li>Carbs: 30g</li>
            </ul>
          </div>

          <div className="food-card">
            <img src="/images_used/rice.jpg" alt="Rice" />
            <h3>Rice</h3>
            <p>Vegetarian | 200g</p>
            <ul>
              <li>Calories: 200 kcal</li>
              <li>Protein: 4g</li>
              <li>Fats: 0g</li>
              <li>Carbs: 45g</li>
            </ul>
          </div>
          <div className="food-card">
            <img src="/images_used/pizza.jpg" alt="Pizza" />
            <h3>Pizza</h3>
            <p>Vegetarian | 150g</p>
            <ul>
              <li>Calories: 300 kcal</li>
              <li>Protein: 12g</li>
              <li>Fats: 10g</li>
              <li>Carbs: 35g</li>
              </ul>
             </div>
        </div>

        {/* New additional message */}
        <p className="coming-soon-text">
          And many more Indian foods coming soon😋!
        </p>
      </section>
    </div>
  );
};

export default IndianFoodPage;