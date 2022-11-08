import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import CreateIngredient from "./CreateIngredient";
import UseAxios from "../hooks/UseAxios";
import Input from "../components/Input.jsx";
import InputSelect from "../components/InputSelect.jsx";
import InputRange from "../components/InputRange.jsx";
import InputTextArea from "../components/InputTextArea";
import AttributeList from "../components/AttributeList";
import Button from "../components/Button";
import IngredientList from "../components/IngredientList";

const mealTypes = [
  { name: "Förrätt", index: 0 },
  { name: "Efterrätt", index: 1 },
  { name: "Mellanmål", index: 2 },
  { name: "Middag", index: 3 },
  { name: "Lunch", index: 4 },
  { name: "saturday", index: 5 },
  { name: "sunday", index: 6 },
];

const dietTypes = [
  { name: "Vegansk", index: 0 },
  { name: "Glutenfri", index: 1 },
  { name: "Kött", index: 2 },
  { name: "Vegetarisk", index: 3 },
  { name: "Laktosfri", index: 4 },
  { name: "saturday", index: 5 },
  { name: "sunday", index: 6 },
];

const kitchenTypes = [
  { name: "Svensk", index: 0 },
  { name: "Finsk", index: 1 },
  { name: "Tysk", index: 2 },
  { name: "Skånsk/Dansk", index: 3 },
];

const attributeTypes = [
  { name: "Snabb", index: 0 },
  { name: "Billig", index: 1 },
  { name: "Lyxig", index: 2 },
  { name: "Långkok", index: 3 },
  { name: "Illasmakande", index: 4 },
];

const measurmentTypes = [
  { name: "Krm", index: 0 },
  { name: "Tsk", index: 1 },
  { name: "Msk", index: 2 },
  { name: "L", index: 3 },
  { name: "Dl", index: 4 },
  { name: "Cl", index: 5 },
  { name: "Ml", index: 6 },
  { name: "St", index: 7 },
  { name: "G", index: 8 },
  { name: "", index: 9 },
];

const CreateRecipe = () => {
  //Form inputs to create a recipe
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [image, setImage] = useState("");
  const [alt, setAlt] = useState("");
  const [portions, setPortions] = useState(0);
  const [meal, setMeal] = useState([]);
  const [diet, setDiet] = useState([]);
  const [properties, setProperties] = useState([]);
  const [kitchen, setKitchen] = useState([]);
  const [time, setTime] = useState(0);
  const [steps, setSteps] = useState([]);

  //Form inputs to create an ingredient
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState(0);
  const [ingredientUnit, setIngredientUnit] = useState("");

  //Form for attributes
  const [mealName, setMealName] = useState("");
  const [dietName, setDietName] = useState("");
  const [attributeName, setAttributeName] = useState("");
  const [kitchenName, setKitchenName] = useState("");
  const [step, setStep] = useState("");

  //Create new ingredient while creating recipe
  const [createNewIngredient, setCreateNewIngredient] = useState(false);

  //Update ingredients state
  const [updateIngredients, setUpdateIngredients] = useState("");

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
        time,
        time,
      },
      ingredients: ingredients,
      steps: steps,
    };

    console.log(recipe);

    let res = await UseAxios("/recipe/create", recipe);
    console.log(res);
    if (res) {
      console.log("Created recipe");
    } else {
      console.log("Failed");
    }
  };

  //On add new ingredient
  const handleAddIngredient = () => {
    //create new ingredient
    let newIngredient = {
      name: ingredientName,
      amount: ingredientAmount,
      unit: ingredientUnit,
    };

    console.log(newIngredient);

    //Push new ingredient to the list of ingredients
    setIngredients([...ingredients, newIngredient]);

    //Reset new ingredient form
    setIngredientName("");
    setIngredientUnit("");
    setIngredientAmount(0);
  };

  //On add new ingredient
  const handleAddMeal = () => {
    console.log("???");

    //Push new ingredient to the list of ingredients
    setMeal([...meal, mealName]);

    //Reset new meal form
    setMealName("");

    console.log("!!!");
    console.log(meal);
  };

  //On add new ingredient
  const handleAddDiet = () => {
    //Push new ingredient to the list of ingredients
    setDiet([...diet, dietName]);

    //Reset diet form
    setDietName("");
  };

  //On add new ingredient
  const handleAddKitchen = () => {
    //Push new ingredient to the list of ingredients
    setKitchen([...kitchen, kitchenName]);

    //Reset diet form
    setKitchenName("");
  };

  //On add new ingredient
  const handleAddPropertie = () => {
    //Push new ingredient to the list of ingredients
    setProperties([...properties, attributeName]);

    //Reset diet form
    setAttributeName("");
  };

  //On add new ingredient
  const handleAddStep = () => {
    //Push new ingredient to the list of ingredients
    setSteps([...steps, step]);

    //Reset diet form
    setStep("");
  };

  //Fetches ingredients from db
  const { data, isPending, error } = useFetch(
    "/ingredient/all/",
    "GET",
    updateIngredients
  );

  return (
    <>
      {createNewIngredient && <CreateIngredient />}
      {createNewIngredient && (
        <button
          onClick={() => {
            setUpdateIngredients(updateIngredients + "y");
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
          <Input
            type="text"
            text="Namn"
            htmlFor="recipeName"
            value={recipeName}
            setter={setRecipeName}
          />

          {/* Description */}
          <InputTextArea
            text="Beskrivning"
            htmlFor="description"
            value={description}
            setter={setDescription}
          />

          {/* Time */}
          <Input
            type="number"
            text="Tid"
            htmlFor="time"
            value={time}
            setter={setTime}
          />

          {/* Image */}
          <Input
            type="text"
            text="Bild"
            htmlFor="image"
            value={image}
            setter={setImage}
          />

          {/* Alt attribute for img */}
          <Input
            type="text"
            text="Alt attribut"
            htmlFor="altText"
            value={alt}
            setter={setAlt}
          />

          {/* Number of portions */}
          <Input
            type="text"
            text="Portioner"
            htmlFor="portions"
            value={portions}
            setter={setPortions}
          />

          <InputSelect
            text="Måltid"
            optionList={mealTypes}
            htmlFor="meal"
            value={mealName}
            setter={setMealName}
          />

          {/* Meal */}
          <div>
            <InputSelect
              text="Måltid"
              optionList={mealTypes}
              htmlFor="meal"
              value={mealName}
              setter={setMealName}
            />
            <Button text={"Lägg till"} onClickFunc={handleAddMeal} />

            <AttributeList list={meal} />
          </div>

          {/* Diet */}
          <div>
            <InputSelect
              text="Kost"
              optionList={dietTypes}
              htmlFor="diet"
              value={dietName}
              setter={setDietName}
            />

            <Button text="Lägg till" onClickFunc={handleAddDiet} />

            <AttributeList list={diet} />
          </div>

          {/* Kitchen */}
          <div>
            <InputSelect
              text="Kök"
              optionList={kitchenTypes}
              htmlFor="kitchen"
              value={kitchenName}
              setter={setKitchenName}
            />

            <Button text="Lägg till" onClickFunc={handleAddKitchen} />

            <AttributeList list={kitchen} />
          </div>

          {/* Attribute */}
          <div>
            <InputSelect
              text="Egenskap"
              optionList={attributeTypes}
              htmlFor="attribute"
              value={attributeName}
              setter={setAttributeName}
            />

            <Button text="Lägg till" onClickFunc={handleAddPropertie} />

            <AttributeList list={properties} />
          </div>

          {/* Steps */}
          <div>
            <InputTextArea
              text="Steg"
              htmlFor="steps"
              value={step}
              setter={setStep}
            />

            <Button text="Lägg till" onClickFunc={handleAddStep} />

            <AttributeList list={steps} />
          </div>

          {/* Display status on fetching ingredients */}
          {error && <p>{error}</p>}
          {isPending && <p>{isPending}</p>}

          <div>
            {/* Ingredint name */}

            <InputSelect
              text="Namn"
              optionList={[...data, { name: "" }]}
              htmlFor="name"
              value={ingredientName}
              setter={setIngredientName}
            />

            {/* Ingredint amount */}

            <Input
              type="number"
              text="Mängd"
              htmlFor="amount"
              value={ingredientAmount}
              setter={setIngredientAmount}
            />

            {/* Ingredint unit */}

            <InputSelect
              text="Mått"
              optionList={measurmentTypes}
              htmlFor="measurment"
              value={mealName}
              setter={setIngredientUnit}
            />

            <Button text="+" onClickFunc={handleAddIngredient}/>

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
