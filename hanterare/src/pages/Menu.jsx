import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { Link, useParams } from 'react-router-dom';

const Menu = () => {

    const [update, setUpdate] = useState('');

    const { year, week } = useParams();

    const { data, isPending, error } = useFetch(`/menu/one/${year}/${week}/`, "GET", update);

    const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

    const swWeekdays = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"];

    return (
       <div className='menuContainer'>
            {data && 
                <div className='menuItemContainer card'>
                    <div className="menuListItem">
                        {/* Titel */}
                        <div>
                            <Link to={`/menu/${data.year}/${data.week}`} ><h1>{data.year}: V.{data.week}</h1></Link>
                        </div>

                        <div className='menuListItemScheduleContainer menuListItemSection'>

                            <div>
                                <h2>Recept för veckan</h2>
                            </div>

                            {weekdays.map((weekday, index) => {
                                return data[weekday] && data[weekday].map((recipeName) => {
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
                            {data.shoppingList && data.shoppingList.map((shoppingItem, index) => {
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
                
            }
        </div>
    )

}
export default Menu;