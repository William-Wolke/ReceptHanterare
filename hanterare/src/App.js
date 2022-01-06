import React from 'react';
import Recipe from './components/recipe';
import RecipeList from './components/recipeList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MyForm from './components/createRecipe';
import css from './components/style.css';

function App() {
  return (
    <Router>
      <div className="App">


        <div className="content">
          <Routes>

            <Route exact path="/" element={(<div> <Recipe /> <RecipeList /> </div>)} />
            <Route path="create/*" element={(<MyForm />)} />
              
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
