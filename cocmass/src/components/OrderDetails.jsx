import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth, db } from '../backend/firebase'
import "../css/OrderDetails.css"
import "../css/CompleteOrderDetails.css"
import BasketItem from './BasketItem'
import OrderItem from './OrderItem'

function OrderDetails({total ,subTotal, shipping, discount, complete, length}) {
    let margin;
    let bottomMargin;
    if( length ===1) {
        margin =13;
        bottomMargin =9;
    }else if (length ===2) { 
        margin =20;
        bottomMargin =30;
    }else {
        margin = 43;
        bottomMargin= 47.5;
    }
    console.log("the length is " +  length)
    // const [Total, setTotal] = useState(total)

    // const [User, setUser] = useState()
    // useEffect(() => {
    //   auth.onAuthStateChanged((authUser) => {
         
    //       setUser(authUser)
    //   })
     
    // }, [])
    // useEffect(() => {
    //     User && total && db.collection("users").doc(User.uid).get().then((doc) => {
    //         db.collection("codes").doc(doc.data().code).get()
    //         .then((doc) => {
    
    //             if (doc.exists) {
              
    //              setTotal(total*doc.data().value / 100)
                   
    //             }else{
    //                 setTotal(total)
    //             }
    //           })
          
    //     })

    // }, [User,total])
    return (
        <div className={!complete ? "order" : "completeOrder"}>
           { complete && <div id="completeOrder__title" style={{marginBottom: bottomMargin+ "px"}}>
               <h4>Order Summary</h4></div>}
            <div className={!complete ? "orderDetails" : "completeOrderDetails"}>
            <div className={!complete ? "orderDetails__detail" : "completeOrder__detail"} style={complete && {marginBottom: margin+ "px"}}>
                <p className={!complete ? "text" : "completeText"}>Subtotal</p>
                <p className={!complete ? "price" : "completePrice"}> {subTotal} Dhs </p>  
            </div>
         {complete &&  <div className={!complete ? "orderDetails__detail" : "completeOrder__detail"}  style={{marginBottom: margin+ "px"}}>
            <p className={!complete ? "text" : "completeText"}>Discount </p>
                <p className={!complete ? "price" : "completePrice"}> {discount} Dhs </p>  
            </div>}
            <div className={!complete ? "orderDetails__detail" : "completeOrder__detail"}  style={complete &&{marginBottom: margin+ "px"}}>
            <p className={!complete ? "text" : "completeText"}>Shipping </p>
                <p className={!complete ? "price" : "completePrice"}> {shipping} Dhs </p>  
            </div>
            <div className={!complete ? "orderDetails__detail" : "completeOrder__detail"}  style={complete &&{marginBottom: margin+ "px"}}>
            <p className={!complete ? "text" : "completeText"}>Total</p>
                <p className={!complete ? "price" : "completePrice"}>{total} Dhs</p>  
            </div>
        </div>
        <div>
        <div className={!complete ? "payingMethod" : "completePayingMethod"}>
            <p to="/checkout">Payment method: Cash on delivery</p>
        </div>
 
        </div>
  
        </div>
        
    )
}

export default OrderDetails
