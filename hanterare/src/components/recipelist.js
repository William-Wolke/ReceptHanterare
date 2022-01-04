import React, { useEffect, useState } from 'react';
import recipes from '../data/recept.json';

const RecipeList = () => {

  const [recipe, setRecipe] = useState(recipes); 

  return (
    <div className="Recept">
        {
          recipe
            .map(recipe => (
              <div key={recipe.namn}>
                <img src={recipe.bild} alt={recipe.bildtext} />
                <h2>{recipe.namn}</h2>
                <p>{recipe.tillvägagångsätt.tillagning}</p>
                <div>{recipe.attribut.egenskap.map(kost => (
                    <p>{kost}</p>
                ))}</div>
              </div>
            )
          )
        }
    </div>
  );
}
export default RecipeList;