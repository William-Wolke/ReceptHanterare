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
        <div className="w-5/6 flex flex-row flex-wrap gap-4 mx-auto mt-8 justify-center">
            {recipes &&
                recipes.map((recipe, index) => {
                    return (
                        <div className="h-56 w-64" key={`recipe${index}`}>
                            <Link href={`/recipes/${recipe._sys.filename}`}>
                                <div className="h-36 w-42 rounded-t relative bg-[#84b082]">
                                    {/* <span className='absolute top-0 left-0 bg-gray-600 text-white opacity-70 px-2 py-1 rounded-tl'>{day}</span> */}
                                    {recipe.image && <Image src={recipe.image} height="200" width="200" className="" alt={recipe.title} />}
                                </div>
                            </Link>
                            <div className="" key={`weekdayrecipe${index}`}>
                                <p className="uppercase text-gray-600">{recipe.time}</p>
                                <Link href={`/recipes/${recipe._sys.filename}`}>
                                    <h3 className="text-base text-gray-700 font-semibold">{recipe.title}</h3>
                                </Link>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}
