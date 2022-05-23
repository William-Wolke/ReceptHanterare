import React, { useEffect, useState } from 'react';
import useFetch from './useFetch';
import { Link } from 'react-router-dom';

const RecipeList = () => {

    const { data: recipe, isPending, error } = useFetch("/recipe/all/", 'GET');

    return (
        <div className="ReceptLista" key="recipeListMain">
            <div>
              
            </div>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {recipe && recipe.map((recipe, index) => {
                return (
                    <Link to={"/recept/" + recipe.name} key={"recipe" + index}>
                        <div key={recipe.name + "container" + index}>
                            {/*<div className="receptBild" key={recipe.name+ " bilddiv"}>
                                <img src={recipe.image} alt={recipe.bildtext} key={recipe.name + " bild"}/>
                            </div>*/}
                            <div className="receptNamn" key={recipe.name + " attribut"}>
                                <p key={recipe.name + " tid"}>{recipe.attribute.time ? recipe.attribute.time : 0} min</p>
                            </div>
                            <div className="receptNamn" key={recipe.name + " namndiv"}>
                                <h3 key={recipe.name + " name"}>{recipe.name}</h3>
                            </div>
                            <div>
                                <img src={new URL("/static/" + recipe.image, process.env.REACT_APP_DB_HOSTNAME).href} alt={recipe.alt} height="100" width="100" />
                            </div>
                            <div key={recipe.name + " buttondiv"}>
                                <button key={recipe.name + " button"}>
                                    <i key={recipe.name + "icon"}></i>
                                </button>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    );
}
export default RecipeList;