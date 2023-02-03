import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import Recipes from './containers/Recipes/recipes';
import Home from './containers/Home/Home';
import Ingredients from './containers/Ingredients/Ingredients';
import FontStyles from 'src/assets/fontStyles';

export function App() {
  return (
    <>
      <FontStyles/>      
      <Toaster />
      <Router>
        <Header />
        <Routes>
          <Route
            key="ingredients"
            path={'/ingredients'}
            element={<Ingredients />}
          />
          <Route key="recipes" path={'/recipes'} element={<Recipes />} />
          <Route path="*" key="default-error" element={<Home />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
