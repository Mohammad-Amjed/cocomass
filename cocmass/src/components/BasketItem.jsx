import React, { useEffect, useState } from 'react'
import "../css/BasketItem.css"

function BasketItem({ price , title , image , quantity}) {
    // const [quantity, setQuantity] = useState(1)

    return (
    
        <div className="basketItem">
            <div className="basketItem__image">
                <img src={image}/>
            </div>  
            <div className="basketItem__info">
                <div className="basketItem__info__title">  
                <h4>{title}</h4> 
                <div className="basketItem__info__title__price">
                        <div className="basketItem__info__title__price__left">
                        <span>Quanity</span>
                        </div>

                        <div className="basketItem__info__title__price__right">
                        <span >-</span>
                        <span type="text" className="number">{quantity}</span>
                        <span >+</span>
                        </div>
                    </div>
                </div>
                <div className="basketItem__info__price">
                    <span>{price} AED</span>
                </div>    
            </div>       
        </div>
    )
}

export default BasketItem
