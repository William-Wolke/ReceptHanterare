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
import useFocus from '../hooks/useFocus';

const CreateRecipe = () => {
    //Form inputs to create a recipe
    const [recipeName, setRecipeName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([]);
    // const [image, setImage] = useState('');
    // const [alt, setAlt] = useState('');
    const [portions, setPortions] = useState(0);
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);
    const [time, setTime] = useState(0);
    const [steps, setSteps] = useState([]);

    //Form inputs to create an ingredient
    const [ingredientName, setIngredientName] = useState('');
    const [ingredientAmount, setIngredientAmount] = useState(0);
    const [ingredientUnit, setIngredientUnit] = useState(constants.measurmentTypes[constants.measurmentTypes.length - 1].name);

    //Form for attributes
    const [step, setStep] = useState('');

    //Create new ingredient while creating recipe
    const [createNewIngredient, setCreateNewIngredient] = useState(false);

    //Update ingredients state
    const [updateIngredients, setUpdateIngredients] = useState(1);

    const [tagRef, setTagFocus] = useFocus();
    const [ingredientRef, setIngredientFocus] = useFocus();
    const [stepRef, setStepFocus] = useFocus();

    const tagTypes = [...constants.mealTypes, ...constants.dietTypes, ...constants.kitchenTypes, ...constants.attributeTypes];

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
            portions: portions,
            tags: tags,
            time: time,
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
            };

            setIngredients([...ingredients, newIngredient]);

            setIngredientName('');
            setIngredientUnit('');
            setIngredientAmount(0);
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

    const handleAddTag = () => {
        handleAddListItem(tag, tags, setTag, setTags);
    };

    const handleAddStep = () => {
        handleAddListItem(step, steps, setStep, setSteps);
    };

    const handleSetIngredientName = (ingredientName) => {
        setIngredientName(ingredientName);
    };

    //Fetches ingredients from db
    const { data, isPending, error } = useFetch('/ingredient/all/', 'GET', updateIngredients);

    return (
        <>
            {createNewIngredient && <CreateIngredient />}
            {createNewIngredient && (
                <Button
                    text={'Update ingredients'}
                    onClickFunc={() => {
                        setUpdateIngredients(updateIngredients * -1);
                    }}
                />
            )}
            <div className="create">
                <form onSubmit={handleSubmit} className="form form-grid">
                    <div className="form-grid-element">
                        <div className="form-element">
                            <h1>Lägg till ett nytt recept</h1>
                        </div>

                        {/* Titel */}
                        <Input type="text" placeholder="Namn" htmlFor="recipeName" value={recipeName} setter={setRecipeName} />

                        {/* Description */}
                        <InputTextArea placeholder="Beskrivning..." htmlFor="description" value={description} setter={setDescription} />

                        <div className="form-atribute-container">
                            {/* Time */}
                            <InputRange text="Tid" min={1} htmlFor="time" value={time} setter={setTime} />
                            {/* Number of portions */}
                            <InputRange text="Portioner" min={1} htmlFor="portions" value={portions} setter={setPortions} />
                        </div>

                        <div className="form-atribute-container form-tag-container">
                            <div className="double-input-container form-tag-item">
                                <input
                                    className="input"
                                    type="text"
                                    list="tags"
                                    placeholder="Lägg till tag"
                                    value={tag}
                                    onChange={(e) => {
                                        setTag(e.target.value);
                                    }}
                                    ref={tagRef}
                                />
                                <input
                                    type="button"
                                    value="+"
                                    className="input"
                                    onClick={() => {
                                        handleAddTag();
                                        setTagFocus();
                                    }}
                                />
                                <datalist id="tags">
                                    {tagTypes.length &&
                                        tagTypes.map((option, index) => {
                                            return (
                                                <option value={option.name} key={index}>
                                                    {option.name}
                                                </option>
                                            );
                                        })}
                                </datalist>
                                <AttributeList list={tags} />
                            </div>
                        </div>

                        <div className="form-element">
                            <h2>Ingredienser</h2>
                        </div>

                        <IngredientList list={ingredients} setList={setIngredients} />

                        <div className="add-ingredient-form">
                            {/* Ingredint amount */}
                            <InputRange
                                text="Mängd"
                                htmlFor="amount"
                                value={ingredientAmount}
                                setter={setIngredientAmount}
                                className="add-ingredient-input"
                            />

                            {/* Ingredint unit */}

                            <InputSelect
                                text="Mått"
                                optionList={constants.measurmentTypes}
                                htmlFor="measurment"
                                value={ingredientUnit}
                                setter={setIngredientUnit}
                                className="add-ingredient-input"
                            />

                            {/* Ingredint name */}
                            {data && (
                                <InputList
                                    text="Namn"
                                    dataList={[...data, { name: '' }]}
                                    htmlFor="ingredientName"
                                    value={ingredientName}
                                    setter={handleSetIngredientName}
                                    listName="ingredient-name"
                                    className="add-ingredient-input"
                                    inputRef={ingredientRef}
                                />
                            )}

                            <Button
                                text="+"
                                onClickFunc={() => {
                                    handleAddIngredient();
                                    setIngredientFocus();
                                }}
                                className="add-ingredient-button steps-button"
                            />
                        </div>
                    </div>
                    <div className="form-grid-element">
                        {/* Steps */}

                        {steps.length > 0 && (
                            <ol className="form-ol">
                                {steps.map((stepItem) => {
                                    return <li>{stepItem}</li>;
                                })}
                            </ol>
                        )}
                        <div className="add-ingredient-form">
                            <InputTextArea
                                placeholder="Steg..."
                                htmlFor="steps"
                                value={step}
                                setter={setStep}
                                inputRef={stepRef}
                                className="ingredient-textarea"
                            />

                            <Button
                                text="+"
                                onClickFunc={() => {
                                    handleAddStep();
                                    setStepFocus();
                                }}
                                className="steps-button"
                            />
                        </div>

                        <div className="form-element">
                            <input type="submit" className="input" value="Submit" />
                        </div>
                    </div>

                    {/* Display status on fetching ingredients */}
                    {error && <p>{error}</p>}
                    {isPending && <p>{isPending}</p>}
                </form>
            </div>
        </>
    );
};

export default CreateRecipe;
