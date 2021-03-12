import React from 'react'
import { Link } from 'react-router-dom'
import "../css/Checkout.css"
import OrderDetails from './OrderDetails'
import OrderItem from './OrderItem'


function Checkout() {
    return (
        <div className="checkout">
            <div className="checkout__address">
                <div className="checkout__address__title">
                     <h2>BILLING DETAILS</h2>
                </div>
                <div className="checkout__address__details">
                  <div className="checkout__address__details__name">
                    <span className="checkout__address__details__name__element">
                        <label for="billing_first_name" class="">First name</label>
                        <span className="checkout__address__details__name__element__input">
                             <input className="checkout__address__details__info__element__input__element" type="text" placeholder="" />
                        </span>
                   </span>
                   <span className="checkout__address__details__name__element">
                        <label for="billing_first_name" class="">Last name</label>
                        <span className="checkout__address__details__name__element__input">
                             <input className="checkout__address__details__info__element__input__element" type="text" placeholder="" />
                        </span>
                   </span>
                  </div>
                    <div className="checkout__address__details__info">
                    <span className="checkout__address__details__info__element">
                        <label for="billing_first_name" class="">City</label>
                        <span className="checkout__address__details__info__element__input">
                        <select className="checkout__address__details__info__element__input__element" >
                        <option value="" disabled selected hidden>Choose a City</option>
                            <option value="saab">Sharjah</option>
                            <option value="opel">Dubai</option>
                            <option value="audi">AbuDhabi</option>
                            <option value="opel">AlFujairah</option>
                            <option value="audi">UmAlquain</option>
                            <option value="opel">Ajman</option>
                            <option value="audi">Ras ALkhaimah</option>
                        </select>
                        </span>
                    </span>
                    <span className="checkout__address__details__info__element">
                        <label for="billing_first_name" class="">Adreess line 1</label>
                        <span className="checkout__address__details__info__element__input">
                             <input className="checkout__address__details__info__element__input__element" type="text" placeholder="" />
                        </span>
                    </span>
                    <span className="checkout__address__details__info__element">
                        <label for="billing_first_name" class="">Adreess line 2</label>
                        <span className="checkout__address__details__info__element__input">
                             <input className="checkout__address__details__info__element__input__element" type="text" placeholder="" />
                        </span>
                    </span>
                    <span className="checkout__address__details__info__element">
                        <label for="billing_first_name" class="">Mobile</label>
                        <span className="checkout__address__details__info__element__input">
                             <input className="checkout__address__details__info__element__input__element" type="text" placeholder="" />
                        </span>
                    </span>
                    </div>
                </div>
                <div className="yourOrder">
                <h3>Your Order</h3>
                    <OrderItem />
                    <OrderItem />
                </div>
            </div>
            <div className="checkout__placeOrder">
                 <OrderDetails />
            </div>
        </div>
    )
}

export default Checkout
