import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState("All");

  function handleAddFood() {
    const newFood = getNewSpicyFood();
    if (newFood === undefined) return;
    setFoods([...foods, newFood]);
  }

  const handleRemoveFood = (foodId) => {
    setFoods(foods.filter((food) => food.id !== foodId));
  };

  const handleIncrementHeat = (foodId) => {
    setFoods(
      foods.map((food) => {
        if (food.id === foodId) {
          return { ...food, heatLevel: food.heatLevel + 1 };
        }
        return food;
      })
    );
  };

  const handleFitlerChange = (e) => {
    setFilterBy(e.target.value);
  };

  const foodToDisplay = foods.filter((food) => {
    if (filterBy === "All") return true;
    return filterBy === food.cuisine;
  });

  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <select name="filter" onChange={handleFitlerChange}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <ul>
        {foodToDisplay.map((food) => {
          return (
            <li key={food.id} style={{ display: "flex" }}>
              <div>
                {food.name}
                <span>{`, Cuisine: ${food.cuisine}, HeatLevel: ${food.heatLevel}`}</span>
                <button
                  onClick={() => handleIncrementHeat(food.id)}
                  style={{ marginLeft: 5 }}
                >
                  ⬆️
                </button>
              </div>
              <button
                style={{ marginLeft: 5 }}
                onClick={() => handleRemoveFood(food.id)}
              >
                🗑️
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SpicyFoodList;
