import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../backend/firebase'
import "../css/Cart.css"
import BasketItem from './BasketItem'
import OrderSummary from './OrderSummary'

function Cart() {
    const [snapshots, setSnapshots] = useState();
    useEffect(()=> {
        db.collection("users").doc("4sfrRMB5ROMxXDvmVdwL").collection("basket")
         .get()
         .then((snapshot) => {
          setSnapshots(snapshot.docs)            
         }
        ) 
        
        ; 
  
    }, []);

   
    let item = ""
   
    return (
        <div className="cart">
            <div className="cart__items">
                <div className="cart__items__title">
                    <h3>Shoping Basket</h3>
                </div>
                <div className="cart__items__item">
             {
                       snapshots && snapshots.map((doc)=>(
                         
                        db.collection("products").doc(doc.data().id).get().then(function(e){
                               console.log(e.data().image)
                           } ),
                           <BasketItem />
                           
                           ))
                  
             }
                   
                
                </div>
                <div className="cart__items__continueShopping">
                <Link to="/checkout">Continue Shopping</Link>
                </div>
            </div>
            <div className="cart__total">
               <OrderSummary />
            </div>
        </div>
    )
}

export default Cart
