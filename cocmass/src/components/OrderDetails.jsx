import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth, db } from '../backend/firebase'
import "../css/OrderDetails.css"
import BasketItem from './BasketItem'
import OrderItem from './OrderItem'

function OrderDetails({total}) {
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
        <div className="order">
            <div className="orderDetails">
            <div className="orderDetails__detail">
                <p className="text">Subtotal</p>
                <p className="price"> {total} Dhs </p>  
            </div>
            <div className="orderDetails__detail">
            <p className="text">Shipping </p>
                <p className="price"> {30} Dhs </p>  
            </div>
            <div className="orderDetails__detail">
            <p className="text">Total</p>
                <p className="price">{total + 30} Dhs</p>  
            </div>
        </div>
        <div>
        <div className="payingMethod">
            <p to="/checkout">Payment method: Cash on delivery</p>
        </div>
 
        </div>
  
        </div>
        
    )
}

export default OrderDetails
