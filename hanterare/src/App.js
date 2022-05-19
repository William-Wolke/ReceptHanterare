import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Recipe from './components/Recipe';
import RecipeList from './components/RecipeList';
import CreateRecipe from './components/CreateRecipe';
import Navbar from './components/Navbar';
import CreateIngredient from './components/CreateIngredient';
import CreateMenu from './components/CreateMenu';
import MenuList from './components/MenuList';
import css from './components/css/style.css';
import theme from './components/css/theme.css';





function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <div className="content">
          <Routes>

            <Route exact path="/" element={(<div></div>)} />

            <Route exact path="/allaRecept" element={( <RecipeList /> )} />

            <Route exact path="/recept/:name" element={( <Recipe /> )} />

            <Route exact path="/skapaRecept" element={( <CreateRecipe /> )} />

            <Route exact path="/skapaIngrediens" element={( <CreateIngredient /> )} />

            <Route exact path="/veckoMenyer" element={( <MenuList /> )} />

            <Route exact path="/skapaVeckomeny" element={( <CreateMenu /> )} />

            <Route path="*" element={( <div></div> )} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
