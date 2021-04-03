import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../backend/firebase'
import "../css/OrderDetails.css"
import BasketItem from './BasketItem'
import OrderItem from './OrderItem'

function OrderDetails() {
    const [subTotal, setSubTotal] = useState([]);
    const [Total, setTotal] = useState(0);
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
        <div className="order">
            <div className="orderDetails">
            <div className="orderDetails__detail">
                <p className="text">Subtotal</p>
                <p className="price"> {Total} Dhs </p>  
            </div>
            <div className="orderDetails__detail">
            <p className="text">Shipping </p>
                <p className="price"> {30} Dhs </p>  
            </div>
            <div className="orderDetails__detail">
            <p className="text">Total</p>
                <p className="price">{Total + 30} Dhs</p>  
            </div>
        </div>
        <div>
        <div className="payingMethod">
            <p to="/checkout">Payment method: Cash on delivery</p>
        </div>
        <div className="basket__button">
            <Link to="/checkout"> Place Order</Link>
        </div>
        </div>
  
        </div>
        
    )
}

export default OrderDetails
