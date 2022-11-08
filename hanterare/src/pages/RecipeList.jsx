import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';

const RecipeList = () => {

    const { data: recipe, isPending, error } = useFetch("/recipe/all/", 'GET');

    return (
        <div className="recipeList" key="recipeListMain">

            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {recipe && recipe.map((recipe, index) => {
                return (
                    <Link to={"/recept/" + recipe.name} key={"recipe" + index}>
                        <div className='recipeListItemContainer card'>
                            <div className="recipeListItem" key={recipe.name + "container" + index}>
                                <div className="recipeListTime" key={recipe.name + " attribut"}>
                                    <p key={recipe.name + " tid"}>{recipe.attribute.time ? recipe.attribute.time : 0} min</p>
                                </div>
                                <div className="recipeListName" key={recipe.name + " namndiv"}>
                                    <h3 key={recipe.name + " name"}>{recipe.name}</h3>
                                </div>
                                <div>
                                    <img 
                                        src={new URL("/static/" + recipe.image, process.env.REACT_APP_DB_HOSTNAME).href} 
                                        alt={recipe.alt}
                                        className="recipeListThumbnail" 
                                    />
                                </div>
                                <div key={recipe.name + " buttondiv"}>
                                    <button  className="recipeListButton" key={recipe.name + " button"}>
                                        <p>Lägg till i veckomeny</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    );
}
export default RecipeList;