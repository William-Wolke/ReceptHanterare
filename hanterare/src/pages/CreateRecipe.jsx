import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import CreateIngredient from './CreateIngredient';
import UseAxios from '../hooks/UseAxios';
import Input from '../components/Input.jsx';
import InputSelect from '../components/InputSelect.jsx';
import InputRange from '../components/InputRange.jsx';
import InputTextArea from '../components/InputTextArea';
import AttributeList from '../components/AttributeList';
import Button from '../components/Button';
import IngredientList from '../components/IngredientList';
import InputList from '../components/InputList';
import constants from '../data/constants.json';

const CreateRecipe = () => {
    //Form inputs to create a recipe
    const [recipeName, setRecipeName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([]);
    // const [image, setImage] = useState('');
    // const [alt, setAlt] = useState('');
    const [portions, setPortions] = useState(0);
    const [meal, setMeal] = useState([]);
    const [diet, setDiet] = useState([]);
    const [properties, setProperties] = useState([]);
    const [kitchen, setKitchen] = useState([]);
    const [time, setTime] = useState(0);
    const [steps, setSteps] = useState([]);

    //Form inputs to create an ingredient
    const [ingredientName, setIngredientName] = useState('');
    const [ingredientAmount, setIngredientAmount] = useState(0);
    const [ingredientUnit, setIngredientUnit] = useState(constants.measurmentTypes[constants.measurmentTypes.length - 1].name);
    const [ingredientSection, setIngredientSection] = useState(constants.sectionTypes[0].name);

    //Form for attributes
    const [mealName, setMealName] = useState('');
    const [dietName, setDietName] = useState('');
    const [attributeName, setAttributeName] = useState('');
    const [kitchenName, setKitchenName] = useState('');
    const [step, setStep] = useState('');

    //Create new ingredient while creating recipe
    const [createNewIngredient, setCreateNewIngredient] = useState(false);

    //Update ingredients state
    const [updateIngredients, setUpdateIngredients] = useState(1);

    //Onsubmit
    const handleSubmit = async (e) => {
        //Prevent reloading page
        e.preventDefault();

        //Create object to insert into db
        const recipe = {
            name: recipeName,
            // image: image,
            // alt: alt,
            description: description,
            attribute: {
                portions: portions,
                meal: meal,
                diet: diet,
                properties: properties,
                kitchen: kitchen,
                time: time,
            },
            ingredients: ingredients,
            steps: steps,
        };

        console.log(recipe);

        let isOk = await UseAxios('/recipe/create', recipe);
        console.log(isOk);
        if (isOk) {
            alert('Created recipe');
        } else {
            console.log('Failed');
        }
    };

    //On add new ingredient
    const handleAddIngredient = () => {
        const ingredient = data.find(({ name }) => name === ingredientName);

        if (ingredientName && ingredientAmount && ingredientUnit) {
            //create new ingredient
            let newIngredient = {
                name: ingredientName,
                amount: ingredientAmount,
                unit: ingredientUnit,
                section: ingredient?.section,
            };

            setIngredients([...ingredients, newIngredient]);

            setIngredientName('');
            setIngredientUnit('');
            setIngredientAmount(0);
            setIngredientSection('');
        }
    };

    const handleAddListItem = (value, list, setValue, setList) => {
        if (!value) {
            return;
        }

        if (list.includes(value)) {
            return;
        }

        setList([...list, value]);

        setValue('');
    };

    const handleAddMeal = () => {
        handleAddListItem(mealName, meal, setMealName, setMeal);
    };

    //On add new ingredient
    const handleAddDiet = () => {
        handleAddListItem(dietName, diet, setDietName, setDiet);
    };

    const handleAddKitchen = () => {
        handleAddListItem(kitchenName, kitchen, setKitchenName, setKitchen);
    };

    const handleAddPropertie = () => {
        handleAddListItem(attributeName, properties, setAttributeName, setProperties);
    };

    const handleAddStep = () => {
        handleAddListItem(step, steps, setStep, setSteps);
    };

    const handleSetIngredientName = (ingredientName) => {
        const ingredient = data.find(({ name }) => {
            console.log(name, ingredientName);
            return name === ingredientName;
        });
        if (ingredient?.unit && ingredient?.unit.preferredUnit) {
            setIngredientName(ingredient.name);
            setIngredientUnit(ingredient.unit.preferredUnit);
            setIngredientSection(ingredient.section);
            console.log(ingredient.section);
        } else {
            setIngredientName(ingredientName);
        }
    };

    //Fetches ingredients from db
    const { data, isPending, error } = useFetch('/ingredient/all/', 'GET', updateIngredients);

    return (
        <>
            {createNewIngredient && <CreateIngredient />}
            {createNewIngredient && (
                <button
                    onClick={() => {
                        setUpdateIngredients(updateIngredients * -1);
                    }}
                >
                    Update ingredients
                </button>
            )}
            <div className="create">
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-element">
                        <h1>Lägg till ett nytt recept</h1>
                    </div>

                    {/* Titel */}
                    <Input type="text" text="Namn" htmlFor="recipeName" value={recipeName} setter={setRecipeName} />

                    {/* Description */}
                    <InputTextArea text="Beskrivning" htmlFor="description" value={description} setter={setDescription} />

                    {/* Time */}
                    <InputRange text="Tid" min={1} htmlFor="time" value={time} setter={setTime} />

                    {/* Image */}
                    {/* <Input type="text" text="Bild" htmlFor="image" value={image} setter={setImage} /> */}

                    {/* Alt attribute for img */}
                    {/* <Input type="text" text="Alt attribut" htmlFor="altText" value={alt} setter={setAlt} /> */}

                    {/* Number of portions */}
                    <InputRange text="Portioner" min={1} htmlFor="portions" value={portions} setter={setPortions} />

                    {/* Meal */}
                    <div>
                        <InputSelect text="Måltid" optionList={constants.mealTypes} htmlFor="meal" value={mealName} setter={setMealName} />
                        <Button text={'Lägg till'} onClickFunc={handleAddMeal} />

                        <AttributeList list={meal} />
                    </div>

                    {/* Diet */}
                    <div>
                        <InputSelect text="Kost" optionList={constants.dietTypes} htmlFor="diet" value={dietName} setter={setDietName} />

                        <Button text="Lägg till" onClickFunc={handleAddDiet} />

                        <AttributeList list={diet} />
                    </div>

                    {/* Kitchen */}
                    <div>
                        <InputSelect text="Kök" optionList={constants.kitchenTypes} htmlFor="kitchen" value={kitchenName} setter={setKitchenName} />

                        <Button text="Lägg till" onClickFunc={handleAddKitchen} />

                        <AttributeList list={kitchen} />
                    </div>

                    {/* Attribute */}
                    <div>
                        <InputSelect
                            text="Egenskap"
                            optionList={constants.attributeTypes}
                            htmlFor="attribute"
                            value={attributeName}
                            setter={setAttributeName}
                        />

                        <Button text="Lägg till" onClickFunc={handleAddPropertie} />

                        <AttributeList list={properties} />
                    </div>

                    {/* Steps */}
                    <div>
                        <InputTextArea text="Steg" htmlFor="steps" value={step} setter={setStep} />

                        <Button text="Lägg till" onClickFunc={handleAddStep} />

                        <AttributeList list={steps} />
                    </div>

                    {/* Display status on fetching ingredients */}
                    {error && <p>{error}</p>}
                    {isPending && <p>{isPending}</p>}

                    <div className="form-element">
                        <h2>Lägg till ingredienser</h2>
                    </div>

                    <div>
                        {/* Ingredint name */}

                        {data && (
                            <InputList
                                text="Namn"
                                dataList={[...data, { name: '' }]}
                                htmlFor="ingredientName"
                                value={ingredientName}
                                setter={handleSetIngredientName}
                                listName="ingredient-name"
                            />
                        )}

                        {/* Ingredint amount */}

                        <InputRange text="Mängd" htmlFor="amount" value={ingredientAmount} setter={setIngredientAmount} />

                        {/* Ingredint unit */}

                        <InputSelect
                            text="Mått"
                            optionList={constants.measurmentTypes}
                            htmlFor="measurment"
                            value={ingredientUnit}
                            setter={setIngredientUnit}
                        />

                        {/* Ingredient section */}

                        <InputSelect
                            text="Del i butiken"
                            optionList={constants.sectionTypes}
                            htmlFor="section"
                            value={ingredientSection}
                            setter={setIngredientSection}
                        />

                        <Button text="+" onClickFunc={handleAddIngredient} />

                        <IngredientList list={ingredients} />

                        <div className="form-element">
                            <input type="submit" className="input" value="Submit" />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateRecipe;
