import React from 'react'
import "../css/OrderSummary.css"

function OrderSummary() {
    return (
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
                    <span>Subtotal <span><span>2</span> items</span></span>
                </div>
                <div className="OrderSummary__subtotal__subtotal__price">
                    <span>AED <span>50</span></span>
                </div>
            </div>
            <div className="OrderSummary__subtotal__shipping">
                <div className="OrderSummary__subtotal__shipping__text">
                    <span>Subtotal</span>
                </div>
                <div className="OrderSummary__subtotal__shipping__price">
                    <span>AED <span>10</span></span>
                </div>
            </div>

            </div>
        </div>
    )
}

export default OrderSummary
