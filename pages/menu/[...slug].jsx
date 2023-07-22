import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export const getServerSideProps = async function (context) {
    let url = "/api/menu";
    context.query.slug.forEach((query) => {
        url += "/"  + query;
    });
    const res = await axios.get(new URL(url, process.env.NEXT_PUBLIC_BASE_URL));
    return {
        props: {
            menu: res?.data,
        },
    };
};

export default function Menu({menu}) {
    const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    const swWeekdays = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'];

    return (
        <div className="menuContainer">
            {menu && (
                <div className="menuItemContainer card">
                    <div className="menuListItem">
                        {/* Titel */}
                        <div>
                            <Link href={`/menu/${menu.year}/${menu.week}`}>
                                <h1>
                                    {menu.year}: V.{menu.week}
                                </h1>
                            </Link>
                        </div>

                        <div className="menuListItemScheduleContainer menuListItemSection">
                            <div>
                                <h2>Recept för veckan</h2>
                            </div>

                            {weekdays.map((weekday, index) => {
                                return (
                                    menu[weekday] &&
                                    menu[weekday].map((recipeName) => {
                                        return (
                                            <div key={weekday + index} className="menuListItemScheduleItem">
                                                <div className="menuListItemScheduleDay">
                                                    <p>{`${swWeekdays[index]}:`}</p>
                                                </div>
                                                <div className="menuListItemScheduleRecipe">
                                                    <Link href={`/recept/${recipeName}`}>
                                                        <p>{recipeName}</p>
                                                    </Link>
                                                </div>
                                            </div>
                                        );
                                    })
                                );
                            })}
                        </div>

                        <div className="menuListItemSection">
                            <div>
                                <h2>Inköpslista</h2>
                            </div>

                            {/* SHopping list */}
                            {menu.shoppingList &&
                                menu.shoppingList.map((shoppingItem, index) => {
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
