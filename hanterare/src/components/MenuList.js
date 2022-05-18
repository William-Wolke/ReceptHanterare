import React, { useState } from 'react';
import useFetch from './useFetch'

const MenuList = () => {

    const { update, setUpdate } = useState('');

    const { data, isPending, error } = useFetch("http:/192.168.0.122:8000/allMenus", "GET", update);

    return (
        <div>
            {data && data.map((item, index) => {
                return(
                    <div key={"menu" + index}>

                        {/* Titel */}
                        <div>
                            <h1>{item.year}: V.{item.week}</h1>
                        </div>

                        <div>
                            <p>Måndag</p>
                            <p>Tisdag</p>
                            <p>Onsdag</p>
                            <p>Torsdag</p>
                            <p>Fredag</p>
                            <p>Lördag</p>
                            <p>Söndag</p>
                        </div>

                        <div>

                            {/* Can be optimised with a function. However i did not get that to work in a arrow function an then call method it would only display methodcall in cleartext () => {displayWeekDayRecipeName(item.monday)} */}
                            <div>
                                {item.monday && item.monday.map((recipeName, index) => {
                                    return <p key={index}>{recipeName}</p>
                                })}
                            </div>

                            <div>
                                {item.tuesday && item.tuesday.map((recipeName, index) => {
                                    return <p key={index}>{recipeName}</p>
                                })}
                            </div>
                            
                            <div>
                                {item.wednesday && item.wednesday.map((recipeName, index) => {
                                    return <p key={index}>{recipeName}</p>
                                })}
                            </div>

                            <div>
                                {item.thursday && item.thursday.map((recipeName, index) => {
                                    return <p key={index}>{recipeName}</p>
                                })}
                            </div>

                            <div>
                                {item.friday && item.friday.map((recipeName, index) => {
                                    return <p key={index}>{recipeName}</p>
                                })}
                            </div>

                            <div>
                                {item.saturday && item.saturday.map((recipeName, index) => {
                                    return <p key={index}>{recipeName}</p>
                                })}
                            </div>

                            <div>
                                {item.sunday && item.sunday.map((recipeName, index) => {
                                    return <p key={index}>{recipeName}</p>
                                })}
                            </div>

                        </div>

                        {/* SHopping list */}
                        {item.shoppingList && item.shoppingList.map((shoppingItem, index) => {
                            return (
                                <div key={shoppingItem.name + index}>
                                    <p>{shoppingItem.name}</p>

                                    <p>{shoppingItem.amount}</p>

                                    <p>{shoppingItem.unit}</p>
                                </div>
                            )
                        })}

                        {/* SHopping list */}
                        <div>
                            <p>Namn</p>
                            <p>Mängd</p>
                            <p>Enhet</p>
                        </div>

                        {/* SHopping list */}
                        {item.shoppingList && item.shoppingList.map((shoppingItem, index) => {
                            return (
                                <div key={shoppingItem.name + index}>
                                    <p>{shoppingItem.name}</p>

                                    <p>{shoppingItem.amount}</p>

                                    <p>{shoppingItem.unit}</p>
                                </div>
                            )
                        })}

                    </div>
                )
            })}
        </div>
    )
    
}
export default MenuList;