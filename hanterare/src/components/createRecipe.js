import React, { useState, useEffect } from "react";
import useFetch from './useFetch';

const CreateRecipe = () => {

  //Form inputs to create a recipe
  const [receptNamn, setReceptNamn] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredienser] = useState([]);
  const [bild, setBild] = useState();
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

  //Onsubmit
  const handleSubmit = (e) => {
    //Prevent reloading page
    e.preventDefault();

    //Create object to insert into db
    const recept = {
      name: receptNamn,
      image: bild,
      alt: alt,
      description: description,
      attribute: {
        portions: portions,
        meal: meal,
        diet: diet,
        properties: properties,
        kitchen: kitchen,
      },
      ingredients: ingredients,
      steps: steps,
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
    setIngredienser([...ingredients, newIngredient]);

    //Reset new ingredient form
    setIngredientName('');
    setIngredientUnit('');
    setIngredientAmount(0);
  }

  //On add new ingredient
  const handleAddMeal = () => {

    //Push new ingredient to the list of ingredients
    setMeal([...meal, mealName]);

    //Reset new ingredient form
    setIngredientName('');
    setIngredientUnit('');
    setIngredientAmount(0);
  }

  //Fetches ingredients from db
  const { data, isPending, error } = useFetch('http://localhost:8000/allaIngredienser', 'GET');

  return (
    <div className="create">
      <h2>Lägg till ett nytt recept</h2>
      <form onSubmit={handleSubmit} className="form">

        {/* Titel */}
        <div className="form-element">
          <label>Receptnamn</label>
          <input
            type="text"
            required
            value={receptNamn}
            onChange={(e) => setReceptNamn(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="form-element">
          <label>Beskrivning</label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
        <div className="form-element">
          <label htmlFor="altText">Alt attribut</label>
          <input
            type="text"
            id="altText"
          />
        </div>

        {/* Number of portions */}
        <div className="form-element">
          <label htmlFor="portions">Portioner</label>
          <input
            type="number"
            id="portions"
          />
        </div>

        {/* Meal */}
        <div>
          <div className="form-element">
            <label htmlFor="portions">Portioner</label>
            <input
              type="number"
              id="portions"
            />
          </div>

          <div>
            <input type="button" value="Lägg till" onClick={() => {handleAddMeal()}} />
          </div>
        </div>

        {/* Display status on fetching ingredients */}
        {error && <p>{error}</p>}
        {isPending && <p>{isPending}</p>}
        

        {/* Ingredint only displays when ingredients are fetched */}
        {data && <div className="form-element">
          
          {/* Ingredint name */}
          <div>
            <label htmlFor="namn">Namn</label>
            <select 
              name="namn" 
              id="" 
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
              <option value=""></option>
            </select>
          </div>

          <input type="button" value="+" onClick={() => handleAddIngredient()} className="form-element" />
        </div>}        

        {/* Display table headers for ingredient list */}
        <div className="form-element">
          <div className="ingrediensRubrik">
            <p>Nummer</p>
            <p>Ingrediens</p>
            <p>Mängd</p>
            <p>Enhet</p>
          </div>

          {/* Display ingredients */}
          {
            <>
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

            </>}
        </div>

        <div>
          <input type="submit" value="Submit"/>
        </div>

      </form>
    </div>
  );
}

export default CreateRecipe