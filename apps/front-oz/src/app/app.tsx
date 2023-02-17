import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import Recipes from './containers/Recipes/recipes';
import Home from './containers/Home/Home';
import Ingredients from './containers/Ingredients/Ingredients';
import FontStyles from 'src/assets/fontStyles';
import { IGetRecipe, EntityType, RecipeType } from './utils/interfaces';

export function App() {
  const [pageState, setPageState] = useState<'list' | 'form'>('list');
  const [selectedRecipe, setSelectedRecipe] = React.useState<IGetRecipe>({
    recipeId: -1,
    name: '',
    images: [{ entityId: -1, entityType: EntityType.RECIPE, url: '' }],
    bookmarked: false,
    steps: '',
    quantity: 0,
    type: RecipeType.DRINK,
    author: '',
    tags: [''],
    ingredients: [],
  });
  const [filterUser, setFilterUser] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<RecipeType>(RecipeType.DRINK);

  return (
    <>
      <FontStyles />
      <Toaster />
      <Router>
        <Header setPageState={setPageState} selectedRecipe={selectedRecipe} setSelectedRecipe={setSelectedRecipe} setFilterUser={setFilterUser} setFilterType={setFilterType} />
        <Routes>
          <Route key="ingredients" path={'/ingredients'} element={<Ingredients pageState={pageState} setPageState={setPageState} />} />
          <Route
            key="recipes"
            path={'/recipes'}
            element={
              <Recipes
                pageState={pageState}
                setPageState={setPageState}
                selectedRecipe={selectedRecipe}
                setSelectedRecipe={setSelectedRecipe}
                filterUser={filterUser}
                filterType={filterType}
              />
            }
          />
          <Route path="*" key="default-error" element={<Home />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
