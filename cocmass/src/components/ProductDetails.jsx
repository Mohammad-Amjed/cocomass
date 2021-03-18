import React, { useState } from 'react'
// import { useStateValue } from '../backend/Stateprovider';
import "../css/ProductDetails.css"
import { useHistory, Link } from "react-router-dom";

function ProductDetails({id, title, image, body1,body2, price}) {
    const [quantity, setQuantity] = useState(1)
    // const [{ basket }, dispatch] = useStateValue();
    const history = useHistory();

    // const addToBasket = ()=> {
    //     console.log({id, title, image, rating, price, route})
    //     dispatch({
    //         type: "ADD_TO_BASKET",
    //         item: {
    //           id: "id",
    //           title: "title",
    //           price: "price",
    //           image: "image",
    //           rating: "rating",
    //         },
           
    //       }); 
    //       history.push("./cart");
    // }
    // console.log(basket)
    return (
        <div className="productDetails">
            <div className="productDetails__left"><img className="product__left__image" src={image} alt="A render of the Brunel Edition"  /></div>
            <div className="productDetails__right">
                <div className="productDetails__right__container">
                <div className="productDetails__right__title">
                    <h2>{title}</h2>
                </div>
                <div className="productDetails__right__price">
                    <h2>{price}</h2>
                </div>
                
                <div className="productDetails__right__info">
                    <p>{body1}</p>
                    <p>{body2}</p>
                </div>
                </div>
                <div className="productDetails__right__checkout">
                    <div className="productDetails__right__checkout__quantity">
                        <div className="productDetails__right__checkout__quantity__left">
                        <span>Quanity</span>
                        </div>

                        <div className="productDetails__right__checkout__quantity__right">
                        <span onClick={()=>{if(quantity>1){setQuantity(quantity-1)}}}>-</span>
                        <span type="text" className="number">{quantity}</span>
                        <span onClick={()=>{setQuantity(quantity+1)}}>+</span>
                        </div>
                    </div>
                    <div className="productDetails__right__checkout__button">
                        <button className="addToBasket">add to basket</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
