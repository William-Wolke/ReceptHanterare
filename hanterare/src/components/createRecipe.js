import { useState } from "react";

const CreateRecipe = () => {

  const [receptNamn, setReceptNamn] = useState('');
  const [beskrivning, setBeskrivning] = useState('');
  const [ingrediens, setIngrediens] = useState('hej');
  const [bild, setBild] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const recept = {
      namn: receptNamn,

    }
  }

  return(
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

          <label>Ingrediens</label>
          <select
            value={ ingrediens }
            onChange={(e) => setIngrediens(e.target.value)}
          >
            <option value="hej"></option>
            <option value="då"></option>
          </select>

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
      <p> { receptNamn }</p>
    </div>
  );
}

export default CreateRecipe