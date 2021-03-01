import React, { useState } from 'react'
import "../css/BasketItem.css"
function BasketItem() {
    const [quantity, setQuantity] = useState(1)
    return (
        <div className="basketItem">
            <div className="basketItem__image">
                <img src="https://images.pexels.com/photos/5847099/pexels-photo-5847099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
            </div>  
            <div className="basketItem__info">
                <div className="basketItem__info__title">  
                <h4>London Dry - 70cl</h4> 
                <div className="basketItem__info__title__price">
                        <div className="basketItem__info__title__price__left">
                        <span>Quanity</span>
                        </div>

                        <div className="basketItem__info__title__price__right">
                        <span onClick={()=>{if(quantity>1){setQuantity(quantity-1)}}}>-</span>
                        <span type="text" className="number">{quantity}</span>
                        <span onClick={()=>{setQuantity(quantity+1)}}>+</span>
                        </div>
                    </div>
                </div>
                <div className="basketItem__info__price">
                    <span>£35.00</span>
                </div>    
            </div>       
        </div>
    )
}

export default BasketItem
