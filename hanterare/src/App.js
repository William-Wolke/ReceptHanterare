import React from 'react';
import Recipe from './components/recipe';
import RecipeList from './components/recipeList';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MyForm from './components/createRecipe';
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
            <Route path="create" element={(<MyForm />)} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
