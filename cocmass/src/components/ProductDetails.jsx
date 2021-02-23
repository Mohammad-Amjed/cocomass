import React, { useState } from 'react'
import "../css/ProductDetails.css"

function ProductDetails() {
    const [quantity, setQuantity] = useState(1)
    return (
        <div className="productDetails">
            <div className="productDetails__left"><img className="product__left__image" src="https://bramleyandgage.s3.eu-west-1.amazonaws.com/wp-content/uploads/2019/10/21075042/Brunel.png" alt="A render of the Brunel Edition"  /></div>
            <div className="productDetails__right">
                <div className="productDetails__right__title">
                    <h2>Brunel</h2>
                </div>
                <div className="productDetails__right__price">
                    <h2>£25.00 – £232.20</h2>
                </div>
                <div className="productDetails__right__info">
                    <p>Exquisitely Engineered 6 O’clock Gin Brunel is an export strength expression of our classic London Dry gin.</p>
                    <p>Distilled with more juniper and 6 additional botanicals for a more complex flavour profile.</p>
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
