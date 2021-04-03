import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../backend/firebase'
import "../css/OrderDetails.css"
import BasketItem from './BasketItem'
import OrderItem from './OrderItem'

function OrderDetails({total}) {

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
