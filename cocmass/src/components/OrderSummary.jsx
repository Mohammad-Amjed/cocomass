import React from 'react'
import { Link } from 'react-router-dom'
import "../css/OrderSummary.css"

function OrderSummary({subTotal}) {
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
                    <span>AED <span>{subTotal}</span></span>
                </div>
            </div>
            <div className="OrderSummary__subtotal__shipping">
                <div className="OrderSummary__subtotal__shipping__text">
                    <span>Shipping</span>
                </div>
                <div className="OrderSummary__subtotal__shipping__price">
                    <span>AED <span>10</span></span>
                </div>
                
            </div>
        
            </div>
            <div className="OrderSummary__Total">
                <div className="OrderSummary__Total__text">
                <h3>Total </h3><small>(Inclusive of VAT)</small>
                </div>
                <div className="OrderSummary__Total__price">
                    <h3> AED <span>60 </span></h3>
                </div>
            </div>
        </div>
        <div className="basket__button">
            <Link to="/checkout"> Proceed to checkout</Link>
        </div>
        </div>
    )
}

export default OrderSummary
