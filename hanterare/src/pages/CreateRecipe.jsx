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
    const [steps, setSteps] = useState([{ stepText: '' }]);

    //Form inputs to create an ingredient
    // const [ingredientName, setIngredientName] = useState('');
    // const [ingredientAmount, setIngredientAmount] = useState(0);
    // const [ingredientUnit, setIngredientUnit] = useState(constants.measurmentTypes[constants.measurmentTypes.length - 1].name);
    const [inputFields, setInputFields] = useState([{ ingredientAmount: 0, ingredientUnit: '', ingredientName: '' }]);
    const [inputSteps, setStep] = useState([{ stepText: '' }])

    //Form for attributes
    // const [step, setStep] = useState('');

    //Create new ingredient while creating recipe
    const [createNewIngredient, setCreateNewIngredient] = useState(false);

    //Update ingredients state
    const [updateIngredients, setUpdateIngredients] = useState(1);

    const [tagRef, setTagFocus] = useFocus();
    const [stepRef, setStepFocus] = useFocus();

    const tagTypes = [...constants.mealTypes, ...constants.dietTypes, ...constants.kitchenTypes, ...constants.attributeTypes];

    //Onsubmit
    const handleSubmit = async (e) => {
        //Prevent reloading page
        e.preventDefault();
        let tempIngredients = [];
        let tempSteps = [];

        inputFields.forEach((field) => {
            if (field.ingredientName) {
                tempIngredients.push({
                    amount: field.ingredientAmount,
                    unit: field.ingredientUnit,
                    name: field.ingredientName,
                });
            }
        })
        inputSteps.forEach((step) => {
            if (step.stepText) {
                tempSteps.push(step.stepText)
            }
        })


        //Create object to insert into db
        const recipe = {
            name: recipeName,
            // image: image,
            // alt: alt,
            description: description,
            portions: portions,
            tags: tags,
            time: time,
            ingredients: tempIngredients,
            steps: tempSteps,
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

    const addFields = () => {
        let newField = { ingredientAmount: 0, ingredientUnit: '', ingredientName: '' }

        setInputFields([...inputFields, newField])
    }

    const addSteps = () => {
        let newStep = { stepText: '' }

        setStep([...inputSteps, newStep])
    }

    const handleFormChange = (event, index) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }

    const handleStepChange = (event, index) => {
        let data = [...inputSteps];
        data[index][event.target.name] = event.target.value;
        setStep(data);
    }

    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }

    const removeStepsFields = (index) => {
        let data = [...inputSteps];
        data.splice(index, 1)
        setStep(data)
    }

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
                                    className="input add add-tag"
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

                        <div>
                            {inputFields.map((input, index) => {
                                return (
                                    <div className="add-ingredient-form" key={index}>
                                        {/* Ingredint amount */}
                                        <div className='form-group form-element add-ingredient-input'>
                                            {/* <label htmlFor={amount}>{text}</label> */}
                                            <input
                                                type='number'
                                                id='amount'
                                                value={input.ingredientAmount}
                                                min="0"
                                                max="9999"
                                                className='input'
                                                step="0.0001"
                                                onChange={(event) => {
                                                    handleFormChange(event, index);
                                                }}
                                                name="ingredientAmount"
                                            />
                                        </div>

                                        {/* Ingredint unit */}
                                        <div className='form-group form-element add-ingredient-input'>
                                            {/* <label htmlFor='measurment'>Hej</label> */}
                                            <select
                                                id='measurment'
                                                className='input'
                                                value={input.ingredientUnit}
                                                name='ingredientUnit'
                                                onChange={(event) => {
                                                    handleFormChange(event, index);
                                                }}
                                            >
                                                {constants.measurmentTypes && constants.measurmentTypes.map((option, index) => {
                                                    return (<option value={option.name} key={index}>{option.name}</option>)
                                                })}
                                            </select>
                                        </div>

                                        {/* Ingredint name */}
                                        {data && (
                                            <div className="form-group form-element add-ingredient-input add-ingredient-input-name">
                                                {/* <label htmlFor={htmlFor}>{text}</label> */}
                                                <input
                                                    type="text"
                                                    id='ingredientName'
                                                    value={input.ingredientName}
                                                    className="input add-ingredient-input"
                                                    list='ingredient-name'
                                                    onChange={(event) => {
                                                        handleFormChange(event, index);
                                                    }}
                                                    autoComplete={"off"}
                                                    name="ingredientName"
                                                />

                                                <datalist id='ingredient-name'>
                                                    {[...data, { name: '' }].length &&
                                                        [...data, { name: '' }].map((option, index) => {
                                                            return (
                                                                <option value={option.name} key={index}>
                                                                    {option.name}
                                                                </option>
                                                            );
                                                        })}
                                                </datalist>
                                            </div>
                                        )}
                                        
                                        <button className="remove-ingredient-button remove " type='button' onClick={() => removeFields(index)}>Ta bort</button>

                                    </div>
                                )
                            })}
                        </div>

                        <div className="form-element add-button-container">
                            <input
                                type="button"
                                value='+'
                                className="input button steps-button add"
                                onClick={addFields}
                            />
                        </div>

                    </div>
                    <div className="form-grid-element">
                        {/* Steps */}
                        <div className="form-element">
                            <h2>Lägg till steg</h2>
                        </div>

                        <div>
                            <div>
                                {inputSteps.map((input, index) => {
                                    return (
                                        <div className="form-group form-element  add-step-form" key={index}>
                                            <p>{index + 1 + "."}</p>
                                            {/* <label htmlFor={htmlFor}>{text}</label> */}
                                            <textarea
                                                id='step'
                                                value={input.stepText}
                                                className="input add-step-input"
                                                onChange={(event) => {
                                                    handleStepChange(event, index);
                                                }}
                                                name="stepText"
                                            />
                                            <button className="remove-step-button remove" type='button' onClick={() => removeStepsFields(index)}>Ta bort</button>
                                        </div>
                                    )
                                })}
                            </div>


                            <div className="form-element add-button-container">
                                <input
                                    type="button"
                                    value='+'
                                    className="input button steps-button add"
                                    onClick={addSteps}
                                />
                            </div>
                        </div>

                        <div className="form-element submit-button">
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
