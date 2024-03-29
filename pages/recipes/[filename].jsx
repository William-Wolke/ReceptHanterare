'use client';
import { useState } from 'react';
import Image from 'next/image';
import client from '../../tina/__generated__/client';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { useTina, tinaField } from 'tinacms/dist/react';
import IngredientList from '../../components/IngredientList';

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

export default function Recipe(props) {
    const { data } = useTina({
        query: props.query,
        variables: props.variables,
        data: props.data,
    });
    const recipe = data.recipes;

    const [currentPortions, setCurrentPortions] = useState(recipe.servings);

    function handleSubtractPortions() {
        if (!recipe) return;
        if (currentPortions < 1) {
            if (recipe.servings - 1 < 1) {
                setCurrentPortions(recipe.servings);
            } else {
                setCurrentPortions(recipe.servings - 1);
            }
        } else {
            if (currentPortions - 1 < 1) return;
            setCurrentPortions(currentPortions - 1);
        }
    }

    function handleAddPortions() {
        if (!recipe) return;
        if (currentPortions < 1) {
            setCurrentPortions(recipe.servings + 1);
        } else {
            setCurrentPortions(currentPortions + 1);
        }
    }

    return (
        <div className="">
            {recipe && (
                <div className="">
                    <div className="grid grid-cols-2">
                        <div className="w-5/6 mx-auto">
                            <h2 className="text-2xl mt-10" data-tina-field={tinaField(recipe, 'title')}>
                                {recipe.title}
                            </h2>
                            <div className="">
                                <div className="flex flex-row gap-4 text-sm pt-4 flex-wrap">
                                    <p className="my-auto" data-tina-field={tinaField(recipe, 'title')}>
                                        {recipe.time ? recipe.time : '0 min'}
                                    </p>
                                    {recipe.tags?.map((meal, index) => {
                                        return (
                                            <p className="rounded-full px-2 py-1 border border-[#84b082]" key={'meal' + index}>
                                                {meal}
                                            </p>
                                        );
                                    })}
                                </div>
                                <div className="pt-4 text-sm" data-tina-field={tinaField(recipe, 'description')}>
                                    <TinaMarkdown content={recipe.description} />
                                </div>
                            </div>
                        </div>
                        <div data-tina-field={tinaField(recipe, 'image')}>
                            {recipe.image && <Image src={recipe.image} height="400" width="400" className="" alt={recipe.title} />}
                        </div>
                    </div>
                    <div className="flex flex-col md:grid md:grid-cols-2 mt-6">
                        <div className="w-5/6 mx-auto flex flex-col gap-4">
                            <h3 className="text-xl">Ingredienser</h3>
                            <div className="flex flex-row border border-gray-300 rounded-lg w-full justify-between text-base">
                                <button className="border-r px-3 border-gray-300" onClick={handleSubtractPortions}>
                                    <p>-</p>
                                </button>
                                <p className="p-2">{currentPortions} portioner</p>
                                <button className="border-l px-3 border-gray-300" onClick={handleAddPortions}>
                                    <p>+</p>
                                </button>
                            </div>

                            {recipe?.ingredients?.length > 0 && (
                                <div className="border border-gray-300 rounded-lg text-base">
                                    <IngredientList
                                        ingredients={recipe.ingredients}
                                        servings={currentPortions}
                                        recipeServings={recipe.servings}
                                    />
                                </div>
                            )}

                            {recipe?.recipes?.length > 0 &&
                                recipe.recipes.map((childRecipe, index) => {
                                    return (
                                        <div key={index}>
                                            <h4>{childRecipe?.title}</h4>
                                            {childRecipe?.ingredients?.length > 0 && (
                                                <IngredientList ingredients={childRecipe?.ingredients} recipeServings={recipe.servings} />
                                            )}
                                        </div>
                                    );
                                })}
                        </div>
                        <div className="w-5/6 mx-auto flex flex-col gap-4">
                            <h3 className="text-xl">Gör så här</h3>
                            <div data-tina-field={tinaField(recipe, 'instructions')}>
                                <TinaMarkdown
                                    content={recipe.instructions}
                                    components={{
                                        li: (props) => <li className="list-decimal" {...props} />,
                                        ol: (props) => <ol className="flex flex-col gap-4 text-sm" {...props} />,
                                    }}
                                />
                            </div>
                            {recipe.recipes?.length > 0 && (
                                <div>
                                    <h2>Andra recept</h2>
                                    {recipe.recipes.map((recipeItem, index) => {
                                        return (
                                            <div key={index}>
                                                <h3>{recipeItem.title}</h3>
                                                <TinaMarkdown
                                                    content={recipeItem.description}
                                                    components={{
                                                        li: (props) => <li className="list-decimal" {...props} />,
                                                        ol: (props) => <ol className="flex flex-col gap-4 text-sm" {...props} />,
                                                    }}
                                                />
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
