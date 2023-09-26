import Link from 'next/link';
import Image from 'next/image';
import { client } from '../../tina/__generated__/client';

export const getStaticProps = async ({ params }) => {
    const recipesResponse = await client.queries.recipesConnection();
    const recipes = recipesResponse.data.recipesConnection.edges.map((recipe) => {
        return recipe.node;
    });
    return {
        props: {
            recipes: recipes,
        },
    };
};

export default function RecipeList({ recipes }) {
    return (
        <div className="w-[90%] flex flex-row flex-wrap gap-4 mx-auto mt-8" key="recipeListMain">
            {recipes &&
                recipes.map((recipe, index) => {
                    return (
                        <Link href={'/recipes/' + recipe._sys.filename} key={'recipe' + index}>
                            <div className="bg-[#84b082] w-72 h-64" key={recipe.title + 'container' + index}>
                                <div className="h-48 w-48 mx-auto">
                                    {recipe.image && (
                                        <Image
                                            src={recipe.image}
                                            alt={recipe.alt}
                                            width={300}
                                            height={200}
                                        />
                                    )}
                                </div>
                                <div className="px-4 pb-4 pt-1" key={recipe.title + ' attribut'}>
                                    <p key={recipe.title + ' tid'}>{recipe.time ? recipe.time : 0}</p>
                                    <h3 key={recipe.title + ' name'} className="text-base">
                                        {recipe.title}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    );
                })}
        </div>
    );
}
