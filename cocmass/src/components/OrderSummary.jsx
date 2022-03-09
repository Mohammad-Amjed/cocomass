import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal';
import { auth, db } from '../backend/firebase'
import "../css/OrderSummary.css"

import firebase from "firebase/app";
import "firebase/firestore";
import Authintication from './Authintication';


function OrderSummary() {

    const [items, setItems] = useState([]);
    const [Coupon, setCoupon] = useState()
    const [updateItem, setUpdateItem] = useState()
    const [subTotal, setSubTotal] = useState([])
    const [snapshots, setSnapshots] = useState();
    const [Total, setTotal] = useState(0)
    const [DiscountValue, SetDiscountValue] = useState(0)
    const [TRY, setTRY] = useState()
    const [price, setPrice] = useState()
    const [User, setUser] = useState()
    const [prevented, setPrevented] = useState(0)
    const [disabled, setDisabled] = useState(false)
    const [ModalIsOpen, setModalIsOpen] = useState(false)
    useEffect(() => {
      auth.onAuthStateChanged((authUser) => {
         
          setUser(authUser)
      })
     
  }, [])
   
   
    useEffect(() => {
       User && db.collection("users")
          .doc(User.uid)
          .collection("basket")
          .onSnapshot((docs) => {
            let oneSubTotal = [];
            let quantityArray = [];
            let object = 0;
            let num = 0
            let id = undefined;
            let quantityPromises = [];
            docs.forEach((doc) => {
              object = doc.data();
              id = object.id;
              quantityPromises.push(db.collection("users").doc(User.uid).collection("basket").where( "id" , "==" , id).get())
             });
 
            Promise.all(quantityPromises).then((allDocumentsFromForLoop) => {
                allDocumentsFromForLoop.map((documents) => {
                    documents.forEach(async doc => {
                        quantityArray.push(doc.data().quantity) 
                       await db.collection("products").doc(doc.data().id).get().then( (e)=>{
                            doc.price =  (e.data().price);

                            oneSubTotal.push(doc.price * doc.data().quantity) 
                            setSubTotal(oneSubTotal) 
                            setTimeout(()=>{  
                                num=0
                                console.log(oneSubTotal)          
                             oneSubTotal.forEach(sub =>{
                                num+=sub                  
                        }
                        )
                   
                        
                        
                            db.collection("codes").doc(Coupon).get()
                            .then((doc) => {
                    
                                if (doc.exists) {
                                  console.log(doc.data().value)
                                  setTotal((num * doc.data().value)/100)
                                }else{
                                    setTotal(num)
                                }
                              })
                      

                      
                 },0)  
                        }) 
                    })
                  
                });
                
              });
              setPrice(num)
          });
      }, [User,price]);
      
      useEffect(() => {
            
        User && db.collection("users").doc(User.uid).get()
            
            .then((doc) => {
               console.log(doc.data.code)
                if (doc.data().code != "undefined") {
                     
                    setDisabled(true)
                    setCoupon(doc.data().code)
                    db.collection("codes").doc(doc.data().code).get()
                    .then((doc) => {
            
                        if (doc.exists) {
        
                        SetDiscountValue((Total * doc.data().value)/100)
    
                        }
                      })
                   
                }
              })
      }, [User,Total])

      const applyCoupon = event => {
        event.preventDefault(); 
        db.collection("codes").doc(document.getElementById("coupon").value).get()
        .then((doc) => {

            if (doc.exists) {
               setCoupon(document.getElementById("coupon").value)
               db.collection("users").doc(User.uid).set({
                   code : document.getElementById("coupon").value
               })

               db.collection("codes").doc(document.getElementById("coupon").value).get()
               .then((doc) => {
       
                   if (doc.exists) {
                     console.log(doc.data().value)
                     SetDiscountValue((Total * doc.data().value)/100)
                   }
                 })

            }
        else{
            console.log("no")
        }})      
    
      };
 
      const removeCoupon = event =>{
        event.preventDefault(); 
        db.collection("users").doc(User.uid).set({
            code : "undefined"
        }).then(
            SetDiscountValue(0),
            setCoupon(),
            setDisabled(false),
            document.getElementById("coupon").value = ""
        )

      }

      const OpenModal = ()=> {
        setModalIsOpen(true)

    }
        const closeModal = ()=> {
        setModalIsOpen(false)
    }

    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          padding               : "0",
          borderRadius          : "10px"
        },
        overlay: {zIndex: 1000}
      };
    
    return (
        <div className="basket">
        <div className="orderSummary">
            <h3>Order Summary</h3>
            <div className="orderSummary__cupon">
                <form>
                    <input id="coupon" type="text"style={ Coupon &&{ cursor: "pointer"}} placeholder={!Coupon ? "Cupon code or Gift card" : Coupon} value={Coupon} disabled={disabled} />
                    <button onClick={!Coupon ? applyCoupon : removeCoupon}>{!Coupon ? "APPLY CUPON" : "Remove coupon"}</button>
                </form>
            </div>
            <div className="OrderSummary__subtotal">
                <div className="OrderSummary__subtotal__subtotal">
                <div className="OrderSummary__subtotal__subtotal__text">
                    <span>Subtotal (<span><span>2</span> items)</span></span>
                </div>
                <div className="OrderSummary__subtotal__subtotal__price">
                             <span>AED <span>{Total}</span></span>
                </div>
            </div>
            {DiscountValue > 0 && <div className="OrderSummary__subtotal__discount">
                <div className="OrderSummary__subtotal__discount__text">
                    <span>Discount</span>
                </div>
                <div className="OrderSummary__subtotal__discount__price">
                    <span>- AED <span>{DiscountValue}</span></span>
                </div>
                
            </div>}
            <div className="OrderSummary__subtotal__shipping">
                <div className="OrderSummary__subtotal__shipping__text">
                    <span>Shipping</span>
                </div>
                <div className="OrderSummary__subtotal__shipping__price">
                    <span>AED <span>30</span></span>
                </div>
                
            </div>
        
            </div>
            <div className="OrderSummary__Total">
                <div className="OrderSummary__Total__text">
                <h3>Total </h3><small>(Inclusive of VAT)</small>
                </div>
                <div className="OrderSummary__Total__price">
                    <h3> AED <span>{ Total - DiscountValue + 30}</span></h3>
                </div>
            </div>
        </div>
        <div className="basket__button">
            {/* <Link to="./checkOut" > Proceed to checkout</Link> */}
            {User && User.isAnonymous ?  <Link onClick={OpenModal} > Proceed to checkout</Link> :<Link to="./checkOut" > Proceed to checkout</Link>  }
            <Modal   isOpen={ModalIsOpen} onRequestClose={closeModal} style={customStyles}>
                        <Authintication AuthPage="OrderSummary"/>
                     </Modal>
        </div>
        </div>
    )
}

export default OrderSummary

