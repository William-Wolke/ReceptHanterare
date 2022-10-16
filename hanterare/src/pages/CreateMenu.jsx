import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import UseAxios from '../hooks/UseAxios';
import Input from '../components/Input.jsx';
import InputSelect from '../components/InputSelect.jsx';
import InputRange from '../components/InputRange.jsx';

const metric = [
    {
        unit: 'Kg',
        convert: 1000,
    },
    {
        unit: 'Hg',
        convert: 100,
    },
    {
        unit: 'Mg',
        convert: 0.001,
    },
    {
        unit: 'Dl',
        convert: 0.1,
    },
    {
        unit: 'Cl',
        convert: 0.01,
    },
    {
        unit: 'Ml',
        convert: 0.001,
    },
    {
        unit: 'Msk',
        convert: 0.015,
    },
    {
        unit: 'Tsk',
        convert: 0.005,
    },
    {
        unit: 'Krm',
        convert: 0.001,
    },
];

const CreateMenu = () => {
    const [update, setUpdate] = useState(false);

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
    const { data, isPending, error } = useFetch('/recipe/all/', 'GET', update);

    //Fetches ingredients for comparing to the ingredients in recipes
    const {
        data: ingredients,
        isPending: pendingIngredients,
        error: ingredientsError,
    } = useFetch('/ingredient/all', 'GET', update);

    const handleSubmit = async (e) => {
        //Prevent reloading page
        e.preventDefault();

        summarizeShoppingList();

        //We only want to save the recipenames not the entire recipes
        let mondayRecipeNames = summarizeNames(monday);
        let tuesdayRecipeNames = summarizeNames(tuesday);
        let wednesdayRecipeNames = summarizeNames(wednesday);
        let thursdayRecipeNames = summarizeNames(thursday);
        let fridayRecipeNames = summarizeNames(friday);
        let saturdayRecipeNames = summarizeNames(saturday);
        let sundayRecipeNames = summarizeNames(sunday);

        let concatShoppingList = shoppingList.concat(looseIngredients);

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
            shoppingList: concatShoppingList,
        };

        console.log(menu);

        //Call api to create
        let response = await UseAxios('/menu/create/', menu);

        console.log(response);
    };

    //Returns a array that contains the recipenames for the passed array
    const summarizeNames = (array) => {
        let returnArray = [];

        array &&
            array.map((item) => {
                returnArray.push(item.name);
            });

        return returnArray;
    };

    const handleAddRecipe = () => {
        let addedRecipe = {};

        data.map((item) => {
            if (recipe === item.name) {
                addedRecipe = item;
            }
        });

        if (day === 'monday') {
            setMonday([...monday, addedRecipe]);
            setShoppingList([...shoppingList, ...addedRecipe.ingredients]);
            setDay('tuesday');
            setRecipe('');
        } else if (day === 'tuesday') {
            setTuesday([...tuesday, addedRecipe]);
            setShoppingList([...shoppingList, ...addedRecipe.ingredients]);
            setDay('wednesday');
            setRecipe('');
        } else if (day === 'wednesday') {
            setWednesday([...wednesday, addedRecipe]);
            setShoppingList([...shoppingList, ...addedRecipe.ingredients]);
            setDay('thursday');
            setRecipe('');
        } else if (day === 'thursday') {
            setThursday([...thursday, addedRecipe]);
            setShoppingList([...shoppingList, ...addedRecipe.ingredients]);
            setDay('friday');
            setRecipe('');
        } else if (day === 'friday') {
            setFriday([...friday, addedRecipe]);
            setShoppingList([...shoppingList, ...addedRecipe.ingredients]);
            setDay('saturday');
            setRecipe('');
        } else if (day === 'saturday') {
            setSaturday([...saturday, addedRecipe]);
            setShoppingList([...shoppingList, ...addedRecipe.ingredients]);
            setDay('sunday');
            setRecipe('');
        } else if (day === 'sunday') {
            setSunday([...sunday, addedRecipe]);
            setShoppingList([...shoppingList, ...addedRecipe.ingredients]);
            setDay('monday');
            setRecipe('');
        }
    };

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
                                        item.amount = Number(
                                            item.amount *
                                                unit.amount *
                                                metric.convert
                                        );
                                        item.unit =
                                            ingredient.unit.preferredUnit;
                                    }
                                });
                            }
                        });
                    }
                }
            });
        });

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
                let found = uniqueList.some(
                    (element) => element.name === item.name
                );

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
                    });
                }
            }
        });

        setShoppingList(uniqueList);
    };

    const handleAddLoose = () => {
        let ingredient = {
            name: looseIngredientName,
            amount: looseIngredientAmount,
            unit: looseIngredientUnit,
        };

        setLooseIngredients([...looseIngredients, ingredient]);

        setLooseIngredientName('');
        setLooseIngredientAmount(0);
        setLooseIngredientUnit('');
    };

    return (
        <>
            {data && ingredients && (
                <div className='create'>
                    <form
                        className='form'
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}>
                        <div className='form-element'>
                            <h1>Create menu</h1>
                        </div>

                        <InputRange
                            htmlFor='year'
                            type='number'
                            value={year}
                            onChange={setYear}
                            text='År'
                            min='1970'
                            max='2099'
                        />

                        <InputRange
                            htmlFor='week'
                            type='number'
                            value={week}
                            onChange={setWeek}
                            text='Vecka'
                            min='1'
                            max='52'
                        />

                        <div className='form-element'>
                            <label htmlFor='recipe'>Recept</label>
                            <select
                                value={recipe}
                                name='recipe'
                                className='input'
                                onChange={(e) => {
                                    setRecipe(e.target.value);
                                }}>
                                {data.map((item, index) => {
                                    return (
                                        <option value={item.name} key={index}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                                <option value=''></option>
                            </select>
                        </div>

                        <div className='ingredient-list form-element'>
                            <label htmlFor='weekday.ö-,'>Veckodag</label>
                            <select
                                value={day}
                                name='weekday'
                                className='input'
                                onChange={(e) => {
                                    setDay(e.target.value);
                                }}>
                                <option value='monday'>Måndag</option>
                                <option value='tuesday'>Tisdag</option>
                                <option value='wednesday'>Onsdag</option>
                                <option value='thursday'>Torsdag</option>
                                <option value='friday'>Fredag</option>
                                <option value='saturday'>Lördag</option>
                                <option value='sunday'>Söndag</option>
                            </select>
                        </div>

                        <div className='form-element'>
                            <input
                                type='button'
                                value='+'
                                className='input button'
                                onClick={handleAddRecipe}
                            />
                        </div>

                        <div className='weekdayMenuList form-element'>
                            {/* Monday */}
                            <div className='weekdayMenuItem'>
                                <h2 className='weekdayMenuHeader'>Måndag</h2>
                                {monday &&
                                    monday.map((item, index) => {
                                        return <p key={index}>{item.name}</p>;
                                    })}
                            </div>

                            {/* Tuesday */}
                            <div className='weekdayMenuItem'>
                                <h2 className='weekdayMenuHeader'>Tisdag</h2>
                                {tuesday &&
                                    tuesday.map((item, index) => {
                                        return <p key={index}>{item.name}</p>;
                                    })}
                            </div>

                            {/* Wednesday */}
                            <div className='weekdayMenuItem'>
                                <h2 className='weekdayMenuHeader'>Onsdag</h2>
                                {wednesday &&
                                    wednesday.map((item, index) => {
                                        return <p key={index}>{item.name}</p>;
                                    })}
                            </div>

                            {/* Thursday */}
                            <div className='weekdayMenuItem'>
                                <h2 className='weekdayMenuHeader'>Torsdag</h2>
                                {thursday &&
                                    thursday.map((item, index) => {
                                        return <p key={index}>{item.name}</p>;
                                    })}
                            </div>

                            {/* Friday */}
                            <div className='weekdayMenuItem'>
                                <h2 className='weekdayMenuHeader'>Fredag</h2>
                                {friday &&
                                    friday.map((item, index) => {
                                        return <p key={index}>{item.name}</p>;
                                    })}
                            </div>

                            {/* Saturday */}
                            <div className='weekdayMenuItem'>
                                <h2 className='weekdayMenuHeader'>Lördag</h2>
                                {saturday &&
                                    saturday.map((item, index) => {
                                        return <p key={index}>{item.name}</p>;
                                    })}
                            </div>

                            {/* Sunday */}
                            <div className='weekdayMenuItem'>
                                <h2 className='weekdayMenuHeader'>Söndag</h2>
                                {sunday &&
                                    sunday.map((item, index) => {
                                        return <p key={index}>{item.name}</p>;
                                    })}
                            </div>
                        </div>

                        <div className='form-element'>
                            <h2>Inköpslista</h2>
                        </div>

                        <div className='ingredient-list form-element'>
                            <div className='ingredient-list-item'>
                                <p className='ingredient-list-value'>Namn</p>
                                <p className='ingredient-list-value'>Mängd</p>
                                <p className='ingredient-list-value'>Enhet</p>
                            </div>
                        </div>

                        <div className='ingredient-list form-element'>
                            {shoppingList &&
                                shoppingList.map((item, index) => {
                                    return (
                                        <div
                                            key={`ingredientlist${index}`}
                                            className='ingredient-list-item'>
                                            <p className='ingredient-list-value'>
                                                {item.name
                                                    ? item.name
                                                    : 'Inget?'}
                                            </p>
                                            <p className='ingredient-list-value'>
                                                {item.amount ? item.amount : 0}
                                            </p>
                                            <p className='ingredient-list-value'>
                                                {item.unit ? item.unit : '?'}
                                            </p>
                                        </div>
                                    );
                                })}
                        </div>

                        <div className='form-element'>
                            <h2>Lösa ingredienser</h2>
                        </div>

                        <div className='form-element'>
                            <label htmlFor='looseName'>Namn</label>
                            <input
                                type='text'
                                name='looseName'
                                className='input'
                                value={looseIngredientName}
                                onChange={(e) =>
                                    setLooseIngredientName(e.target.value)
                                }
                            />
                        </div>

                        <div className='form-element'>
                            <label htmlFor='looseAmount'>Mängd</label>
                            <input
                                type='number'
                                name='looseAmount'
                                className='input'
                                value={looseIngredientAmount}
                                onChange={(e) =>
                                    setLooseIngredientAmount(e.target.value)
                                }
                            />
                        </div>

                        <div className='form-element'>
                            <label htmlFor='looseMeasurment'>Mått</label>
                            <select
                                name='looseMeasurment'
                                id='measurment'
                                className='input'
                                value={looseIngredientUnit}
                                onChange={(e) =>
                                    setLooseIngredientUnit(e.target.value)
                                }>
                                <option value='Krm'>Krm</option>
                                <option value='Tsk'>Tsk</option>
                                <option value='Msk'>Msk</option>
                                <option value='L'>L</option>
                                <option value='Dl'>Dl</option>
                                <option value='Cl'>Cl</option>
                                <option value='Ml'>Ml</option>
                                <option value='St'>St</option>
                                <option value='G'>G</option>
                                <option value=''></option>
                            </select>
                        </div>

                        <div className='form-element'>
                            <input
                                type='button'
                                value='Lägg till'
                                z
                                className='input button'
                                onClick={handleAddLoose}
                            />
                        </div>
                        <div className='ingredient-list form-element'>
                            <div className='ingredient-list-item'>
                                <p className='ingredient-list-value'>Namn</p>
                                <p className='ingredient-list-value'>Mängd</p>
                                <p className='ingredient-list-value'>Enhet</p>
                            </div>
                        </div>

                        <div className='ingredient-list form-element'>
                            {looseIngredients &&
                                looseIngredients.map((item, index) => {
                                    return (
                                        <div
                                            key={`looseIngredientList${index}`}
                                            className='ingredient-list-item'>
                                            <p className='ingredient-list-value'>
                                                {item.name}
                                            </p>
                                            <p className='ingredient-list-value'>
                                                {item.amount}
                                            </p>
                                            <p className='ingredient-list-value'>
                                                {item.unit}
                                            </p>
                                        </div>
                                    );
                                })}
                        </div>

                        <div className='form-element'>
                            <input
                                type='button'
                                value='Summera ingredienser'
                                className='input button'
                                onClick={summarizeShoppingList}
                            />
                        </div>

                        <div className='form-element'>
                            <input
                                type='submit'
                                value='Submit'
                                className='input button'
                            />
                        </div>
                    </form>
                </div>
            )}

            {isPending && (
                <div>
                    <p>Loading...</p>
                </div>
            )}

            {pendingIngredients && (
                <div>
                    <p>Loading...</p>
                </div>
            )}

            {error && (
                <div>
                    <p>{error}</p>
                </div>
            )}

            {ingredientsError && (
                <div>
                    <p>{error}</p>
                </div>
            )}
        </>
    );
};
export default CreateMenu;
