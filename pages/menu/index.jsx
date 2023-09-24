import Link from 'next/link';
import { client } from '../../tina/__generated__/client';

export const getStaticProps = async ({ params }) => {
    const menusResponse = await client.queries.menusConnection();
    const menus = menusResponse.data.menusConnection.edges.map((menu) => {
        return menu.node;
    })
    return {
        props: {
            menus: menus,
        },
    }
}

export default function MenuList({ menus }) {
    const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    const svWeekdays = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'];

    return (
        <div className="menuListContainer">
            {menus &&
                menus.map((menu, index) => {
                    const weekday_recipes = {};
                    for (const recipe of menu.recipes) {
                        if (recipe.day in weekday_recipes) {
                            weekday_recipes[recipe.day].push(recipe.name);
                        } else {
                            weekday_recipes[recipe.day] = [recipe.name];
                        }
                    }
                    return (
                        <div className="menuListItemContainer card" key={'menu' + index}>
                            <div className="menuListItem">
                                {/* Titel */}
                                <div>
                                    <Link href={`/menu/${menu._sys.filename}`}>
                                        <h1>
                                            {menu.title}
                                        </h1>
                                    </Link>
                                </div>

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
                                                            <Link href={`/recipes/${recipe._sys.filename}`}>
                                                                <p>{recipe.title}</p>
                                                            </Link>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}
