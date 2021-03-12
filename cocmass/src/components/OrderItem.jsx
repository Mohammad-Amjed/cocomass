import React, { useState } from 'react'
import "../css/OrderItem.css"

function OrderItem() {
    const [quantity, setQuantity] = useState(1)
    return (
        <div className="orderItem">
        <div className="orderItem__image">
            <img src="https://images.pexels.com/photos/5847099/pexels-photo-5847099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
        </div>  
        <div className="orderItem__info">
            <div className="orderItem__info__title">  
            <h4>London Dry - 70cl</h4> 
            <div className="orderItem__info__title__price">
                    <div className="orderItem__info__title__price__left">
                    <span>Quanity</span>
                    </div>

                    <div className="orderItem__info__title__price__right">
                    <span onClick={()=>{if(quantity>1){setQuantity(quantity-1)}}}>-</span>
                    <span type="text" className="number">{quantity}</span>
                    <span onClick={()=>{setQuantity(quantity+1)}}>+</span>
                    </div>
                </div>
            </div>
            <div className="orderItem__info__price">
                <span>£35.00</span>
            </div>    
        </div>       
    </div>
    )
}

export default OrderItem
