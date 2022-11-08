import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Recipe from './pages/Recipe.jsx';
import RecipeList from './pages/RecipeList';
import CreateRecipe from './pages/CreateRecipe.jsx';
import Navbar from './components/Navbar.jsx';
import CreateIngredient from './pages/CreateIngredient.jsx';
import CreateMenu from './pages/CreateMenu.jsx';
import MenuList from './pages/MenuList.jsx';
import Menu from './pages/Menu.jsx';
import './components/css/style.css';
import './components/css/theme.css';

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

            <Route exact path='/menu/:year/:week' element={( <Menu />)} />

            <Route exact path="/skapaVeckomeny" element={( <CreateMenu /> )} />

            <Route path="*" element={( <div></div> )} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
