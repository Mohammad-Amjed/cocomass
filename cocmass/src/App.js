import React, { useEffect, useState } from 'react'
import "./App.css"
import Home from './components/Home'
import {BrowserRouter as Router , Route} from "react-router-dom"
import Product from './components/Product'
import ProductDetails from './components/ProductDetails'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import { auth, db } from './backend/firebase'
import Nav from './components/Nav'
import Orders from './components/Orders'
// import { useLocation  } from "react-router-dom";

function App() {

  const [snapshots, setSnapshots] = useState();
  useEffect(()=> {
      db.collection("products")
       .get()
       .then((snapshot) => {
        setSnapshots(snapshot.docs)            
       }
      ) 
      ; 
    
  }, []);
  // console.log(snapshots)

  return (
    <Router>
      <Nav />
      <Route path="/" exact>
        <Home />
       </Route>
       {  snapshots && snapshots.map((doc)=>(
        <Route path={doc.data().path}>
          <ProductDetails image={doc.data().image}  title={doc.data().title} body1={doc.data().body1} body2={doc.data().body2} price={doc.data().price} id={doc.data().id} />
         </Route>      
                  ))}  

       <Route path="/product-details-cake">
         <ProductDetails image="https://bramleyandgage.s3.eu-west-1.amazonaws.com/wp-content/uploads/2019/10/21075042/Brunel.png" 
         title="Brunel" 
         price="£25.00 – £232.20" 
         body1="Exquisitely Engineered 6 O’clock Gin Brunel is an export strength expression of our classic London Dry gin." 
         body2="Distilled with more juniper and 6 additional botanicals for a more complex flavour profile." />
       </Route>
       <Route path="/cart">
         <Cart />
       </Route>
       <Route path="/checkout">
         <Checkout />
       </Route>
       <Route path="/orders">
         <Orders />
       </Route>
    </Router>
  )
}

export default App
