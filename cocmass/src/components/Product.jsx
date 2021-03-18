import React from 'react'
import { Link } from 'react-router-dom'
import "../css/Product.css"

function Product({image, price , title , body1 , body2 , path}) {
  
    return (
        <div className="product">
            <div className="product__left">
                <img className="product__left__image" src={image} alt="A render of the Brunel Edition"  />
            </div>
            <div className="product__right">
                <div className="product__title"><h1>{title}</h1></div>
                <div className="product__info">
                    <p>{body1}</p>
                    <p>{body2}</p>
                    <div className="product__callToAction">
                         <Link to={path}>Buy Now</Link>
                    </div>
                </div>
        

            </div>
        </div>
    )
}

export default Product
