import React from 'react';
import Recipe from './components/Recipe';
import RecipeList from './components/RecipeList';
import CreateRecipe from './components/CreateRecipe';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import css from './components/style.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <div className="content">
          <Routes>

            <Route exact path="/" element={(<div></div>)} />
            <Route exact path="/allaRecept" element={(<div><RecipeList /> </div>)} />
            <Route exact path="/recept/:namn" element={(<div><Recipe /> </div>)} />
            <Route path="/skapaRecept" element={(<CreateRecipe />)} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
