import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import UseAxios from '../hooks/UseAxios';
import Input from '../components/Input.jsx';
import InputSelect from '../components/InputSelect.jsx';
import InputRange from '../components/InputRange.jsx';
import WeekdayList from '../components/WeekdayList';
import { summarizeNames, summarizeShoppingList } from '../helpers';

const weekdays = [
    { name: 'monday' },
    { name: 'tuesday' },
    { name: 'wednesday' },
    { name: 'thursday' },
    { name: 'friday' },
    { name: 'saturday' },
    { name: 'sunday' },
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

    const [weekMenu, setWeekMenu] = useState({
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
    });

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
        
        setShoppingList(summarizeShoppingList(shoppingList));

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

    const handleAddRecipe = () => {
        let addedRecipe = {};

        data.map((item) => {
            if (recipe === item.name) {
                addedRecipe = item;
            }
        });

        weekdays.map((weekday, index) => {
            if (day === weekday) {
                let tempMenu = weekMenu;
                tempMenu[weekday] = [...tempMenu[weekday], addedRecipe];
                setWeekMenu([...tempMenu]);
                setShoppingList([...shoppingList, ...addedRecipe.ingredients]);
                if (index === 6) {
                    setDay(weekdays[0]);
                } else {
                    setDay(weekdays[index++]);
                }
                setRecipe('');
            }
        });
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

                        <InputSelect
                            optionList={[...data, '']}
                            htmlFor='recipe'
                            value={recipe}
                            setter={setRecipe}
                            text='Recept'
                        />

                        <InputSelect
                            optionList={weekdays}
                            htmlFor='weekday'
                            value={day}
                            setter={setDay}
                            text='Veckodag'
                        />

                        <div className='form-element'>
                            <input
                                type='button'
                                value='+'
                                className='input button'
                                onClick={handleAddRecipe}
                            />
                        </div>

                        <WeekdayList weekdays={weekdays} items={weekMenu} />

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
