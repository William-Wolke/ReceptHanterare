import React, { useState, useEffect } from "react";
import useFetch from './useFetch';

const CreateRecipe = () => {

  const [receptNamn, setReceptNamn] = useState('');
  const [beskrivning, setBeskrivning] = useState('');
  const [ingredienser, setIngredienser] = useState([]);
  const [bild, setBild] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const recept = {
      namn: receptNamn,

    }
  }

  const handleAddIngredient = () => {
    setIngredienser([...ingredienser, ""])
  }

  const handleChangeIngredient = (e, index) => {

    const tempArr = ingredienser;
    tempArr[index] = e.target.value;

    setIngredienser(tempArr);
  }

  const { data: ingrediens, isPending, error } = useFetch('http://192.168.0.122:8000/allaIngredienser', 'GET');

  return (
    <div className="create">
      <h2>Lägg till ett nytt recept</h2>
      <form onSubmit={handleSubmit}>

        <label>Receptnamn</label>
        <input
          type="text"
          required
          value={receptNamn}
          onChange={(e) => setReceptNamn(e.target.value)}
        />

        <label>Beskrivning</label>
        <textarea
          required
          value={beskrivning}
          onChange={(e) => setBeskrivning(e.target.value)}
        />
        {ingrediens && <p>{ingrediens.namn}</p>}
        {error && <p>{error}</p>}
        {isPending && <p>{isPending}</p>}
        <div className="ingrediensRubrik">
          <p>Ingrediens</p>
          <p>Mängd</p>
          <p>Enhet</p>
        </div>
        {ingrediens && <>
          {ingredienser.map((item, index) => {
            return (<div key={index}>
              <p>{index}</p>
              <label>Lägg till ingredienser</label>
              <select
                value={item}
                onChange={(e) => handleChangeIngredient(e, index)}
              >
                {ingrediens.map((ingred, index) => {
                  return(<option value={ingred.namn} key={index}>{ingred.namn}</option>)
                })}
              </select>
            </div>)
          })}

        </>}

        <input type="button" value="+" onClick={() => handleAddIngredient()} />

        <label>Bild</label>
        <input
          type="file"
          id="bild"
          name="filename"
          onChange={setBild}
        />
        <label htmlFor="altText">Alt attribut</label>
        <input
          type="text"
          id="altText"
        />
      </form>
      <p> {receptNamn}</p>
    </div>
  );
}

export default CreateRecipe