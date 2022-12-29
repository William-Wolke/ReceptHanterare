import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import UseAxios from '../hooks/UseAxios';
import Input from '../components/Input.jsx';
import InputSelect from '../components/InputSelect.jsx';
import InputRange from '../components/InputRange.jsx';
import WeekdayList from '../components/WeekdayList';
import IngredientList from '../components/IngredientList';
import { summarizeNames, summarizeShoppingList } from '../helpers';

const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const measurments = [
    { name: 'Krm' },
    { name: 'Tsk' },
    { name: 'Msk' },
    { name: 'L' },
    { name: 'Dl' },
    { name: 'Cl' },
    { name: 'Ml' },
    { name: 'St' },
    { name: 'G' },
    { name: '' },
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

    const [weekMenu, setWeekMenu] = useState([
        { day: 'monday', ingredients: [] },
        { day: 'tuesday', ingredients: [] },
        { day: 'wednesday', ingredients: [] },
        { day: 'thursday', ingredients: [] },
        { day: 'friday', ingredients: [] },
        { day: 'saturday', ingredients: [] },
        { day: 'sunday', ingredients: [] },
    ]);

    const getWeekIngredients = (weekMenu) => {
        let tempArr = [];

        let ingredientsArr = weekMenu.map((menu) => {
            tempArr = menu?.ingredients.map((ingredient) => {
                return ingredient;
            });
            return tempArr;
        });

        return ingredientsArr;
    };

    //States for general info for menu
    const [week, setWeek] = useState(1);
    const [year, setYear] = useState(2022);

    //States to add new element/recipes to days
    const [recipe, setRecipe] = useState('');
    const [day, setDay] = useState(weekdays[0]);

    const [looseIngredients, setLooseIngredients] = useState([]);

    const [looseIngredientName, setLooseIngredientName] = useState('');
    const [looseIngredientAmount, setLooseIngredientAmount] = useState(0);
    const [looseIngredientUnit, setLooseIngredientUnit] = useState();

    //Fetches recipes
    const { data, isPending, error } = useFetch('/recipe/all/', 'GET', update);

    //Fetches ingredients for comparing to the ingredients in recipes
    const { data: ingredients, isPending: pendingIngredients, error: ingredientsError } = useFetch('/ingredient/all', 'GET', update);

    const handleSubmit = async (e) => {
        //Prevent reloading page
        e.preventDefault();

        setShoppingList(summarizeShoppingList(shoppingList, ingredients));

        //We only want to save the recipenames not the entire recipes
        let mondayRecipeNames = summarizeNames(weekMenu[0].ingredients);
        let tuesdayRecipeNames = summarizeNames(weekMenu[1].ingredients);
        let wednesdayRecipeNames = summarizeNames(weekMenu[2].ingredients);
        let thursdayRecipeNames = summarizeNames(weekMenu[3].ingredients);
        let fridayRecipeNames = summarizeNames(weekMenu[4].ingredients);
        let saturdayRecipeNames = summarizeNames(weekMenu[5].ingredients);
        let sundayRecipeNames = summarizeNames(weekMenu[6].ingredients);

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

        weekMenu[day] = [...weekMenu[day], addedRecipe];

        setShoppingList(summarizeShoppingList([...shoppingList, addedRecipe.ingredients]));

        if (weekdays.indexOf(day) === 6) {
            setDay(weekdays[0]);
        } else {
            setDay(weekdays[weekdays.indexOf(day) + 1]);
        }
        setRecipe('');
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
                <div className="create">
                    <form
                        className="form"
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}
                    >
                        <div className="form-element">
                            <h1>Create menu</h1>
                        </div>

                        <InputRange htmlFor="year" type="number" value={year} onChange={setYear} text="År" min="1970" max="2099" />

                        <InputRange htmlFor="week" type="number" value={week} setter={setWeek} text="Vecka" min="1" max="52" />

                        <InputSelect optionList={[...data, '']} htmlFor="recipe" value={recipe} setter={setRecipe} text="Recept" />

                        <InputSelect optionList={weekdays} htmlFor="weekday" value={day} setter={setDay} text="Veckodag" />

                        <div className="form-element">
                            <input type="button" value="+" className="input button" onClick={handleAddRecipe} />
                        </div>

                        <WeekdayList weekdays={weekMenu} />

                        <div className="form-element">
                            <h2>Inköpslista</h2>
                        </div>

                        <IngredientList list={shoppingList} />

                        <div className="form-element">
                            <h2>Lösa ingredienser</h2>
                        </div>

                        <Input type="text" text="Namn" htmlFor="looseName" value={looseIngredientName} setter={setLooseIngredientName} />

                        <InputRange
                            text="Mängd"
                            min={0}
                            max={1000000000}
                            htmlFor="looseAmount"
                            value={looseIngredientAmount}
                            setter={setLooseIngredientAmount}
                        />

                        <InputSelect
                            text="Mått"
                            optionList={measurments}
                            htmlFor="looseMeasurment"
                            value={looseIngredientUnit}
                            setter={setLooseIngredientUnit}
                        />

                        <div className="form-element">
                            <input type="button" value="Lägg till" className="input button" onClick={handleAddLoose} />
                        </div>

                        <IngredientList list={looseIngredients} />

                        <div className="form-element">
                            <input
                                type="button"
                                value="Summera ingredienser"
                                className="input button"
                                onClick={() => {
                                    setShoppingList(summarizeShoppingList(shoppingList, ingredients));
                                }}
                            />
                        </div>

                        <div className="form-element">
                            <input type="submit" value="Submit" className="input button" />
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
