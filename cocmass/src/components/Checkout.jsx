import React from 'react'
import { Link } from 'react-router-dom'
import "../css/Checkout.css"


function Checkout() {
    return (
        <div className="checkout">
            <div className="checkout__address">
                <div className="checkout__address__title">
                     <h2>BILLING DETAILS</h2>
                </div>
            </div>
            <div className="checkout__placeOrder">
                Place order
            </div>
        </div>
    )
}

export default Checkout
