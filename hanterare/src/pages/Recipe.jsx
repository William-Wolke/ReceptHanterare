import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const Recipe = () => {
    const { name } = useParams();

    const { data: recipe, isPending, error } = useFetch(`/recipe/one/${name}/`, 'GET');

    return (
        <div className="recept">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {recipe && (
                <div key={recipe.name} className="recipeContainer">
                    <div className="recipeItem">
                        <div className="receptIntro">
                            <h2>{recipe.name}</h2>
                            <div className="recipeInfoContainer">
                                <div className="recipeInfoItem">
                                    <p className="recipeAttributeItem">{recipe.time ? recipe.time : 0} min</p>

                                    {recipe.tags.map((meal, index) => {
                                        return (
                                            <p className="recipeAttributeItem" key={'meal' + index}>
                                                {meal}
                                            </p>
                                        );
                                    })}
                                </div>
                                <div className="recipeInfoItem"></div>
                                <div className="receptBeskrivning">
                                    <p>{recipe.description}</p>
                                </div>
                                <div>
                                    <button>
                                        <i></i>
                                        <p>Lägg till i veckomenyn</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="recipeItem">
                        <div className="receptImageContainer">
                            <img
                                src={new URL('/static/' + recipe.image, process.env.REACT_APP_DB_HOSTNAME).href}
                                alt={recipe.alt}
                                height="400"
                                width="400"
                                className="recipeImage"
                            />
                        </div>
                    </div>
                    <div className="recipeItem">
                        <div className="ingredienser">
                            <h3>Ingredienser</h3>
                            <div className="recipePortions">
                                <button>
                                    <p>-</p>
                                </button>
                                <p>{recipe.portions} portioner</p>
                                <button>
                                    <p>+</p>
                                </button>
                            </div>
                            <div className="recipeIngredientContainer">
                                {recipe.ingredients &&
                                    recipe.ingredients.map((ingredient, index) => {
                                        return (
                                            <div className="recipeIngredientItem" key={'ingredient' + index}>
                                                <p>{ingredient.name}</p>
                                                <p>{ingredient.amount}</p>
                                                <p>{ingredient.unit}</p>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                    <div className="recipeItem">
                        <div className="recipeInstructionsContainer">
                            <div>
                                <h3>Gör så här</h3>
                            </div>
                            {recipe.steps.map((step, index) => {
                                return (
                                    <div key={index} className="recipeInstructionsItem">
                                        <input type="checkbox" />
                                        <p>{index + 1 + '.'}</p>
                                        <p>{step}</p>
                                    </div>
                                );
                            })}
                            {recipe.recipes?.length > 0 && (
                                <div>
                                    <h2>Andra recept</h2>
                                    {recipe.recipes.map((recipeItem) => {
                                        return (
                                            <div>
                                                <h3>{recipeItem.name}</h3>
                                                {recipeItem?.steps.length > 0 && (
                                                    <ol>
                                                        {recipeItem.steps.map((step) => {
                                                            return <li>{step}</li>;
                                                        })}
                                                    </ol>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Recipe;
