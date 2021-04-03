import React, { useState } from 'react'
import { db } from '../backend/firebase';
import "../css/OrderItem.css"

function OrderItem({ price , title , image , quantity , id}) {


    return (
        <div className="orderItem">
        <div className="orderItem__image">
        <img src={image}/>
        </div>  
        <div className="orderItem__info">
            <div className="orderItem__info__title">  
               <h4>{title}</h4>        
            <div className="orderItem__info__title__price">
                    <div className="orderItem__info__title__price__left">
                    <span>Quanity</span>
                    </div>

                    <div className="orderItem__info__title__price__right">
              
                    <span type="text" className="number">{quantity}</span>
               
                    </div>
                </div>
            </div>
            <div className="orderItem__info__price">
                <span>{price} AED</span>
            </div>    
        </div>       
    </div>
    )
}

export default OrderItem
