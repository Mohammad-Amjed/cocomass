import { forEach } from 'async'
import React from 'react'

import OrderItem from "../components/OrderItem"
import "../css/CompletedOrder.css"
import OrderDetails from './OrderDetails'


function CompletedOrder({items , length}) {
console.log(items.subTotal)
    return (
        <div className="completedOrder">
            <div className="completedOrder__wrap">
            <div className="completedOrder__title">
                <h4>ORDER NAECB0033208198</h4> 
                <span>Placed on Nov 17, 2020</span>
            </div>
            <div className="completedOrder__content">
                <div className="completedOrder__content__items">
               { items.items.map(item=>
                <OrderItem price={item.price} image={item.image} title={item.title} quantity={item.quantity} id={item.id} placed/> )}
                </div>
            </div>
            </div>
            <div className="completedOrder__payment">
                    <OrderDetails complete length={length} total={items.total} subTotal={items.subTotal} discount={items.discount} shipping={items.shipping}/>
                </div>
        </div>
    )
}

export default CompletedOrder
