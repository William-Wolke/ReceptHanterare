import React, { useState, useEffect } from "react";
import useFetch from './useFetch';
import CreateIngredient from './CreateIngredient';
import UseAxios from "./UseAxios";

const CreateRecipe = () => {

    //Form inputs to create a recipe
    const [recipeName, setRecipeName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [bild, setBild] = useState('');
    const [alt, setAlt] = useState('');
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
    const [ingredientUnit, setIngredientUnit] = useState('');

    //Form for attributes
    const [mealName, setMealName] = useState('');
    const [dietName, setDietName] = useState('');
    const [propertieName, setPropertieName] = useState('');
    const [kitchenName, setKitchenName] = useState('');
    const [step, setStep] = useState('');

    //Create new ingredient while creating recipe
    const [createNewIngredient, setCreateNewIngredient] = useState(false);

    //Update ingredients state
    const [updateIngredients, setUpdateIngredients] = useState('');

    //Onsubmit
    const handleSubmit = async (e) => {
      //Prevent reloading page
      e.preventDefault();

      //Create object to insert into db
      let recipe = {
        name: recipeName,
        image: bild,
        alt: alt,
        description: description,
        attribute: {
          portions: portions,
          meal: meal,
          diet: diet,
          properties: properties,
          kitchen: kitchen,
          time, time
        },
        ingredients: ingredients,
        steps: steps,
      }

      console.log(recipe);

      let res = await UseAxios("/recipe/create", recipe)
      if (res) {
        console.log("Created recipe");
      }
      else {
        console.log("Failed");
      }

    }

    //On add new ingredient
    const handleAddIngredient = () => {

      //create new ingredient
      let newIngredient = {
        name: ingredientName,
        amount: ingredientAmount,
        unit: ingredientUnit
      }

      console.log(newIngredient);

      //Push new ingredient to the list of ingredients
      setIngredients([...ingredients, newIngredient]);

      //Reset new ingredient form
      setIngredientName('');
      setIngredientUnit('');
      setIngredientAmount(0);
    }

    //On add new ingredient
    const handleAddMeal = () => {
      console.log("???");

      //Push new ingredient to the list of ingredients
      setMeal([...meal, mealName]);

      //Reset new meal form
      setMealName('')

      console.log("!!!");
      console.log(meal);
    }

    //On add new ingredient
    const handleAddDiet = () => {

      //Push new ingredient to the list of ingredients
      setDiet([...diet, dietName]);

      //Reset diet form
      setDietName('');
    }

    //On add new ingredient
    const handleAddKitchen = () => {

      //Push new ingredient to the list of ingredients
      setKitchen([...kitchen, kitchenName]);

      //Reset diet form
      setKitchenName('');
    }

    //On add new ingredient
    const handleAddPropertie = () => {

      //Push new ingredient to the list of ingredients
      setProperties([...properties, propertieName]);

      //Reset diet form
      setPropertieName('');
    }

    //On add new ingredient
    const handleAddStep = () => {

      //Push new ingredient to the list of ingredients
      setSteps([...steps, step]);

      //Reset diet form
      setStep('');
    }

    //Fetches ingredients from db
    const { data, isPending, error } = useFetch('/ingredient/all/', 'GET', updateIngredients);

    return (
        <>
            {createNewIngredient && <CreateIngredient />}
            {createNewIngredient && <button onClick={() => { setUpdateIngredients(updateIngredients + "y") }}>Update ingredients</button>}

            <div className="create">
                <h2>Lägg till ett nytt recept</h2>
                <form onSubmit={handleSubmit} className="form">

                    {/* Titel */}
                    <div className="form-element">
                        <label htmlFor="titel">recipeName</label>
                        <input
                          type="text"
                          id="titel"
                          required
                          value={recipeName}
                          onChange={(e) => setRecipeName(e.target.value)}
                        />
                    </div>

                    {/* Description */}
                    <div className="form-element">
                        <label htmlFor="description">Beskrivning</label>
                        <textarea
                          id="description"
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {/*  */}
                    <div>
                        <label htmlFor="time">Tid</label>
                        <input
                          type="number"
                          id="time"
                          required
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                        />
                    </div>

                    {/* Image */}
                    {/*<div className="form-element">
                        <label>Bild</label>
                        <input
                          type="text"
                          id="bild"
                          onChange={setBild}
                        />
                    </div>*/}

                    {/* Alt attribute for img */}
                    {/*<div className="form-element">
                        <label htmlFor="altText">Alt attribut</label>
                        <input
                          type="text"
                          id="altText"
                        />
                    </div>*/}

                    {/* Number of portions */}
                    <div className="form-element">
                        <label htmlFor="portions">Portioner</label>
                        <input
                          type="number"
                          id="portions"
                          value={portions}
                          onChange={(e) => setPortions(e.target.value)}
                        />
                    </div>

                    {/* Meal */}
                    <div>
                        <div className="form-element">
                            <label htmlFor="meal">Måltid</label>
                            <input
                              type="text"
                              list="meal"
                              value={mealName}
                              onChange={(e) => setMealName(e.target.value)}
                            />
                            <datalist id="meal">
                              <option>Förrätt</option>
                              <option>Efterrätt</option>
                              <option>Mellanmål</option>
                              <option>Middag</option>
                              <option>Lunch</option>
                            </datalist>
                        </div>
                        <div>
                            <input type="button" value="Lägg till" onClick={() => { handleAddMeal() }} />
                        </div>
                        <div>
                            {meal.map((item, index) => {
                                return (
                                    <div className="attribute-tag" key={index}>{item}</div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Diet */}
                    <div>
                        <div className="form-element">
                            <label htmlFor="meal">Kost</label>
                            <input
                              type="text"
                              list="diet"
                              value={dietName}
                              onChange={(e) => { setDietName(e.target.value) }}
                            />

                            <datalist id="diet">
                              <option>Vegansk</option>
                              <option>Glutenfri</option>
                              <option>Kött</option>
                              <option>Vegetarisk</option>
                              <option>Laktosfri</option>
                            </datalist>
                        </div>

                        <div>
                            <input type="button" value="Lägg till" onClick={() => { handleAddDiet() }} />
                        </div>

                        <div>
                            {diet.map((item, index) => {
                                return (
                                    <div className="attribute-tag" key={index}>{item}</div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Kitchen */}
                    <div>
                        <div className="form-element">
                            <label htmlFor="meal">Kök</label>
                            <input
                              type="text"
                              list="kitchen"
                              value={kitchenName}
                              onChange={(e) => { setKitchenName(e.target.value) }}
                            />

                            <datalist id="kitchen">
                              <option>Fransk</option>
                              <option>Svenska</option>
                              <option>Finsk</option>
                              <option>Tysk</option>
                              <option>Skånsk/Dansk</option>
                            </datalist>
                        </div>

                        <div>
                            <input type="button" value="Lägg till" onClick={() => { handleAddKitchen() }} />
                        </div>

                        <div>
                            {kitchen.map((item, index) => {
                                return (
                                    <div className="attribute-tag" key={index}>{item}</div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Propertie */}
                    <div>
                        <div className="form-element">
                            <label htmlFor="propertie">Egenskap</label>
                            <input
                              type="text"
                              list="propertie"
                              value={propertieName}
                              onChange={(e) => { setPropertieName(e.target.value) }}
                            />

                            <datalist id="propertie">
                                <option>Snabb</option>
                                <option>Billig</option>
                                <option>Lyxig</option>
                                <option>Långkok</option>
                                <option>Illasmakande</option>
                            </datalist>
                        </div>

                        <div>
                            <input type="button" value="Lägg till" onClick={() => { handleAddPropertie() }} />
                        </div>

                        <div>
                            {properties.map((item, index) => {
                                return(
                                    <div className="attribute-tag" key={index}>{item}</div>
                                )
                            })}
                        </div>
                    </div>


                    {/* Steps */}
                    <div>
                        <div className="form-element">
                          <label htmlFor="propertie">Steg</label>
                          <input
                            type="textbox"
                            value={step}
                            onChange={(e) => { setStep(e.target.value) }}
                          />
                        </div>

                        <div>
                          <input type="button" value="Lägg till" onClick={() => { handleAddStep() }} />
                        </div>

                        <div>
                            {steps.map((item, index) => {
                                return (
                                    <div className="" key={index}>{item}</div>
                                )
                            })}
                        </div>
                    </div>


                    {/* Display status on fetching ingredients */}
                    {error && <p>{error}</p>}
                    {isPending && <p>{isPending}</p>}


                    {/* Ingredint only displays when ingredients are fetched */}
                    {data && 
                        <div className="form-element">

                            <div>
                              <input type="button" value="Skapa en ny ingrediens" onClick={() => { setCreateNewIngredient(true); window.location.href += "#"; }} />
                            </div>

                            {/* Ingredint name */}
                            <div>
                              <label htmlFor="name">Namn</label>
                              <select
                                name="name"
                                id="name"
                                value={ingredientName}
                                onChange={(e) => setIngredientName(e.target.value)}
                              >
                                {data.map((ingredient, index) => {
                                  return (
                                    <option value={ingredient.name} key={index}>{ingredient.name}</option>
                                  )
                                })}
                                <option value=""></option>
                              </select>
                            </div>

                            {/* Ingredint amount */}
                            <div className="form-element">
                              <label htmlFor="amount">Mängd</label>
                              <input
                                type="number"
                                name="amount"
                                value={ingredientAmount}
                                onChange={(e) => setIngredientAmount(e.target.value)}
                              />
                            </div>

                            {/* Ingredint unit */}
                            <div className="form-element">
                              <label htmlFor="measurment">Mått</label>
                              <select
                                name="measurment"
                                id="measurment"
                                value={ingredientUnit}
                                onChange={(e) => setIngredientUnit(e.target.value)}
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
                                <input type="button" value="+" onClick={() => handleAddIngredient()} className="form-element" />
                            </div>
                        </div>
                    }

                    {/* Display table headers for ingredient list */}
                    <div className="form-element">
                        <div className="ingrediensRubrik">
                            <p>Nummer</p>
                            <p>Ingrediens</p>
                            <p>Mängd</p>
                            <p>Enhet</p>
                        </div>

                        {/* Display ingredients */}
                        {ingredients.map((item, index) => {
                            return (
                                <div key={index} className="form-element">
                                    <p>{index}</p>
                                    <p>{item.name}</p>
                                    <p>{item.amount}</p>
                                    <p>{item.unit}</p>
                                </div>
                            )
                        })}

                        {/* Ingredint amount */}
                        <div className="form-element">
                            <div>Mängd</div>
                            <input
                                type="number"
                                name="amount"
                                className="input"
                                value={ingredientAmount}
                                onChange={(e) => setIngredientAmount(e.target.value)}
                            />
                        </div>

                        {/* Ingredint unit */}
                        <div className="form-element">
                            <div>Mått</div>
                            <select
                                name="measurment"
                                id="measurment"
                                className="input"
                                value={ingredientUnit}
                                onChange={(e) => setIngredientUnit(e.target.value)}
                            >
                                <option value="Krm">Krm</option>
                                <option value="Tsk">Tsk</option>
                                <option value="Msk">Msk</option>
                                <option value="L">L</option>
                                <option value="Dl">Dl</option>
                                <option value="Cl">Cl</option>
                                <option value="Ml">Ml</option>
                                <option value="St">St</option>
                                <option value=""></option>
                            </select>
                        </div>
                        <div className="form-element">
                            <input
                                type="button"
                                className="input button"
                                value="+"
                                onClick={() => handleAddIngredient()}
                            />
                        </div>

                        {/* Display table headers for ingredient list */}
                        <div className="ingredient-list">
                            <div className="ingredient-list-item">
                              <p className="ingredient-list-value">Ingrediens</p>
                              <p className="ingredient-list-value">Mängd</p>
                              <p className="ingredient-list-value">Enhet</p>
                            </div>

                            {/* Display ingredients */}
                            {ingredients && ingredients.map((item, index) => {
                                return (
                                    <div className="ingredient-list-item" key={"ingredient" + index}>
                                        <p className="ingredient-list-value">{item.name}</p>
                                        <p className="ingredient-list-value">{item.amount}</p>
                                        <p className="ingredient-list-value">{item.unit}</p>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="form-element">
                            <input type="submit" className="input" value="Submit" />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateRecipe;