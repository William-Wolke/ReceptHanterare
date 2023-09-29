import Link from 'next/link';
import { client } from '../../tina/__generated__/client';
import Image from 'next/image';

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
    return (
        <div className="w-5/6 mx-auto mt-8">
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
                        <div className="flex flex-row overflow-x-auto" key={'menu' + index}>
                            <div className="">
                                {/* Titel */}
                                <div>
                                    <Link href={`/menu/${menu._sys.filename}`}>
                                        <h3 className='text-lg'>
                                            {menu.title}
                                        </h3>
                                    </Link>
                                </div>

                                <div className="flex flex-row gap-6 mt-6">
                                    {weekday_recipes && Object.entries(weekday_recipes).reverse().map(([day, recipes], i) => {
                                        if (recipes.length == 0) {
                                            return;
                                        }
                                        return (
                                            <div key={day + i} className="h-56 w-64">
                                                {/* TODO: Make this a reusable component*/}
                                                {recipes && recipes.map((recipe, index) => {
                                                    return (
                                                        <div key={`${day}recipe${index}`}>
                                                            <div className='h-36 w-42 rounded-t relative bg-[#84b082]'>
                                                                <span className='absolute top-0 left-0 bg-gray-600 text-white opacity-70 px-2 py-1 rounded-tl'>{day}</span>
                                                                {recipe.image && <Image src={recipe.image} height="200" width="200" className="" alt={recipe.title} />}
                                                            </div>
                                                            <div className="" key={`weekdayrecipe${index}`}>
                                                                <p className='uppercase text-gray-600'>{recipe.time}</p>
                                                                <Link href={`/recipes/${recipe._sys.filename}`}>
                                                                    <h3 className='text-base text-gray-700 font-semibold'>{recipe.title}</h3>
                                                                </Link>
                                                            </div>
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
