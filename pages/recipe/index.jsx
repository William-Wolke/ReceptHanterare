// import useFetch from '../../src/hooks/useFetch';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '../../src/db';

export async function getServerSideProps() {
    const recipes = await db.Recipe.find({}).lean();

    return {
        props: {
            recipes: JSON.parse(JSON.stringify(recipes)),
        },
    };
}

export default function RecipeList({ recipes }) {
    return (
        <div className="recipeList" key="recipeListMain">
            {recipes &&
                recipes.map((recipe, index) => {
                    return (
                        <Link href={'/recipe/' + recipe.name} key={'recipe' + index}>
                            <div className="recipeListItemContainer card">
                                <div className="recipeListItem" key={recipe.name + 'container' + index}>
                                    <div className="recipeListTime" key={recipe.name + ' attribut'}>
                                        <p key={recipe.name + ' tid'}>{recipe.time ? recipe.time : 0} min</p>
                                    </div>
                                    <div className="recipeListName" key={recipe.name + ' namndiv'}>
                                        <h3 key={recipe.name + ' name'}>{recipe.name}</h3>
                                    </div>
                                    <div>
                                        <Image
                                            src={new URL('/images/' + recipe.image, process.env.NEXT_PUBLIC_BASE_URL).href}
                                            alt={recipe.alt}
                                            className="recipeListThumbnail"
                                            width={200}
                                            height={200}
                                        />
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
