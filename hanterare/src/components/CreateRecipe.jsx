import React, { useState, useEffect } from "react";
import useFetch from './useFetch';
import CreateIngredient from './CreateIngredient';
import UseAxios from "./UseAxios";

const CreateRecipe = () => {

  //Form inputs to create a recipe
  const [recipeName, setRecipeName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [image, setImage] = useState('');
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
      image: image,
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
    console.log(res);
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
        <form onSubmit={handleSubmit} className="form">
          <div className="form-element">
            <h1>L??gg till ett nytt recept</h1>
          </div>
          {/* Titel */}
          <div className="form-element">
            <label htmlFor="titel">recipeName</label>
            <input
              type="text"
              id="titel"
              required
              className="input"
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
              className="input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Time */}
          <div className="form-element">
            <label htmlFor="time">Tid</label>
            <input
              type="number"
              id="time"
              required
              className="input"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          {/* Image */}
          <div className="form-element">
            <label>Bild</label>
            <input
              type="text"
              id="bild"
              value={image}
              className="input"
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          {/* Alt attribute for img */}
          <div className="form-element">
            <label htmlFor="altText">Alt attribut</label>
            <input
              type="text"
              id="altText"
              value={alt}
              className="input"
              onChange={(e) => setAlt(e.target.value)}
            />
          </div>

          {/* Number of portions */}
          <div className="form-element">
            <label htmlFor="portions">Portioner</label>
            <input
              type="number"
              id="portions"
              value={portions}
              className="input"
              onChange={(e) => setPortions(e.target.value)}
            />
          </div>

          {/* Meal */}
          <div>
            <div className="form-element">
              <label htmlFor="meal">M??ltid</label>
              <input
                type="text"
                list="meal"
                value={mealName}
                className="input"
                onChange={(e) => setMealName(e.target.value)}
              />
              <datalist id="meal">
                <option>F??rr??tt</option>
                <option>Efterr??tt</option>
                <option>Mellanm??l</option>
                <option>Middag</option>
                <option>Lunch</option>
              </datalist>
            </div>
            <div className="form-element">
              <input
                type="button"
                value="L??gg till"
                className="input button"
                onClick={() => { handleAddMeal() }} 
              />
            </div>
            <div className="form-element recipeAttributeList">
              {meal.map((item, index) => {
                return (
                  <div className="recipeAttributeItem" key={index}>{item}</div>
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
                className="input"
                onChange={(e) => { setDietName(e.target.value) }}
              />

              <datalist id="diet">
                <option>Vegansk</option>
                <option>Glutenfri</option>
                <option>K??tt</option>
                <option>Vegetarisk</option>
                <option>Laktosfri</option>
              </datalist>
            </div>

            <div className="form-element">
              <input
                type="button"
                value="L??gg till"
                className="input button"
                onClick={() => { handleAddDiet() }} 
              />
            </div>

            <div className="form-element recipeAttributeList">
              {diet.map((item, index) => {
                return (
                  <div className="recipeAttributeItem" key={index}>{item}</div>
                )
              })}
            </div>
          </div>

          {/* Kitchen */}
          <div>
            <div className="form-element">
              <label htmlFor="meal">K??k</label>
              <input
                type="text"
                list="kitchen"
                value={kitchenName}
                className="input"
                onChange={(e) => { setKitchenName(e.target.value) }}
              />

              <datalist id="kitchen">
                <option>Fransk</option>
                <option>Svenska</option>
                <option>Finsk</option>
                <option>Tysk</option>
                <option>Sk??nsk/Dansk</option>
              </datalist>
            </div>

            <div className="form-element">
              <input
                type="button"
                value="L??gg till"
                className="input button"
                onClick={() => { handleAddKitchen() }}
              />
            </div>

            <div className="form-element recipeAttributeList">
              {kitchen.map((item, index) => {
                return (
                  <div className="recipeAttributeItem" key={index}>{item}</div>
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
                className="input"
                onChange={(e) => { setPropertieName(e.target.value) }}
              />

              <datalist id="propertie">
                <option>Snabb</option>
                <option>Billig</option>
                <option>Lyxig</option>
                <option>L??ngkok</option>
                <option>Illasmakande</option>
              </datalist>
            </div>

            <div className="form-element">
              <input
                type="button"
                value="L??gg till"
                className="input button"
                onClick={() => { handleAddPropertie() }}
              />
            </div>

            <div className="form-element recipeAttributeList">
              {properties.map((item, index) => {
                return (
                  <div className="recipeAttributeItem" key={index}>{item}</div>
                )
              })}
            </div>
          </div>

          {/* Steps */}
          <div>
            <div className="form-element">
              <label htmlFor="propertie">Steg</label>
              <textarea
                value={step}
                className="input textarea"
                onChange={(e) => { setStep(e.target.value) }}
              />
            </div>

            <div className="form-element">
              <input
                type="button"
                value="L??gg till"
                className="input button"
                onClick={() => { handleAddStep() }}
              />
            </div>

            <div className="form-element recipeStepsList">
              {steps.map((item, index) => {
                return (
                  <div className="recipeAttributeItem" key={index}>{item}</div>
                )
              })}
            </div>
          </div>

          {/* Display status on fetching ingredients */}
          {error && <p>{error}</p>}
          {isPending && <p>{isPending}</p>}

          <div>
            {/* Ingredint name */}
            <div className="ingredientTable form-element">
              <label htmlFor="name">Namn</label>
              <select
                name="name"
                id="name"
                value={ingredientName}
                className="input"
                onChange={(e) => setIngredientName(e.target.value)}
              >
                {data && data.map((ingredient, index) => {
                  return (
                    <option value={ingredient.name} key={index}>{ingredient.name}</option>
                  )
                })}
                <option value=""></option>
              </select>
            </div>

            {/* Ingredint amount */}
            <div className="form-element">
              <div>M??ngd</div>
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
              <div>M??tt</div>
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
                <option value="G">G</option>
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
            <div className="ingredient-list form-element">
              <div className="ingredient-list-item">
                <p className="ingredient-list-value">Ingrediens</p>
                <p className="ingredient-list-value">M??ngd</p>
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