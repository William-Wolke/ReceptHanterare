import { useState } from 'react';
import Image from 'next/image';
import client from '../../tina/__generated__/client';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

export const getStaticProps = async ({ params }) => {
    let data = {};
    let query = {};
    let variables = { relativePath: `${params.filename}.yaml` };
    try {
        const res = await client.queries.recipes(variables);
        query = res.query;
        data = res.data;
        variables = res.variables;
    } catch {
        // swallow errors related to document creation
    }

    return {
        props: {
            variables: variables,
            data: data,
            query: query,
            //myOtherProp: 'some-other-data',
        },
    };
};
export const getStaticPaths = async () => {
    const recipesListData = await client.queries.recipesConnection();
    return {
        paths: recipesListData.data.recipesConnection.edges.map((post) => ({
            params: { filename: post.node._sys.filename },
        })),
        fallback: false,
    };
};

export default function Recipe({ data }) {
    const recipe = data.recipes;

    const [currentPortions, setCurrentPortions] = useState(0);

    function handleSubtractPortions() {
        if (!recipe) return;
        if (currentPortions === 0) {
            if (recipe.servings - 2 < 1) {
                setCurrentPortions(recipe.servings);
            } else {
                setCurrentPortions(recipe.servings - 2);
            }
        } else {
            if (currentPortions - 2 < 1) return;
            setCurrentPortions(currentPortions - 2);
        }
    }

    function handleAddPortions() {
        if (!recipe) return;
        if (currentPortions === 0) {
            setCurrentPortions(recipe.servings + 2);
        } else {
            setCurrentPortions(currentPortions + 2);
        }
    }

    function getAmount(amount) {
        return parseFloat(amount) * ((currentPortions || recipe.servings) / recipe.servings).toFixed(2);
    }

    return (
        <div className="recept">
            {recipe && (
                <div className="recipeContainer">
                    <div className="recipeItem">
                        <div className="receptIntro">
                            <h2>{recipe.title}</h2>
                            <div className="recipeInfoContainer">
                                <div className="recipeInfoItem">
                                    <p className="recipeAttributeItem">{recipe.time ? recipe.time : '0 min'}</p>

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
                                    <TinaMarkdown content={recipe.description} />
                                </div>
                                {recipe?.recipes?.length > 0 &&
                                    recipe.recipes.map((childRecipe, index) => {
                                        return (
                                            <div key={index}>
                                                <h4>{childRecipe?.name}</h4>
                                                {childRecipe?.ingredients?.length > 0 &&
                                                    childRecipe.ingredients.map((ingredient, index) => {
                                                        return (
                                                            <div className="recipeIngredientItem" key={'childrecipeIngredient' + index}>
                                                                <p>{ingredient.name}</p>
                                                                <p>{getAmount(ingredient.amount)}</p>
                                                                <p>{ingredient.unit}</p>
                                                            </div>
                                                        );
                                                    })}
                                            </div>
                                        );
                                    })}
                                <div>
                                    <button>
                                        <i></i>
                                        <p>Lägg till i veckomenyn</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        <div className="recipeItem">
                            <div className="receptImageContainer">
                                {recipe.image && <Image src={recipe.image} height="400" width="400" className="recipeImage" />}
                            </div>
                        </div>
                    }
                    <div className="recipeItem">
                        <h3 className="text-xl">Ingredienser</h3>
                        <div className="flex flex-row border border-gray-300 rounded-lg w-full justify-between text-base">
                            <button className="border-r px-3 border-gray-300" onClick={handleSubtractPortions}>
                                <p>-</p>
                            </button>
                            <p className='p-2'>{currentPortions === 0 ? recipe.servings : currentPortions} portioner</p>
                            <button className='border-l px-3 border-gray-300' onClick={handleAddPortions}>
                                <p>+</p>
                            </button>
                        </div>
                        <div className="border border-gray-300 rounded-lg text-base">
                            {recipe.ingredients &&
                                recipe.ingredients.map((ingredient, index) => {
                                    return (
                                        <div className="w-full flex flex-row border-b border-gray-300 py-2 px-3 gap-2" key={'ingredient' + index}>
                                            <p className='font-medium'>{ingredient.name.title}</p>
                                            <p className='ml-auto'>{getAmount(ingredient.amount)}</p>
                                            <p>{ingredient.unit}</p>
                                        </div>
                                    );
                                })}
                        </div>
                        {recipe?.recipes?.length > 0 &&
                            recipe.recipes.map((childRecipe, index) => {
                                return (
                                    <div key={index}>
                                        <h4>{childRecipe?.title}</h4>
                                        {childRecipe?.ingredients?.length > 0 &&
                                            childRecipe.ingredients.map((ingredient, index) => {
                                                return (
                                                    <div className="w-full flex flex-row border-b border-gray-300 py-2 px-3 gap-2" key={'child-ingredient' + index}>
                                                        <p className='font-medium'>{ingredient.name.title}</p>
                                                        <p className='ml-auto'>{getAmount(ingredient.amount)}</p>
                                                        <p>{ingredient.unit}</p>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                );
                            })}
                    </div>
                    <div className="recipeItem">
                        <div className="recipeInstructionsContainer">
                            <div>
                                <h3>Gör så här</h3>
                            </div>
                            <TinaMarkdown
                                content={recipe.instructions}
                                components={{
                                    li: (props) => <li className="recipeInstructionItem" {...props} />,
                                }}
                            />
                            {recipe.recipes?.length > 0 && (
                                <div>
                                    <h2>Andra recept</h2>
                                    {recipe.recipes.map((recipeItem, index) => {
                                        return (
                                            <div key={index}>
                                                <h3>{recipeItem.title}</h3>
                                                <TinaMarkdown content={recipeItem.description} />
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
}
