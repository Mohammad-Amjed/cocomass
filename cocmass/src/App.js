import React from 'react'
import "./App.css"
import Home from './components/Home'
import {BrowserRouter as Router , Route} from "react-router-dom"
import Product from './components/Product'
import ProductDetails from './components/ProductDetails'

function App() {
  return (
    <Router>
      <Route path="/" exact>
        <Home />
       </Route>
       <Route path="/product-details">
         <ProductDetails />
       </Route>
    </Router>
  )
}

export default App
