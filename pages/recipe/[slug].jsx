import { useState } from 'react';
import Image from 'next/image';
import { db } from '../../src/db';

export async function getServerSideProps(context) {
    const slug = context.query.slug;
    console.log("🚀 ~ file: [slug].jsx:9 ~ getServerSideProps ~ slug:", slug)
    if (!slug) {
        throw new Error('Invalid query params');
    }
    const recipe = await db.Recipe.findOne({name: slug}).lean();
    console.log("🚀 ~ file: [slug].jsx:12 ~ getServerSideProps ~ recipe:", recipe)

    return {
        props: {
            recipe: JSON.parse(JSON.stringify(recipe)),
        }
    }
}

export default function Recipe({recipe}) {
console.log("🚀 ~ file: [slug].jsx:22 ~ Recipe ~ recipe:", recipe)

    const [currentPortions, setCurrentPortions] = useState(0);

    function handleSubtractPortions() {
        if (!recipe) return;
        if (currentPortions === 0) {
            if (recipe.portions - 2 < 1) {
                setCurrentPortions(recipe.portions);
            } else {
                setCurrentPortions(recipe.portions - 2);
            }
        } else {
            if (currentPortions - 2 < 1) return;
            setCurrentPortions(currentPortions - 2);
        }
    };

    function handleAddPortions() {
        if (!recipe) return;
        if (currentPortions === 0) {
            setCurrentPortions(recipe.portions + 2);
        } else {
            setCurrentPortions(currentPortions + 2);
        }
    };

    return (
        <div className="recept">
            {recipe && (
                <div className="recipeContainer">
                    <div className="recipeItem">
                        <div className="receptIntro">
                            <h2>{recipe.name}</h2>
                            <div className="recipeInfoContainer">
                                <div className="recipeInfoItem">
                                    <p className="recipeAttributeItem">{recipe.time ? recipe.time : 0} min</p>

                                    {recipe.tags?.map((meal, index) => {
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
                            <Image
                                src={new URL('/images/' + recipe.image, process.env.NEXT_PUBLIC_BASE_URL).href}
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
                                <button onClick={handleSubtractPortions}>
                                    <p>-</p>
                                </button>
                                <p>{currentPortions === 0 ? recipe.portions : currentPortions} portioner</p>
                                <button onClick={handleAddPortions}>
                                    <p>+</p>
                                </button>
                            </div>
                            <div className="recipeIngredientContainer">
                                {recipe.ingredients &&
                                    recipe.ingredients.map((ingredient, index) => {
                                        return (
                                            <div className="recipeIngredientItem" key={'ingredient' + index}>
                                                <p>{ingredient.name}</p>
                                                <p>{ingredient.amount * ((currentPortions || recipe.portions) / recipe.portions)}</p>
                                                <p>{ingredient.unit}</p>
                                            </div>
                                        );
                                    })}
                            </div>
                            {recipe?.recipes?.length > 0 &&
                                recipe.recipes.map((childRecipe, index) => {
                                    return (
                                        <div key={index}>
                                            <h4>{childRecipe?.name}</h4>
                                            {childRecipe?.ingredients?.length > 0 &&
                                                childRecipe.ingredients.map((ingredient, index) => {
                                                    console.log(ingredient.amount, recipe.portions / (currentPortions || 1));
                                                    return (
                                                        <div className="recipeIngredientItem" key={'childrecipeIngredient' + index}>
                                                            <p>{ingredient.name}</p>
                                                            <p>
                                                                {ingredient.amount *
                                                                    ((currentPortions || recipe.portions) / recipe.portions)}
                                                            </p>
                                                            <p>{ingredient.unit}</p>
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <div className="recipeItem">
                        <div className="recipeInstructionsContainer">
                            <div>
                                <h3>Gör så här</h3>
                            </div>
                            {recipe.steps?.map((step, index) => {
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
                                    {recipe.recipes.map((recipeItem, index) => {
                                        return (
                                            <div key={index}>
                                                <h3>{recipeItem.name}</h3>
                                                {recipeItem?.steps?.length > 0 && (
                                                    <ol>
                                                        {recipeItem.steps?.map((step, index) => {
                                                            return <li key={index}>{step}</li>;
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
