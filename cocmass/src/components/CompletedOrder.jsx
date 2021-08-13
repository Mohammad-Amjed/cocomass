import { forEach } from 'async'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../backend/firebase'
import OrderItem from "../components/OrderItem"
import "../css/CompletedOrder.css"


function CompletedOrder() {
    const [User, setUser] = useState()
    const [items, setItems] = useState([]);
    const [snapshots, setSnapshots] = useState();

    useEffect(() => {
      auth.onAuthStateChanged((authUser) => {
         
          setUser(authUser)
      })
     
  }, [])
    useEffect(()=> {
        let cancelled = false;
        User && db.collection("users").doc(User.uid).collection("info").doc("orders").collection("ordersDetails").get()
        .then(   (snapshot) => {
            // *** Don't try to set state if we've been unmounted in the meantime
            if (!cancelled) {
                setSnapshots(snapshot.docs);
                // *** Create `items` **once** when you get the snapshots
                setItems(snapshot.docs.map(doc => doc.data()));
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

   items && items.map(doc=>{
       
        console.log(doc.price)
    })
    return (
        <div className="completedOrder">
            <div className="completedOrder__title">
                <h4>ORDER NAECB0033208198</h4> 
                <span>Placed on Nov 17, 2020</span>
            </div>
            <div className="completedOrder__content">
               {  items.map((item) => 
              
                <OrderItem price={item.price} image={item.image} title={item.title} quantity={item.quantity} id={item.id} placed/> )/* *** Or whatever renders ID  */}
            </div>
        </div>
    )
}

export default CompletedOrder
