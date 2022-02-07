import React, { useEffect, useState } from 'react';
import useFetch from './useFetch';
import { Link } from 'react-router-dom';

const RecipeList = () => {

  const { data: recipe, isPending, error } = useFetch('http://192.168.0.122:8000/allaRecept', 'GET');



  return (
    <div className="ReceptLista" key="recipeListMain">
      <div>
        
      </div>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {recipe &&
        recipe
          .map((recipe, index) => (
            <Link to={"/recept/" + recipe.namn} key={"recipe" + index}>
              <div key={recipe.namn + "div" + index}>
                <div className="receptBild" key={recipe.namn+ " bilddiv"}>
                  <img src={recipe.bild} alt={recipe.bildtext} key={recipe.namn + " bild"}/>
                </div>
                <div className="receptNamn" key={recipe.namn + " attribut"}>
                  <p key={recipe.namn + " tid"}>{recipe.attribut.tid} min</p>
                </div>
                <div className="receptNamn" key={recipe.namn + " namndiv"}>
                  <h3 key={recipe.namn + " namn"}>{recipe.namn}</h3>
                </div>
                <div key={recipe.namn + " buttondiv"}>
                  <button key={recipe.namn + " button"}>
                    <i key={recipe.namn + "icon"}></i>
                  </button>
                </div>
              </div>
            </Link>
          ))
      }
    </div>
  );
}
export default RecipeList;