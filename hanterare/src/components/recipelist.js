import React, { useEffect, useState } from 'react';

const RecipeList = () => {

  const [recipe, setRecipe] = useState(null); 

  useEffect(() => {
    fetch('http://localhost:8000/recept')
      .then(res => {
        return res.json()
      })
      .catch(console.error())
      .then(data => {
        console.log(data)
      })
      .catch(error => console.error(error));

      
  }, []);

  return (/*
    <div className="Recept">
        {
          recipe
            .map(recipe => (
              <div key={recipe.namn}>
                <div>
                <img src={recipe.bild} alt={recipe.bildtext} />
                </div>
                <h2>{recipe.namn}</h2>
                <div>{recipe.attribut.egenskap.map(kost => (
                    <p>{kost}</p>
                ))}</div>
                <p>{recipe.steg.tillagning}</p>
              </div>
            )
          )
        }
    </div>
  */null);
}
export default RecipeList;