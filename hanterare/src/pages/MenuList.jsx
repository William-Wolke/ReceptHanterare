import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';

const MenuList = () => {

    const { update, setUpdate } = useState('');

    const { data, isPending, error } = useFetch("/menu/all/", "GET", update);

    const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

    const swWeekdays = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"];

    return (
        <div className='menuListContainer'>
            {data && data.map((item, index) => {
                return (
                    <div className='menuListItemContainer card' key={"menu" + index}>
                        <div className="menuListItem">
                            {/* Titel */}
                            <div>
                                <Link to={`/menu/${item.year}/${item.week}`} ><h1>{item.year}: V.{item.week}</h1></Link>
                            </div>

                            <div className='menuListItemScheduleContainer menuListItemSection'>

                                <div>
                                    <h2>Recept för veckan</h2>
                                </div>

                                {weekdays.map((weekday, index) => {
                                    return item[weekday] && item[weekday].map((recipeName) => {
                                        return (
                                            <div key={weekday + index} className='menuListItemScheduleItem'>
                                                <div className='menuListItemScheduleDay'>
                                                    <p>{`${swWeekdays[index]}:`}</p>
                                                </div>
                                                <div className='menuListItemScheduleRecipe'>
                                                    <Link to={`/recept/${recipeName}`} >
                                                        <p>{recipeName}</p>
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    })
                                })}

                            </div>

                            <div className='menuListItemSection'>
                                <div>
                                    <h2>Inköpslista</h2>
                                </div>

                                {/* SHopping list */}
                                {item.shoppingList && item.shoppingList.map((shoppingItem, index) => {
                                    return (
                                        <div key={shoppingItem.name + index} className='menuListIngredientList'>
                                            <p>{shoppingItem.name}</p>

                                            <p>{shoppingItem.amount}</p>

                                            <p>{shoppingItem.unit}</p>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>

                    </div>
                )
            })}
        </div>
    )

}
export default MenuList;