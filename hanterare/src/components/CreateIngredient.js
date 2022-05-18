import React, { useState, useEffect } from "react";
import UseAxios from "./UseAxios";

const CreateIngredient = () => {

    const [name, setName] = useState('');
    const [preferredUnit, setPreferredUnit] = useState('G');
    const [pieces, setPieces] = useState(0);
    const [grams, setGrams] = useState(0);
    const [liters, setLiters] = useState(0);


    const handleSubmit = (e) => {
        //Prevent reload
        e.preventDefault();

        let conversion = [
            {
                unit: "St",
                amount: pieces
            },
            {
                unit: "G",
                amount: grams
            },
            {
                unit: "L",
                amount: liters
            }
        ]

        let ingredient = {
            name: name,
            unit: {
                preferredUnit: preferredUnit,
                conversion: conversion
            }
        }

        let res = UseAxios("http://192.168.0.122:8000/createIngredient", ingredient)
        if (res){
            console.log("Created ingredient");
        }
        else {
            console.log("Failed");
        }

    }

    return(
        <div id="ingredient">
            <form onSubmit={ handleSubmit }>

                <div>
                    <label htmlFor="name">Namn</label>
                    <input 
                        type="text" 
                        id="name"
                        value={name} 
                        onChange={ (e) => { setName(e.target.value) } }
                    />
                </div>

                <div>
                    <label htmlFor="preferred">Prefererad enhet</label>
                    <select 
                        id="preferred"
                        value={preferredUnit}
                        onChange={ (e) => {setPreferredUnit(e.target.value)} }
                    >
                        <option value="L">L</option>
                        <option value="St">St</option>
                        <option value="G">G</option>
                    </select>
                </div>

                <div>
                    <div>
                        <h2>Skapa omvandlingstabell</h2>
                    </div>

                    <div>
                        <label htmlFor="pieces">St</label>
                        <input
                            id="pieces"
                            type="number" 
                            value={pieces}
                            onChange={ (e) => { setPieces(e.target.value) } }
                        />
                    </div>

                    <div>
                        <label htmlFor="grams">G</label>
                        <input
                            id="grams"
                            type="number" 
                            value={grams}
                            onChange={ (e) => { setGrams(e.target.value) } }
                        />
                    </div>

                    <div>
                        <label htmlFor="liters">L</label>
                        <input
                            id="liters"
                            type="number" 
                            value={liters}
                            onChange={ (e) => { setLiters(e.target.value) } }
                        />
                    </div>
                    
                </div>

                <div>
                    <input type="submit" value="Submit" />
                </div>

            </form>
        </div>
    )
}

export default CreateIngredient;