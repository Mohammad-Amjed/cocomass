import React from 'react'
import { Link } from 'react-router-dom'
import "../css/Cart.css"
import BasketItem from './BasketItem'
import OrderSummary from './OrderSummary'

function Cart() {
    return (
        <div className="cart">
            <div className="cart__items">
                <div className="cart__items__title">
                    <h3>Shoping Basket</h3>
                </div>
                <div className="cart__items__item">
                    <BasketItem />
                    <BasketItem />
                    <BasketItem />
                    <BasketItem />
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
