import React, { useEffect, useState } from 'react'
import { auth, db } from '../backend/firebase';
import "../css/Orders.css"
import CompletedOrder from './CompletedOrder'
import SideBar from './SideBar';


function Orders() {
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
        User && db.collection("users").doc(User.uid).collection("info").doc("orders").collection("ordersDetails").orderBy("items", "desc").get()
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


    // ***  get from the database ***** //

    items && items.map((products) => console.log(products.items.length));

    return (
        <div className="orders">
            <div className="orders__sidebar">
                <SideBar />
            </div>
            <div className="orders__content">
                <div className="orders__content__title">
                    <h2>Orders</h2>
                    <span>See how your orders are managed and check the last status on your order</span> 
                    </div>
                    <div className="orders__content__products">
                    { items && items.map((products) => 
                
                <CompletedOrder items={products} length={products.items.length} /> )/* *** Or whatever renders ID  */}
                </div>
                
            </div>
        </div>
    )
}

export default Orders
