import React from 'react'
import { Link } from 'react-router-dom'
import "../css/PlacedOrder.css"
import CompletedOrder from './CompletedOrder'
function PlacedOrder({products}) {
        console.log(products)
        return (
                <div className="PlacedOrder"> 
                        <div className="PlacedOrder__emailConfirmation">
                        <div className="PlacedOrder__emailConfirmation__text">
                           <h3>THANK YOU FOR YOUR ORDER MOHAMMAD!</h3>
                           <p>You will recive a confirmation email shortly.</p>
                        </div>
                        <div className="PlacedOrder__emailConfirmation__link">
                                <Link to="/">Continue Shopping </Link>
                         </div>
                        </div>

                        <div className="PlacedOrder__products orders__content__products ">
                                { products && <CompletedOrder items={products} length={products.items.length} />}
                           </div> 
                
                </div>
        )
}

export default PlacedOrder
