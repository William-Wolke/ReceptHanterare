import React, { useState } from 'react';
import useFetch from './useFetch';
import { Link, useParams } from 'react-router-dom';

const Menu = () => {

    const [update, setUpdate] = useState('');

    const { year, week } = useParams();

    const { data, isPending, error } = useFetch(`/menu/one/${year}/${week}/`, "GET", update);

    return (
        <div>
            {data &&
                <div className='menuList'>

                    {/* Titel */}
                    <div className='menuItem'>
                        <Link to={`/menu/${data.year}/${data.week}`} ><h1>{data.year}: V.{data.week}</h1></Link>
                    </div>

                    <div className='menuItem'>
                        <p>Måndag</p>
                        <p>Tisdag</p>
                        <p>Onsdag</p>
                        <p>Torsdag</p>
                        <p>Fredag</p>
                        <p>Lördag</p>
                        <p>Söndag</p>
                    </div>

                    <div className='menuItem weekdayMenus'>

                        {/* Can be optimised with a function. However i did not get that to work in a arrow function an then call method it would only display methodcall in cleartext () => {displayWeekDayRecipeName(data.monday)} */}
                        <div>
                            {data.monday && data.monday.map((recipeName, index) => {
                                return <p key={index}>{recipeName}</p>
                            })}
                        </div>

                        <div>
                            {data.tuesday && data.tuesday.map((recipeName, index) => {
                                return <p key={index}>{recipeName}</p>
                            })}
                        </div>

                        <div>
                            {data.wednesday && data.wednesday.map((recipeName, index) => {
                                return <p key={index}>{recipeName}</p>
                            })}
                        </div>

                        <div>
                            {data.thursday && data.thursday.map((recipeName, index) => {
                                return <p key={index}>{recipeName}</p>
                            })}
                        </div>

                        <div>
                            {data.friday && data.friday.map((recipeName, index) => {
                                return <p key={index}>{recipeName}</p>
                            })}
                        </div>

                        <div>
                            {data.saturday && data.saturday.map((recipeName, index) => {
                                return <p key={index}>{recipeName}</p>
                            })}
                        </div>

                        <div>
                            {data.sunday && data.sunday.map((recipeName, index) => {
                                return <p key={index}>{recipeName}</p>
                            })}
                        </div>

                    </div>

                    {/* SHopping list */}
                    <div>
                        <p>Namn</p>
                        <p>Mängd</p>
                        <p>Enhet</p>
                    </div>

                    {/* SHopping list */}
                    {data.shoppingList && data.shoppingList.map((shoppingItem, index) => {
                        return (
                            <div key={shoppingItem.name + index}>
                                <p>{shoppingItem.name}</p>

                                <p>{shoppingItem.amount}</p>

                                <p>{shoppingItem.unit}</p>
                            </div>
                        )
                    })}

                </div>
            }
        </div>
    )

}
export default Menu;