import React, { useEffect, useState } from 'react'
import { auth, db } from '../backend/firebase';
import "../css/BasketItem.css"

function BasketItem({ price , title , image , quantity , id}) {
    const [totalQuantity, setTotalQuantity] = useState(quantity)
    const [User, setUser] = useState()
    useEffect(() => {
      auth.onAuthStateChanged((authUser) => {
         
          setUser(authUser)
      })
     
  }, [])
    const refId =User &&  db.collection("users").doc(User.uid).collection("basket").where( "id" , "==" , id);
    const decrement = ()=>{
       User && refId.get().then(
            (querySnapshot)=> {
                querySnapshot.forEach(function(doc) {
                    doc.ref.update({
                        "quantity": totalQuantity - 1,

                      
                      }).then(setTotalQuantity(totalQuantity - 1)
                      
                      )
                });
                }
         )
    }
    const increment = ()=>{   
            User && refId.get().then(
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
