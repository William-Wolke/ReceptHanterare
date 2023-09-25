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
        <div className="recipeList" key="recipeListMain">
            {recipes &&
                recipes.map((recipe, index) => {
                    return (
                        <Link href={'/recipes/' + recipe._sys.filename} key={'recipe' + index}>
                            <div className="recipeListItemContainer card">
                                <div className="recipeListItem" key={recipe.title + 'container' + index}>
                                    <div className="recipeListTime" key={recipe.title + ' attribut'}>
                                        <p key={recipe.title + ' tid'}>{recipe.time ? recipe.time : 0}</p>
                                    </div>
                                    <div className="recipeListName" key={recipe.title + ' namndiv'}>
                                        <h3 key={recipe.title + ' name'}>{recipe.title}</h3>
                                    </div>
                                    <div>
                                        {recipe.image && (
                                            <Image
                                                src={recipe.image}
                                                alt={recipe.alt}
                                                className="recipeListThumbnail"
                                                width={200}
                                                height={200}
                                            />
                                        )}
                                    </div>
                                    <div key={recipe.name + ' buttondiv'}>
                                        <button className="recipeListButton" key={recipe.name + ' button'}>
                                            <p>Lägg till i veckomeny</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
        </div>
    );
}
