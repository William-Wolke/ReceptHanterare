import React, { useEffect, useState } from 'react';
import useFetch from './useFetch';

const RecipeList = () => {

  const { data: recipe, isPending, error } = useFetch('http://localhost:8000/recept', 'POST');



  return (
    <div className="Recept">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {recipe &&
        recipe
          .map((recipe, index) => (
            <div key={recipe.namn}>
              <div className="receptBild">
                <img src={recipe.bild} alt={recipe.bildtext} />
              </div>
              <div className="receptNamn">
                <p>{recipe.attribut.tid} min</p>   
              </div>
              <div className="receptNamn">
                <h3>{recipe.namn}</h3>   
              </div>
              <div>
                  <button>
                      <i></i>
                  </button>
              </div>
            </div>    
          ))
      }
    </div>
  );
}
export default RecipeList;