import Link from 'next/link';
import client from '../../tina/__generated__/client'
import { getShoppingList, summarizeShoppingList } from '../../src/helpers';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

export const getStaticProps = async ({ params }) => {
    let data = {}
    let query = {}
    let variables = { relativePath: `${params.filename}.yaml` }
    try {
        const res = await client.queries.menus(variables)
        query = res.query
        data = res.data
        variables = res.variables
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
    }
}
export const getStaticPaths = async () => {
    const menusListData = await client.queries.menusConnection()
    return {
        paths: menusListData.data.menusConnection.edges.map((post) => ({
            params: { filename: post.node._sys.filename },
        })),
        fallback: false,
    }
}

export default function Menu({ data }) {
    const menu = data.menus;
    let shoppingList = [];
    if (menu?.recipes) {
        shoppingList = summarizeShoppingList(getShoppingList(menu.recipes));
    }

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
                <div className="menuItemContainer card">
                    <div className="menuListItem">
                        {/* Titel */}
                        <div>
                            <Link href={`/menu/${menu.year}/${menu.week}`}>
                                <h1>
                                    {menu.title}
                                </h1>
                            </Link>
                        </div>

                        <TinaMarkdown content={menu.description} />

                        <div className="menuListItemScheduleContainer menuListItemSection">
                            <div>
                                <h2>Recept för veckan</h2>
                            </div>

                            {weekday_recipes && Object.entries(weekday_recipes).map(([day, recipes], i) => {
                                if (recipes.length == 0) {
                                    return;
                                }
                                return (
                                    <div key={day + i} className="menuListItemScheduleItem">
                                        <div className="menuListItemScheduleDay">
                                            <p>{day}</p>
                                        </div>
                                        {recipes && recipes.map((recipe, index) => {
                                            return (
                                                <div className="menuListItemScheduleRecipe" key={`weekdayrecipe${index}`}>
                                                    <Link href={`/recept/${recipe._sys.filename}`}>
                                                        <p>{recipe.title}</p>
                                                    </Link>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="menuListItemSection">
                            <div>
                                <h2>Inköpslista</h2>
                            </div>

                            {shoppingList &&
                                shoppingList.map((shoppingItem, index) => {
                                    return (
                                        <div key={shoppingItem.name + index} className="menuListIngredientList">
                                            <p>{shoppingItem.name}</p>

                                            <p>{shoppingItem.amount}</p>

                                            <p>{shoppingItem.unit}</p>
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
