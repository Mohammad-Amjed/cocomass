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
import Address from './components/Address'
import Profile from './components/Profile'
import PlacedOrder from './components/PlacedOrder'
// import { useLocation  } from "react-router-dom";

function App() {

  const [snapshots, setSnapshots] = useState();
  const [completedSnapshots, setCompletedSnapshots] = useState();
  const [User, setUser] = useState()
  const [items, setItems] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
       
        setUser(authUser)
    })
   
}, [])
  useEffect(()=> {
      let cancelled = false;
      User && db.collection("users").doc(User.uid).collection("info").doc("orders").collection("ordersDetails").orderBy("items", "desc").get()
      .then(   (snapshot) => {
          if (!cancelled) {
            setCompletedSnapshots(snapshot.docs);
              setItems(snapshot.docs.map(doc => doc.data()));
          }
      })
 
      .catch(error => {
          console.log(error)
      });
      return () => {
          cancelled = true;
      };
  }, [User]);


  items && items.map((products) => console.log(products.id));

  useEffect(()=> {
      db.collection("products")
       .get()
       .then((snapshot) => {
        setSnapshots(snapshot.docs)            
       }
      ) 
      ; 
    
  }, []);
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
       { items && items.map((products) => (
            <Route path={"/" + products.id}>
            <PlacedOrder products={products} />
           </Route> 
       ))
      } 

       <Route path="/cart">
         <Cart />
       </Route>
       <Route path="/checkout">
         <Checkout />
       </Route>
       <Route path="/orders">
         <Orders />
       </Route>
       <Route path="/address">
         <Address />
       </Route>
        <Route path="/profile">
          <Profile />
          </Route>
          <Route path="/done">
          <PlacedOrder />
          </Route>
    </Router>
  )
}

export default App
