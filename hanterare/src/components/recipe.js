import React, { useEffect, useState } from 'react';
import useFetch from './useFetch';

const RecipeList = () => {

  const { data: recipe, isPending, error } = useFetch('http://localhost:8000/recept/' + "Lätt sallad", 'GET', );



  return (
    <div className="Recept">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {recipe &&
        recipe
          .map(recipe => (
            <div key={recipe.namn}>
              <div className="receptBild">
                <img src={recipe.bild} alt={recipe.bildtext} />
              </div>

              <div className="receptIntro">
                <h2>{recipe.namn}</h2>
                <div className="receptInfo">
                  <i></i>
                  <p>{recipe.attribut.tid} min</p>
                  <i></i>
                  <div className="måltidsTyp">
                    {recipe.attribut.måltid.map(måltid => (
                      <p>{måltid}</p>
                    ))}
                  </div>
                  <div className="receptBeskrivning">
                    <p>{recipe.beskrivning}</p>
                  </div>
                  <div>
                    <button>
                      <i></i>
                      <p>Lägg till i veckomenyn</p>
                    </button>
                  </div>
                  <div className="receptAttribut">
                    <i></i>
                    <div>{recipe.attribut.kök.map(kök => (
                      <p>{kök}</p>
                    ))}</div>
                    <div>{recipe.attribut.kost.map(kost => (
                      <p>{kost}</p>
                    ))}</div>
                    <div>{recipe.attribut.egenskap.map(egenskap => (
                      <p>{egenskap}</p>
                    ))}</div>
                  </div>
                </div>
              </div>

              <div className="ingredienser">
                <h3>Ingredienser</h3>
                <div className='portioner'>
                  <button><i></i></button>
                  <p>{recipe.attribut.portioner} portioner</p>
                  <button><i></i></button>
                </div>
                <div>
                  <div>{recipe.ingredienser.map(ingrediens => (
                    <div>
                      <p>{ingrediens.namn}</p>
                      <p>{ingrediens.mängd}</p>
                      <p>{ingrediens.enhet}</p>
                    </div>
                  ))}</div>
                </div>
              </div>

              <div className='instruktioner'>
                <div>
                  <i></i>
                  <h3>Gör så här</h3>
                </div>
                <div>{recipe.steg.map((steg, index) => (
                  <div key={index}>
                    <input type="checkbox" />
                    <div>
                      <p>{index+1 + "."}</p>
                      <p>{steg}</p>
                    </div>
                  </div>
                ))}</div>
                <div>
                  <i></i>
                  <h3>Klart!</h3>
                </div>
              </div>

            </div>
          )
          )
      }
    </div>
  );
}
export default RecipeList;