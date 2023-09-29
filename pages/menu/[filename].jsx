import Link from 'next/link';
import client from '../../tina/__generated__/client';
import { getShoppingList, summarizeShoppingList } from '../../src/helpers';
import Image from 'next/image';

export const getStaticProps = async ({ params }) => {
    let data = {};
    let query = {};
    let variables = { relativePath: `${params.filename}.yaml` };
    try {
        const res = await client.queries.menus(variables);
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
    const menusListData = await client.queries.menusConnection();
    return {
        paths: menusListData.data.menusConnection.edges.map((post) => ({
            params: { filename: post.node._sys.filename },
        })),
        fallback: false,
    };
};

export default function Menu({ data }) {
    const menu = data.menus;
    const shoppingList = summarizeShoppingList(getShoppingList(menu.recipes));

    const weekday_recipes = {};
    if (menu?.recipes) {
        for (const recipe of menu.recipes) {
            if (recipe.day in weekday_recipes) {
                weekday_recipes[recipe.day].push(recipe.name);
            } else {
                weekday_recipes[recipe.day] = [recipe.name];
            }
        }
    }

    return (
        <div className="menuContainer">
            {menu && (
                <div>
                    <div className="">
                        {/* Titel */}
                        <div className="w-5/6 mx-auto">
                            <Link href={`/menu/${menu._sys.filename}`}>
                                <h3 className="text-xl text-center">{menu.title}</h3>
                            </Link>
                        </div>

                        <div className="flex flex-row gap-6 mt-6 flex-wrap w-5/6 mx-auto">
                            {weekday_recipes &&
                                Object.entries(weekday_recipes)
                                    .reverse()
                                    .map(([day, recipes], i) => {
                                        if (recipes.length == 0) {
                                            return;
                                        }
                                        return (
                                            <div key={day + i} className="h-56 w-64">
                                                {/* TODO: Make this a reusable component*/}
                                                {recipes &&
                                                    recipes.map((recipe, index) => {
                                                        return (
                                                            <div key={`${day}recipe${index}`}>
                                                                <div className="h-36 w-42 rounded-t relative bg-[#84b082]">
                                                                    <span className="absolute top-0 left-0 bg-gray-600 text-white opacity-70 px-2 py-1 rounded-tl">
                                                                        {day}
                                                                    </span>
                                                                    {recipe.image && (
                                                                        <Image
                                                                            src={recipe.image}
                                                                            height="200"
                                                                            width="200"
                                                                            className=""
                                                                            alt={recipe.title}
                                                                        />
                                                                    )}
                                                                </div>
                                                                <div className="" key={`weekdayrecipe${index}`}>
                                                                    <div className="flex flex-row justify-between">
                                                                        <p className="uppercase text-gray-600">{recipe.time}</p>
                                                                        <p className="uppercase text-gray-600">{recipe.servings} port</p>
                                                                    </div>
                                                                    <h3 className="text-base text-gray-700 font-semibold">
                                                                        {recipe.title}
                                                                    </h3>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                            </div>
                                        );
                                    })}
                        </div>
                    </div>
                    <div className="w-3/4 mx-auto flex flex-col gap-4">
                        <h3 className="text-xl">Inköpslista</h3>
                        <div className="border border-gray-300 rounded-lg text-base">
                            {shoppingList.length > 0 &&
                                shoppingList.map((ingredient, index) => {
                                    return (
                                        <div
                                            className="w-full flex flex-row border-b border-gray-300 py-2 px-3 gap-2"
                                            key={'ingredient' + index}
                                        >
                                            <p className="font-medium">{ingredient.name}</p>
                                            <p className="ml-auto">{ingredient.amount}</p>
                                            <p>{ingredient.unit}</p>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
