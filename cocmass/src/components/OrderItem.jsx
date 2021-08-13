import React, { useState } from 'react'
import { db } from '../backend/firebase';
import "../css/OrderItem.css"


function OrderItem({ price , title , image , quantity , id , placed}) {


    return (
        <div className="orderItem">
        <div className="orderItem__image">
        <img src={image}/>
        </div>  
        <div className="orderItem__info">
            <div className="orderItem__info__title">  
               <h4>{title}</h4>        
            <div className="orderItem__info__title__quantity" style={placed && {paddingTop: "0"}}>
                    <div className="orderItem__info__title__quantity__left">
                    <span>Quanity</span>
                    </div>

                    <div className="orderItem__info__title__quantity__right">
              
                    <span type="text" className="number">{quantity}</span>
                    </div>
                </div>
               {placed && <div className="orderItem__info__title__price__status">
                    <h5 style={{color: "green"}}>Delivered</h5>  
                    </div>}
            </div>
            <div className="orderItem__info__price">
                <span>{price} AED</span>
            </div>    
        </div>       
    </div>
    )
}

export default OrderItem
