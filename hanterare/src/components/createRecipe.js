import React, { useState, useEffect } from "react";
import useFetch from './useFetch';

const CreateRecipe = () => {

  const [receptNamn, setReceptNamn] = useState('');
  const [beskrivning, setBeskrivning] = useState('');
  const [ingredients, setIngredienser] = useState([]);
  const [bild, setBild] = useState();

  const [ingredientName, setIngredientName] = useState();
  const [ingredientAmount, setIngredientAmount] = useState();
  const [ingredientMeasurment, setIngredientMeasurment] = useState();

  const handleSubmit = (e) => {
    //Prevent reloading page
    e.preventDefault();

    const recept = {
      namn: receptNamn,
      bild: "./img/lätt_sallad.jpg",
      bildtext: "En sprudlande grön sallad som smälter i munnen som slajm.",
      beskrivning: "Denna simpla och sköna gröna sallad kan hjälpa en under livets tuffa perioder. Lätt fuktig. Denna bäbis har mycket smak.",
      attribut: {
              portioner: 4,
              måltid: [
                    "förrätt",
                    "mellanmål",
                    "efterrätt"
                ],
                kost: [
                    "vegansk", 
                    "glutenfritt"
                ],
                egenskap: [
                    "billig",
                    "snabb"
                ],
                kök: [
                    "fransk"
                ],
                tid: "15"
            },
        ingredienser: [
            {
                namn: "sallat",
                mängd: 300,
                enhet: "g"
            },
            {
                namn: "tomat",
                mängd: 2,
                enhet: "st"
            }
        ],
        steg: {
            "0" :"Ansa den spröda och ljuvliga sallaten.",
            "1": "Skölj sallaten i isvatten precis som chocken av att vakna på morgonen.",
            "2": "Som en bödel vid Stockholms blodbad, skiva upp tomaten",
            "3": "Som en tornado sveper över landsmassor skall du nu blanda tomat och sallaten.",
            "4": "Avnjut smaken av slajm likt Daidalos avnjuter att slajma små barn."
        }
    }
  }

  const handleAddIngredient = () => {

    let newIngredient = {
      name: ingredientName,
      amount: ingredientAmount,
      measurment: ingredientMeasurment
    }

    setIngredienser([...ingredients, newIngredient])
  }

  const { data, isPending, error } = useFetch('http://192.168.0.122:8000/allaIngredienser', 'GET');

  return (
    <div className="create">
      <h2>Lägg till ett nytt recept</h2>
      <form onSubmit={handleSubmit} className="form">

        <div className="form-element">
          <label>Receptnamn</label>
          <input
            type="text"
            required
            value={receptNamn}
            onChange={(e) => setReceptNamn(e.target.value)}
          />
        </div>

        <div className="form-element">
          <label>Beskrivning</label>
          <textarea
            required
            value={beskrivning}
            onChange={(e) => setBeskrivning(e.target.value)}
          />
        </div>

        {/* Display status */}
        {error && <p>{error}</p>}
        {isPending && <p>{isPending}</p>}
        
        <div className="form-element">
          <div>
            <label htmlFor="namn">Namn</label>
            <select name="namn" id="">
              {data && data.map((ingredient, index) => {
                return (
                  <option value={ingredient.namn} key={index}>{ingredient.namn}</option>
                )
              })}
            </select>
          </div>

          <div className="form-element">
            <label htmlFor="amount">Mängd</label>
            <input type="number" name="amount" />
          </div>

          <div className="form-element">
            <label htmlFor="measurment">Mått</label>
            <select name="measurment" id="measurment">
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
        </div>


        {/* Display table headers */}
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
                    <p></p>
                    <p></p>
                  </div>
                )
              })}

            </>}
        </div>


        <div className="form-element">
          <label>Bild</label>
          <input
            type="text"
            id="bild"
            onChange={setBild}
          />
        </div>

        <div className="form-element">
          <label htmlFor="altText">Alt attribut</label>
          <input
            type="text"
            id="altText"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateRecipe