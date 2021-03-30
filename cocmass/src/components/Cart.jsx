import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../backend/firebase'
import "../css/Cart.css"
import BasketItem from './BasketItem'
import OrderSummary from './OrderSummary'

function Cart() {
    
    const [snapshots, setSnapshots] = useState();
    const [items, setItems] = useState([]);
    const [updateItem, setUpdateItem] = useState()
    const [subTotal, setSubTotal] = useState([])
    const [prevSubTotal, setPrevSubTotal] = useState(0)
    const oneSubTotal = [];
  
    useEffect(()=> {
        let cancelled = false;
        db.collection("users").doc("4sfrRMB5ROMxXDvmVdwL").collection("basket")
        .get()
        .then((snapshot) => {
            // *** Don't try to set state if we've been unmounted in the meantime
            if (!cancelled) {
                setSnapshots(snapshot.docs);
                // *** Create `items` **once** when you get the snapshots
                setItems(snapshot.docs.map(doc => doc.data()));
            }
        })
        // *** You need to catch and handle rejections
        .catch(error => {
            console.log(error)
        });
        return () => {
            // *** The component has been unmounted. If you can proactively cancel
            // the outstanding DB operation here, that would be best practice.
            // This sets a flag so that it definitely doesn't try to update an
            // unmounted component, either because A) You can't cancel the DB
            // operation, and/or B) You can, but the cancellation occurred *just*
            // at the wrong time to prevent the promise fulfillment callback from
            // being queued. (E.g., you need it even if you can cancel.)
            cancelled = true;
        };
    }, []);


    // ***  get from the database ***** //

    console.log(items)
    

useEffect(() => {
    items.forEach(async(item) => {
        
        const id = item.id
         await db.collection("products").doc(id).get().then( (e)=>{
          item.image =  (e.data().image);
          item.title =  (e.data().title);
          item.price =  (e.data().price); 
        //   setPrevSubTotal(subTotal) 
        //   oneSubTotal.push(item.price * item.quantity)    
        //   setSubTotal(oneSubTotal)      
         })
        setUpdateItem(item)
        
                         })


    }, [items])
    // console.log(subTotal)
   
    
             
    return (
        <div className="cart">
            <div className="cart__items">
                <div className="cart__items__title">
                    <h3>Shoping Basket</h3>
                </div>
                <div className="cart__items__item">
     { items && items.map((item) => 
     
     <BasketItem price={item.price} image={item.image} title={item.title} quantity={item.quantity} id={item.id}/> )/* *** Or whatever renders ID  */}
</div>
                <div className="cart__items__continueShopping">
                <Link to="/checkout">Continue Shopping</Link>
                </div>
            </div>
            <div className="cart__total">
               <OrderSummary />
            </div>
        </div>
    )
}

export default Cart



           
