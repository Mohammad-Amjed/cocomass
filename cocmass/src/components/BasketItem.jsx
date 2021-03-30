import React, { useEffect, useState } from 'react'
import { db } from '../backend/firebase';
import "../css/BasketItem.css"

function BasketItem({ price , title , image , quantity , id}) {
    const [totalQuantity, setTotalQuantity] = useState(quantity)
    const refId = db.collection("users").doc("4sfrRMB5ROMxXDvmVdwL").collection("basket").where( "id" , "==" , id);
    const decrement = ()=>{
        refId.get().then(
            (querySnapshot)=> {
                querySnapshot.forEach(function(doc) {
                    doc.ref.update({
                        "quantity": totalQuantity - 1,

                      
                      }).then(setTotalQuantity(totalQuantity - 1))
                });
                }
         )
    }
    const increment = ()=>{   
             refId.get().then(
                (querySnapshot)=> {
                    querySnapshot.forEach(function(doc) {
                        doc.ref.update({
                            "quantity": totalQuantity + 1,

                          
                          }).then(setTotalQuantity(totalQuantity + 1))
                    });
                    }
             )}

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
                        <span onClick={decrement} >-</span>
                        <span type="text" className="number">{totalQuantity}</span>
                        <span onClick={increment} >+</span>
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
