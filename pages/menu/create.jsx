import React, { useState } from 'react';
import UseAxios from '../../src/hooks/UseAxios';
import Input from '../../components/Input';
import InputSelect from '../../components/InputSelect';
import InputRange from '../../components/InputRange';
import Button from '../../components/Button';
import IngredientList from '../../components/IngredientList';
import { summarizeShoppingList, toPreferredUnit } from '../../src/helpers';
import constants from '../../src/constants.json';
import { db } from '../../src/db';

export async function getServerSideProps() {
    const recipeData = db.Menu.find();
    const ingredientRes = db.Ingredient.find();
    return {
        props: {
            recipes: recipeData,
            ingredients: ingredientData,
        },
    };
};

export default function CreateMenu({ recipes, ingredients }) {
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

    //States for general info for menu
    const [week, setWeek] = useState(1);
    const [year, setYear] = useState(2023);

    //States to add new element/recipes to days
    const [recipe, setRecipe] = useState('');
    const [day, setDay] = useState(weekMenu[0].name);

    const [looseIngredients, setLooseIngredients] = useState([]);

    const [looseIngredientName, setLooseIngredientName] = useState('');
    const [looseIngredientAmount, setLooseIngredientAmount] = useState(0);
    const [looseIngredientUnit, setLooseIngredientUnit] = useState();

    const handleSubmit = async (e) => {
        //Prevent reloading page
        e.preventDefault();

        const tempShoppingList = summarizeShoppingList(shoppingList, ingredients).concat(looseIngredients);

        //Create object to insert into db
        //We only want to save the recipenames not the entire recipes
        const menu = {
            year: year,
            week: week,
            monday: weekMenu[0].recipes,
            tuesday: weekMenu[1].recipes,
            wednesday: weekMenu[2].recipes,
            thursday: weekMenu[3].recipes,
            friday: weekMenu[4].recipes,
            saturday: weekMenu[5].recipes,
            sunday: weekMenu[6].recipes,
            shoppingList: tempShoppingList,
        };
        console.log(menu);

        //Call api to create
        let response = await UseAxios('/menu/create/', menu);

        console.log(response);
    };

    function handleAddRecipe() {
        const addedRecipe = recipes.find(({ name }) => name === recipe);

        if (!addedRecipe) return;

        const dayIndex = weekMenu.findIndex(({ name }) => name === day);
        let weekMenuDay = weekMenu.find(({ name }) => name === day);
        let tempWeekMenu = weekMenu;

        if (weekMenuDay) {
            weekMenuDay.recipes = [...weekMenuDay.recipes, addedRecipe.name];
        } else {
            weekMenuDay.recipes = [addedRecipe.name];
        }

        //Set weekMenu to updated weekMenu
        tempWeekMenu[dayIndex] = weekMenuDay;

        setWeekMenu(tempWeekMenu);

        let tempShoppingList;
        if (shoppingList.length) {
            tempShoppingList = summarizeShoppingList(toPreferredUnit([...shoppingList, ...addedRecipe.ingredients], ingredients));
        } else {
            tempShoppingList = summarizeShoppingList(toPreferredUnit(addedRecipe.ingredients, ingredients));
        }

        setShoppingList(tempShoppingList);

        if (weekMenu.findIndex(({ name }) => name === day) === 6) {
            setDay(weekMenu[0].name);
        } else {
            setDay(weekMenu[weekMenu.findIndex(({ name }) => name === day) + 1].name);
        }
        setRecipe('');
    };

    function handleAddLoose() {
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
            {recipes && ingredients && (
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
                            optionList={[...recipes, { name: '' }]}
                            htmlFor="recipe"
                            value={recipe}
                            setter={setRecipe}
                            text="Recept"
                        />

                        <InputSelect optionList={weekMenu} htmlFor="weekday" value={day} setter={setDay} text="Veckodag" />

                        <Button text={'+'} onClickFunc={handleAddRecipe} />

                        <div className="weekdayMenuList form-element">
                            {weekMenu.map(({ name, recipes }, index) => {
                                return (
                                    <div key={`${name} + ${index}`} className="weekdayMenuItem">
                                        <h2 className="weekdayMenuHeader">{name}</h2>
                                        {recipes &&
                                            recipes.map((recipeName, index) => {
                                                return <p key={'recipe' + index}>{recipeName}</p>;
                                            })}
                                    </div>
                                );
                            })}
                        </div>

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

                        <div className="form-element">
                            <input type="submit" value="Submit" className="input button" />
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
