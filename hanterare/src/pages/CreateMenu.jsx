import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import UseAxios from '../hooks/UseAxios';
import Input from '../components/Input';
import InputSelect from '../components/InputSelect';
import InputRange from '../components/InputRange';
import WeekdayList from '../components/WeekdayList';
import Button from '../components/Button';
import IngredientList from '../components/IngredientList';
import { summarizeNames, summarizeShoppingList } from '../helpers';
import constants from '../data/constants.json';

// const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const CreateMenu = () => {
    const [update, setUpdate] = useState(false);

    //States for showing which days to eat what
    // const [monday, setMonday] = useState([]);
    // const [tuesday, setTuesday] = useState([]);
    // const [wednesday, setWednesday] = useState([]);
    // const [thursday, setThursday] = useState([]);
    // const [friday, setFriday] = useState([]);
    // const [saturday, setSaturday] = useState([]);
    // const [sunday, setSunday] = useState([]);
    const [shoppingList, setShoppingList] = useState([]);

    const [weekMenu, setWeekMenu] = useState([
        { name: 'monday', recipes: [] },
        { name: 'tuesday', recipes: [] },
        { name: 'wednesday', recipes: [] },
        { name: 'thursday', recipes: [] },
        { name: 'friday', recipes: [] },
        { name: 'saturday', recipes: [] },
        { name: 'sunday', recipes: [] },
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
    const [day, setDay] = useState(weekMenu[0].name);

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

        // setShoppingList(summarizeShoppingList(shoppingList, ingredients));

        const concatShoppingList = shoppingList.concat(looseIngredients);

        //Create object to insert into db
        //We only want to save the recipenames not the entire recipes
        const menu = {
            year: year,
            week: week,
            monday: summarizeNames(weekMenu[0].ingredients, data),
            tuesday: summarizeNames(weekMenu[1].ingredients, data),
            wednesday: summarizeNames(weekMenu[2].ingredients, data),
            thursday: summarizeNames(weekMenu[3].ingredients, data),
            friday: summarizeNames(weekMenu[4].ingredients, data),
            saturday: summarizeNames(weekMenu[5].ingredients, data),
            sunday: summarizeNames(weekMenu[6].ingredients, data),
            shoppingList: concatShoppingList,
        };

        console.log(menu);

        //Call api to create
        let response = await UseAxios('/menu/create/', menu);

        console.log(response);
    };

    const handleAddRecipe = () => {
        const addedRecipe = data.find(({ name }) => name === recipe);

        let dayIndex = weekMenu.findIndex(({ name }) => name === day);
        let tempWeekMenu = weekMenu;
        let weekMenuDay = tempWeekMenu.find(({ name }) => name === day);

        weekMenuDay.recipes = [...weekMenuDay.recipes, addedRecipe.name];

        //Set weekMenu to updated weekMenu
        tempWeekMenu[dayIndex] = weekMenuDay;

        setWeekMenu(tempWeekMenu);
        setShoppingList(summarizeShoppingList([...shoppingList, addedRecipe.ingredients]));

        if (weekMenu.findIndex(({ name }) => name === day) === 6) {
            setDay(weekMenu[0].name);
        } else {
            setDay(weekMenu[weekMenu.findIndex(({ name }) => name === day) + 1]);
        }
        setRecipe('');
    };

    const handleAddLoose = () => {
        const ingredient = {
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

                        <InputSelect
                            optionList={[...data, { name: '' }]}
                            htmlFor="recipe"
                            value={recipe}
                            setter={setRecipe}
                            text="Recept"
                        />

                        <InputSelect optionList={weekMenu} htmlFor="weekday" value={day} setter={setDay} text="Veckodag" />

                        <Button text={'+'} onClickFunc={handleAddRecipe} />

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
                            htmlFor="looseAmount"
                            value={looseIngredientAmount}
                            setter={setLooseIngredientAmount}
                        />

                        <InputSelect
                            text="Mått"
                            optionList={constants.measurmentTypes}
                            htmlFor="looseMeasurment"
                            value={looseIngredientUnit}
                            setter={setLooseIngredientUnit}
                        />

                        <Button text={'Lägg till'} onClickFunc={handleAddLoose} />

                        <IngredientList list={looseIngredients} />

                        <Button
                            text={'Summera ingredienser'}
                            onClickFunc={() => {
                                setShoppingList(summarizeShoppingList(shoppingList, ingredients));
                            }}
                        />

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
