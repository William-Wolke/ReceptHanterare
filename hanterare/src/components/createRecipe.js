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
                <div>Receptnamn</div>
                <input
                  type="text"
                  className="text-input"
                  required
                  value={receptNamn}
                  className="input"
                  onChange={(e) => setReceptNamn(e.target.value)}
                />
              </div>

              {/* Description */}
              <div className="form-element">
                <div>Beskrivning</div>
                <textarea
                  required
                  value={description}
                  className="input"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Image */}
              {/*<div className="form-element">
                <div>Bild</div>
                <input
                  type="text"
                  id="bild"
                  onChange={setBild}
                />
              </div>*/}

              {/* Alt attribute for img */}
              <div className="form-element">
                <div>Alt attribut</div>
                <input
                  type="text"
                  className="input"
                  id="altText"
                />
              </div>

              {/* Number of portions */}
              <div className="form-element">
                <div>Portioner</div>
                <input
                  type="number"
                  className="input"
                  id="portions"
                />
              </div>

              {/* Meal */}
              <div className="form-group">
                <div className="form-element">
                  <div>Måltid</div>
                  <input
                    type="number"
                    className="input"
                    id="portions"
                  />
                </div>

                {/*Add*/}
                <div className="form-element">
                  <input 
                      type="button" 
                      className="input button" 
                      value="Lägg till" 
                      onClick={() => {handleAddMeal()}} 
                  />
                </div>
              </div>

              {/* Display status on fetching ingredients */}
              {error && <p>{error}</p>}
              {isPending && <p>{isPending}</p>}
            

              {/* Ingredint only displays when ingredients are fetched */}
              {data && 
                <div className="form-group">
                  {/* Ingredint name */}
                  <div className="form-element">
                    <div>Namn</div>
                    <select 
                      name="namn" 
                      id="" 
                      value={ingredientName}
                      className="input"
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
                          onClick={() => handleAddIngredient()} />
                    </div>
                </div>
              }        
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
                          <div key={index} className="ingredient-list-item" key={"ingredient" + index}>
                            <p className="ingredient-list-value">{item.name}</p>
                            <p className="ingredient-list-value">{item.amount}</p>
                            <p className="ingredient-list-value">{item.unit}</p>
                          </div>
                        )
                      })}  
              </div>

              <div className="form-element">
                  <input type="submit" className="input" value="Submit"/>
              </div>

          </form>
      </div>
  );
}

export default CreateRecipe