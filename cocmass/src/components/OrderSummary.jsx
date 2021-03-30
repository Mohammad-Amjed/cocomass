import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../backend/firebase'
import "../css/OrderSummary.css"


function OrderSummary() {
    const oneSubTotal = [];
    const [items, setItems] = useState([]);
    const [updateItem, setUpdateItem] = useState()
    const [subTotal, setSubTotal] = useState([])
    const [snapshots, setSnapshots] = useState();
    const [Total, setTotal] = useState(0)
    const [TRY, setTRY] = useState()
    let array = []
    useEffect(() => {
       
        db.collection("users").doc("4sfrRMB5ROMxXDvmVdwL").collection("basket").onSnapshot((docs) => {
            let item = docs.forEach(doc => doc.data());
            // setItems(item)
            // console.log(item)
            docs.forEach(doc =>{
                console.log("Current data: ", doc.data());
                array.push(doc.data())
                console.log(array)
                setItems(array)
                

                
            
            })
        
    });
             

    }, [])
    
    useEffect(()=> {
        let cancelled = false;
        db.collection("users").doc("4sfrRMB5ROMxXDvmVdwL").collection("basket")
        .get()
        .then((snapshot) => {
            // *** Don't try to set state if we've been unmounted in the meantime
            if (!cancelled) {
                setSnapshots(snapshot.docs);
                // *** Create `items` **once** when you get the snapshots
                // setItems(snapshot.docs.map(doc => doc.data()));
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

    useEffect(() => {
       items && items.forEach((item) => {
            console.log(item)
            const id = item.id
              db.collection("products").doc(id).get().then( (e)=>{
                item.price =  (e.data().price);
              oneSubTotal.push(item.price * item.quantity)    
              setSubTotal(oneSubTotal)      
             })
            setUpdateItem(item)
            
                             })
    

        }, [items])
        let sum = 0;
        // useEffect(() => {
        
            for (let num of subTotal){
            
                sum = sum + num
                console.log(sum)
            }
            useEffect(() => {
                setTotal(sum)
            }, [sum , items])
           
        const click = ()=>{
            setTotal(Total + 1)
        }
 
     
        console.log(subTotal)
        console.log(Total)
    return (
        <div className="basket">
        <div className="orderSummary">
            <h3>Order Summary</h3>
            <div className="orderSummary__cupon">
                <form>
                    <input type="text" placeholder="Cupon code or Gift card" />
                    <button>APPLY CUPON</button>
                </form>
            </div>
            <div className="OrderSummary__subtotal">
                <div className="OrderSummary__subtotal__subtotal">
                <div className="OrderSummary__subtotal__subtotal__text">
                    <span>Subtotal (<span><span>2</span> items)</span></span>
                </div>
                <div className="OrderSummary__subtotal__subtotal__price">
                    {console.log(items)}
                    <span>AED <span>{"" + Total + ""}</span></span>
                </div>
            </div>
            <div className="OrderSummary__subtotal__shipping">
                <div className="OrderSummary__subtotal__shipping__text">
                    <span>Shipping</span>
                </div>
                <div className="OrderSummary__subtotal__shipping__price">
                    <span>AED <span>10</span></span>
                </div>
                
            </div>
        
            </div>
            <div className="OrderSummary__Total">
                <div className="OrderSummary__Total__text">
                <h3>Total </h3><small>(Inclusive of VAT)</small>
                </div>
                <div className="OrderSummary__Total__price">
                    <h3> AED <span>60 </span></h3>
                </div>
            </div>
        </div>
        <div className="basket__button">
            <Link  onClick={click}> Proceed to checkout</Link>
        </div>
        </div>
    )
}

export default OrderSummary
