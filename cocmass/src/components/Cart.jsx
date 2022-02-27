import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth, db } from '../backend/firebase'
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
    const [User, setUser] = useState()
    useEffect(() => {
      auth.onAuthStateChanged((authUser) => {
         
          setUser(authUser)
      })
     
  }, [])
  
    useEffect(()=> {
        let cancelled = false;
       User && db.collection("users").doc(User.uid).collection("basket")
        .onSnapshot(   (snapshot) => {
            // *** Don't try to set state if we've been unmounted in the meantime
            if (!cancelled) {
                setSnapshots(snapshot.docs);
                // *** Create `items` **once** when you get the snapshots
                setItems(snapshot.docs.map(doc => doc.data()));
                console.log(items)
            }
        })
     
        // *** You need to catch and handle rejections
        // .catch(error => {
        //     console.log(error)
        // });
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
    }, [User]);


    // ***  get from the database ***** //

    // console.log(items)
    

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
        // console.log(item.price)
                         })


    }, [items])
    // console.log(subTotal)
   
    
             
    return (
        <div>
        {items.length !== 0 ? <div className="cart">
            <div className="cart__items">
                <div className="cart__items__title">
                    <h3>Shoping Basket (Cant read "code" of undefined)</h3>
                </div>
                <div className="cart__items__item">
     { items && items.map((item) => 
     
     <BasketItem price={item.price} image={item.image} title={item.title} quantity={item.quantity} id={item.id}/> )/* *** Or whatever renders ID  */}
</div>
                <div className="cart__items__continueShopping">
                <Link to="/">Continue Shopping</Link>
                </div>
            </div>
            <div className="cart__total">
               <OrderSummary />
            </div>
        </div> : <div className="cart empty"><h1>Your Shopping Basket is empty</h1>
        <div className="cart__items__continueShopping">
                <Link to="/">Continue Shopping</Link>
                </div>
        </div>}
        </div>
    )
}

export default Cart



           
