import React from 'react'
import { Link } from 'react-router-dom'
import "../css/Product.css"

function Product() {
    return (
        <div className="product">
            <div className="product__left">
                <img className="product__left__image" src="https://bramleyandgage.s3.eu-west-1.amazonaws.com/wp-content/uploads/2019/10/21075042/Brunel.png" alt="A render of the Brunel Edition"  />
            </div>
            <div className="product__right">
                <div className="product__title"><h1>Brunel Edition</h1></div>
                <div className="product__info">
                    <p>With a 50% ABV, this is the ‘export strength’ expression of our multi-award-winning, strikingly smooth London Dry Gin.</p>
                    <p>A giant of a gin!Exquisitely engineered for a more complex flavour profile, we’ve added extra juniper and introduced six new botanicals – green cardamom, nutmeg, cumin, cassia bark, cubeb pepper and lemon – for a bolder, richer flavour; an earthy sweetness combines  with citrus freshness for a dry spicy finish</p>
                    <div className="product__callToAction">
                         <Link to="/product-details">Buy Now</Link>
                    </div>
                </div>
        

            </div>
        </div>
    )
}

export default Product
