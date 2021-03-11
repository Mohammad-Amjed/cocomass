import React from 'react'
import { Link } from 'react-router-dom'
import "../css/OrderDetails.css"

function OrderDetails() {
    return (
        <div className="order">
            <div className="orderDetails">
            <div className="orderDetails__detail">
                <p className="text">Subtotal</p>
                <p className="price"> 45 Dhs </p>  
            </div>
            <div className="orderDetails__detail">
            <p className="text">Shipping </p>
                <p className="price"> 10 Dhs </p>  
            </div>
            <div className="orderDetails__detail">
            <p className="text">Total</p>
                <p className="price">55 Dhs</p>  
            </div>
        </div>
        <div>
        <div className="payingMethod">
            <p to="/checkout">Paying method: Cash of delivery</p>
        </div>
        <div className="basket__button">
            <Link to="/checkout"> Proceed to checkout</Link>
        </div>
        </div>
        </div>
        
    )
}

export default OrderDetails
