import { forEach } from 'async'
import React from 'react'

import OrderItem from "../components/OrderItem"
import "../css/CompletedOrder.css"
import OrderDetails from './OrderDetails'


function CompletedOrder({items , length}) {
console.log(items.subTotal)
const options = {year: 'numeric', month: 'long', day: 'numeric' };
    return (
        <div className="completedOrder">
            <div className="completedOrder__wrap">
            <div className="completedOrder__title">
                <h4>ORDER {items.id}</h4> 
                <span>Placed on {items.CreatedAt.toDate().toLocaleDateString(undefined, options)}</span>
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
