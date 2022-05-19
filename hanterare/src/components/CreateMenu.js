import React, { useEffect, useState } from 'react';
import useFetch from './useFetch';
import UseAxios from './UseAxios';

const metric = [
    {
        unit: "Kg",
        convert: 1000
    },
    {
        unit: "Hg",
        convert: 100
    },
    {
        unit: "Mg",
        convert: 0.001
    },
    {
        unit: "Dl",
        convert: 0.1
    },
    {
        unit: "Cl",
        convert: 0.01
    },
    {
        unit: "Ml",
        convert: 0.001
    },
    {
        unit: "Msk",
        convert: 0.015
    },
    {
        unit: "Tsk",
        convert: 0.005
    },
    {
        unit: "Krm",
        convert: 0.001
    },
]

const CreateMenu = () => {

    const [update, setUpdate] = useState('');

    //States for showing which days to eat what
    const [monday, setMonday] = useState([]);
    const [tuesday, setTuesday] = useState([]);
    const [wednesday, setWednesday] = useState([]);
    const [thursday, setThursday] = useState([]);
    const [friday, setFriday] = useState([]);
    const [saturday, setSaturday] = useState([]);
    const [sunday, setSunday] = useState([]);
    const [shoppingList, setShoppingList] = useState([]);

    //States for general info for menu
    const [week, setWeek] = useState(1);
    const [year, setYear] = useState(2022);

    //States to add new element/recipes to days
    const [recipe, setRecipe] = useState('');
    const [day, setDay] = useState('monday');

    const [looseIngredients, setLooseIngredients] = useState([]);

    const [looseIngredientName, setLooseIngredientName] = useState('');
    const [looseIngredientAmount, setLooseIngredientAmount] = useState(0);
    const [looseIngredientUnit, setLooseIngredientUnit] = useState();


    

    //Fetches recipes
    const { data, isPending, error } = useFetch("/recipe/all/", "GET", update);

    //Fetches ingredients for comparing to the ingredients in recipes
    const { data: ingredients, isPending: pendingIngredients, error: ingredientsError } = useFetch("/ingredient/all", "GET", update); 

    const handleSubmit = (e) => {
        //Prevent reloading page
        e.preventDefault();

        //We only want to save the recipenames not the entire recipes
        let mondayRecipeNames = summarizeNames(monday);
        let tuesdayRecipeNames = summarizeNames(tuesday); 
        let wednesdayRecipeNames = summarizeNames(wednesday); 
        let thursdayRecipeNames = summarizeNames(thursday); 
        let fridayRecipeNames = summarizeNames(friday); 
        let saturdayRecipeNames = summarizeNames(saturday); 
        let sundayRecipeNames = summarizeNames(sunday); 

        //Create object to insert into db
        let menu = {
            year: year,
            week: week,
            monday: mondayRecipeNames,
            tuesday: tuesdayRecipeNames,
            wednesday: wednesdayRecipeNames,
            thursday: thursdayRecipeNames,
            friday: fridayRecipeNames,
            saturday: saturdayRecipeNames,
            sunday: sundayRecipeNames,
            shoppingList: [...shoppingList, looseIngredients],
        }

        console.log(menu);

        //Call api to create
        UseAxios("/menu/create/", menu);
    }

    //Returns a array that contains the recipenames for the passed array
    const summarizeNames = (array) => {
        let returnArray = [];

        array && array.map((item) => {
            returnArray.push(item.name);
        });

        return returnArray;
    }

    const handleAddRecipe = () => {

        let addedRecipe = {};

        data.map((item) => {
            if (recipe === item.name) {
                addedRecipe = item;
            }
        })

        if (day === "monday") {
            setMonday([...monday, addedRecipe]);
            setShoppingList([...shoppingList, ...addedRecipe.ingredients]);
            setDay("tuesday");
            setRecipe('');
        }
        else if(day === "tuesday") {
            setTuesday([...tuesday, addedRecipe]);
            setShoppingList([...shoppingList, ...addedRecipe.ingredients]);
            setDay("wednesday");
            setRecipe('');
        }
        else if(day === "wednesday") {
            setWednesday([...wednesday, addedRecipe]);
            setShoppingList([...shoppingList, ...addedRecipe.ingredients]);
            setDay("thursday");
            setRecipe('');
        }
        else if(day === "thursday") {
            setThursday([...thursday, addedRecipe]);
            setShoppingList([...shoppingList, ...addedRecipe.ingredients]);
            setDay("friday");
            setRecipe('');
        }
        else if(day === "friday") {
            setFriday([...friday, addedRecipe]);
            setShoppingList([...shoppingList, ...addedRecipe.ingredients]);
            setDay("saturday");
            setRecipe('');
        }
        else if(day === "saturday") {
            setSaturday([...saturday, addedRecipe]);
            setShoppingList([...shoppingList, ...addedRecipe.ingredients]);
            setDay("sunday");
            setRecipe('');
        }
        else if(day === "sunday") {
            setSunday([...sunday, addedRecipe]);
            setShoppingList([...shoppingList, ...addedRecipe.ingredients]);
            setDay("monday");
            setRecipe('');
        }
    }

    const summarizeShoppingList = () => {
        let list = shoppingList;

        //Convert all shopping items to prefered units
        
        //Map through all items in shopping list and all ingredients
        list.map((item) => {
            ingredients.map((ingredient) => {

                if (item.name === ingredient.name) {
                    if (item.unit !== ingredient.unit.preferredUnit) {

                        ingredient.unit.conversion.map((unit) => {
                            if (unit.unit === ingredient.unit.preferredUnit) {

                                metric.map((metric) => {

                                    if (metric.unit === item.unit) {
                                        //Convert from 
                                        item.amount = Number(item.amount * unit.amount * metric.convert);
                                        item.unit = ingredient.unit.preferredUnit;
                                    };

                                });

                            };
                        });
                        
                    };
                };
            });
        });

        console.log(list);

        //Summarize the list

        let uniqueList = [];

        list.map((item) => {
            //Runs on first iteration when list is emprty 
            if (uniqueList.length === 0) {
                uniqueList.push({
                    name: item.name,
                    amount: item.amount,
                    unit: item.unit,
                });
            }

            //Runs on all iterations exept first
            else if (uniqueList.length > 0) {

                //If name i present in the array
                let found = uniqueList.some(element => element.name === item.name);

                //No duplicates found, push new item to array
                if (!found) {
                    uniqueList.push({
                        name: item.name,
                        amount: item.amount,
                        unit: item.unit,
                    });
                }

                //Duplicates found, instead add the amount to total amount
                else {
                    uniqueList.map((element) => {
                        if (element.name === item.name) {
                            element.amount -= Number(-item.amount);
                        }
                    })  
                }

            }
            console.log("!!!");
        });

        console.log(uniqueList);
        setShoppingList(uniqueList);
    }

    const handleAddLoose = () => {

        let ingredient = {
            name: looseIngredientName,
            amount: looseIngredientAmount,
            unit: looseIngredientUnit
        }

        setLooseIngredients([...looseIngredients, ingredient]);

        setLooseIngredientName('');
        setLooseIngredientAmount(0);
        setLooseIngredientUnit('');
    }

    

    return (
    <>
    
        {data && ingredients && 
        
        <div>
            <form onSubmit={(e) => {handleSubmit(e) } }>

                <div>
                    <label htmlFor="year">År</label>
                    <input 
                        type="number"
                        id="year" 
                        min="1990" 
                        max="2099" 
                        value={year} 
                        onChange={(e) => {setYear(e.target.value)}} 
                    />
                </div>

                <div>
                    <label htmlFor="week">Vecka</label>
                    <input 
                        type="number" 
                        name="" 
                        id="week" 
                        min="1" 
                        max="52" 
                        value={week} 
                        onChange={(e) => {setWeek(e.target.value)}} 
                    />
                </div>

                <div>
                    <select 
                        value={recipe}   
                        onChange={(e) => {setRecipe(e.target.value)}} 
                    >
                        {data.map((item, index) => {
                            return <option value={item.name} key={index} >{item.name}</option>
                        })}
                        <option value=""></option>
                    </select>
                </div>

                <div>
                    <select 
                        value={day}
                        onChange={(e) => {setDay(e.target.value)}} 
                    >
                        <option value="monday">Måndag</option>
                        <option value="tuesday">Tisdag</option>
                        <option value="wednesday">Onsdag</option>
                        <option value="thursday">Torsdag</option>
                        <option value="friday">Fredag</option>
                        <option value="saturday">Lördag</option>
                        <option value="sunday">Söndag</option>
                    </select>
                </div>

                <div>
                    <input 
                        type="button" 
                        value="+"
                        onClick={handleAddRecipe}
                    />
                </div>
                
                {/* Monday */}
                <div>
                    <h2>Måndag</h2>
                    {monday && monday.map((item, index) => {
                        return <p key={index}>{item.name}</p>
                    })}
                </div>

                {/* Tuesday */}
                <div>
                    <h2>Tisdag</h2>
                    {tuesday && tuesday.map((item, index) => {
                        return <p key={index}>{item.name}</p>
                    })}
                </div>

                {/* Wednesday */}
                <div>
                    <h2>Onsdag</h2>
                    {wednesday && wednesday.map((item, index) => {
                        return <p key={index}>{item.name}</p>
                    })}
                </div>

                {/* Thursday */}
                <div>
                    <h2>Torsdag</h2>
                    {thursday && thursday.map((item, index) => {
                        return <p key={index}>{item.name}</p>
                    })}
                </div>

                {/* Friday */}
                <div>
                    <h2>Fredag</h2>
                    {friday && friday.map((item, index) => {
                        return <p key={index}>{item.name}</p>
                    })}
                </div>

                {/* Saturday */}
                <div>
                    <h2>Lördag</h2>
                    {saturday && saturday.map((item, index) => {
                        return <p key={index}>{item.name}</p>
                    })}
                </div>

                {/* Sunday */}
                <div>
                    <h2>Söndag</h2>
                    {sunday && sunday.map((item, index) => {
                        return <p key={index}>{item.name}</p>
                    })}
                </div>

                <div>

                    <div>  
                        <h2>Inköpslista</h2>
                    </div>

                    <div>  
                        <div>
                            <div>#</div>
                            <div>Namn</div>
                            <div>Mängd</div>
                            <div>Enhet</div>
                        </div>
                    </div>

                    <div>
                        {shoppingList && shoppingList.map((item, index) => {
                            return(
                                <div key={index}>
                                    <div>{index}</div>
                                    <div>{item.name}</div>
                                    <div>{item.amount}</div>
                                    <div>{item.unit}</div>
                                </div>
                            );
                        })}
                    </div>

                    <div>  
                        <h2>Lösa ingredienser</h2>
                    </div>

                    <div>
                        <h3>Lägg till</h3>
                    </div>

                    <div>
                    <label htmlFor="looseName">Namn</label>
                    <input 
                        type="text" 
                        name="looseName"
                        value={looseIngredientName}
                        onChange={(e) => setLooseIngredientName(e.target.value)}
                    />
                    </div>

                    <div>
                    <label htmlFor="looseAmount">Mängd</label>
                    <input 
                        type="number" 
                        name="looseAmount"
                        value={looseIngredientAmount}
                        onChange={(e) => setLooseIngredientAmount(e.target.value)}
                    />
                    </div>

                    <div>
                    <select 
                        name="measurment" 
                        id="measurment"
                        value={looseIngredientUnit}
                        onChange={(e) => setLooseIngredientUnit(e.target.value)}
                        >
                        <option value="Krm">Krm</option>
                        <option value="Tsk">Tsk</option>
                        <option value="Msk">Msk</option>
                        <option value="L">L</option>
                        <option value="Dl">Dl</option>
                        <option value="Cl">Cl</option>
                        <option value="Ml">Ml</option>
                        <option value="St">St</option>
                        <option value="G">G</option>
                        <option value=""></option>
                    </select>
                    </div>

                    <div>
                        <input type="button" value="Lägg till" onClick={handleAddLoose}/>
                    </div>

                    <div>  
                        <div>
                            <div>#</div>
                            <div>Namn</div>
                            <div>Mängd</div>
                            <div>Enhet</div>
                        </div>
                    </div>

                    <div>
                        {looseIngredients && looseIngredients.map((item, index) => {
                            return(
                                <div key={index}>
                                    <div>{index}</div>
                                    <div>{item.name}</div>
                                    <div>{item.amount}</div>
                                    <div>{item.unit}</div>
                                </div>
                            );
                        })}
                    </div>

                </div>

                <div>
                    <input type="button" value="Summera ingredienser" onClick={ summarizeShoppingList }/>
                </div>

                <div>
                    <input type="submit" value="Submit"/>
                </div>

            </form>
        </div>}

        {isPending &&
        
        <div>
            <p>Loading...</p>
        </div>}

        {pendingIngredients &&
        
        <div>
            <p>Loading...</p>
        </div>}

        {error &&
        
        <div>
            <p>{error}</p>
        </div>}

        {ingredientsError &&
        
        <div>
            <p>{error}</p>
        </div>}
    
    
    </>);
}
export default CreateMenu;