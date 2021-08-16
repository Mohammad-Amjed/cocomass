import { forEach } from 'async'
import React from 'react'

import OrderItem from "../components/OrderItem"
import "../css/CompletedOrder.css"
import OrderDetails from './OrderDetails'


function CompletedOrder({items}) {

    return (
        <div className="completedOrder">
            <div className="completedOrder__title">
                <h4>ORDER NAECB0033208198</h4> 
                <span>Placed on Nov 17, 2020</span>
            </div>
            <div className="completedOrder__content">
                <div className="completedOrder__content__items">
               { items.items.map(item=>
                <OrderItem price={item.price} image={item.image} title={item.title} quantity={item.quantity} id={item.id} placed/> )}
                </div>
                <div className="completedOrder__content__payment">
                    <OrderDetails />
                </div>
            </div>
        </div>
    )
}

export default CompletedOrder
