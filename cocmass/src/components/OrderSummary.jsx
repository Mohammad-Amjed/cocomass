import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../backend/firebase'
import "../css/OrderSummary.css"

import firebase from "firebase/app";
import "firebase/firestore";


function OrderSummary() {

    const [items, setItems] = useState([]);
    const [updateItem, setUpdateItem] = useState()
    const [subTotal, setSubTotal] = useState([])
    const [snapshots, setSnapshots] = useState();
    const [Total, setTotal] = useState(0)
    const [TRY, setTRY] = useState()
    const [price, setPrice] = useState()
   
   
    useEffect(() => {
        db.collection("users")
          .doc("4sfrRMB5ROMxXDvmVdwL")
          .collection("basket")
          .onSnapshot((docs) => {
            let oneSubTotal = [];
            let quantityArray = [];
            let object = 0;
            let num = 0
            let id = undefined;
            let quantityPromises = [];
            docs.forEach((doc) => {
              object = doc.data();
              id = object.id;
              quantityPromises.push(db.collection("users").doc("4sfrRMB5ROMxXDvmVdwL").collection("basket").where( "id" , "==" , id).get())
             });
 
            Promise.all(quantityPromises).then((allDocumentsFromForLoop) => {
                allDocumentsFromForLoop.map((documents) => {
                    documents.forEach(async doc => {
                        quantityArray.push(doc.data().quantity) 
                       await db.collection("products").doc(doc.data().id).get().then( (e)=>{
                            doc.price =  (e.data().price);

                            oneSubTotal.push(doc.price * doc.data().quantity) 
                            setSubTotal(oneSubTotal) 
                            setTimeout(()=>{  
                                num=0
                                console.log(oneSubTotal)          
                             oneSubTotal.forEach(sub =>{
                                num+=sub                  
                        }
                        )
                    setTotal(num)
                 },0)  
                   
                        })
                    })
                });
              });
          });
      }, []);


    return (
        <div className="basket">
        <div className="orderSummary">
            <h3>Order Summary</h3>
            <div className="orderSummary__cupon">
                <form>
                    <input type="text" placeholder="Cupon code or Gift card" />
                    <button>APPLY CUPON</button>
                </form>
            </div>
            <div className="OrderSummary__subtotal">
                <div className="OrderSummary__subtotal__subtotal">
                <div className="OrderSummary__subtotal__subtotal__text">
                    <span>Subtotal (<span><span>2</span> items)</span></span>
                </div>
                <div className="OrderSummary__subtotal__subtotal__price">
                             <span>AED <span>{ Total }</span></span>
                </div>
            </div>
            <div className="OrderSummary__subtotal__shipping">
                <div className="OrderSummary__subtotal__shipping__text">
                    <span>Shipping</span>
                </div>
                <div className="OrderSummary__subtotal__shipping__price">
                    <span>AED <span>30</span></span>
                </div>
                
            </div>
        
            </div>
            <div className="OrderSummary__Total">
                <div className="OrderSummary__Total__text">
                <h3>Total </h3><small>(Inclusive of VAT)</small>
                </div>
                <div className="OrderSummary__Total__price">
                    <h3> AED <span>{Total + 30}</span></h3>
                </div>
            </div>
        </div>
        <div className="basket__button">
            <Link to="./checkOut" > Proceed to checkout</Link>
        </div>
        </div>
    )
}

export default OrderSummary

