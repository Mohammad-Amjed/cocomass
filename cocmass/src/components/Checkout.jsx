import React, { useEffect, useState } from 'react'
import emailjs from 'emailjs-com';
import { Link, useHistory } from 'react-router-dom'
import { auth, db, timestamp } from '../backend/firebase'
import "../css/Checkout.css"
import OrderDetails from './OrderDetails'
import OrderItem from './OrderItem'
import uniqid from 'uniqid';


function Checkout() {
    const initialState = ""
    const [Fname, setFname] = useState(initialState)
    const [Lname, setLname] = useState(initialState)
    const [City, setCity] = useState(initialState)
    const [ArdessOne, setArdessOne] = useState(initialState)
    const [ArdressTwo, setArdressTwo] = useState(initialState)
    const [Mobile, setMobile] = useState(initialState)
    const [items, setItems] = useState([]);
    const [updateItem, setUpdateItem] = useState()
    const [subTotal, setSubTotal] = useState([]);
    const [Total, setTotal] = useState(0);
    const [SubTotalValue, setubTotalValue] = useState(0);
    const CreatedAt = timestamp();
    const [User, setUser] = useState()
    const [id] = useState(uniqid("COSM00").toUpperCase());
    const history =  useHistory()
    const [UpdateDatebase, setUpdateDatebase] = useState(false)
    const [snapshots, setSnapshots] = useState(undefined);
    const [ToggleButton, setToggleButton] = useState(false)
    const [Class, setClass] = useState("hidden-validation")
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

                    // setTotal(num)
                        User && num && db.collection("users").doc(User.uid).get().then((doc) => {
                            db.collection("codes").doc(doc.data().code).get()
                            .then((doc) => {
                    
                                if (doc.exists) {
                                    setubTotalValue(num)
                                setTotal(num - num*doc.data().value / 100)
                                
                                }else{
                                    setTotal(num)
                                }
                            })
                        
                        })

                 },0)  
                   
                        })
                    })
                });
              });
          });
      }, [User]);

    useEffect(()=> {
        let cancelled = false;
        User && db.collection("users").doc(User.uid).collection("basket")
        .get()
        .then((snapshot) => {
            // *** Don't try to set state if we've been unmounted in the meantime
            if (!cancelled) {
               
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

    const handleSubmit = (e)=>{
        e.preventDefault();
    if(Fname != initialState && City != initialState && Lname != initialState && Mobile != initialState && ArdessOne != initialState && ArdressTwo != initialState){
       User && db.collection("users").doc(User.uid).collection("info").doc("address").set({
            Fname,
            Lname,
            City,
            ArdessOne,
            ArdressTwo,
            Mobile
        }).catch((error) => { console.log(error.message); }).then(console.log("done"))
           SubTotalValue != 0 ?  db.collection("users").doc(User.uid).collection("info").doc("orders").collection("ordersDetails").doc().set({
                subTotal : SubTotalValue,
                discount : Total - SubTotalValue,
                shipping : 30,                
                total : Total + 30,
                items,
                id,
                CreatedAt
        }).catch((error) => { console.log(error.message); }) .then(
            db.collection("users").doc(User.uid).collection("basket").get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    doc.ref.delete()
                });
                }).catch((error) => { console.log(error.message); }).then(
                    db.collection("users").doc(User.uid).set({
                        code : "undefined"
                    }), 
                  history.push("./"+ id)
                ).catch((error) => { console.log(error.message); }).then(window.location.reload())
        ).catch((error) => { console.log(error.message); }) : 
        db.collection("users").doc(User.uid).collection("info").doc("orders").collection("ordersDetails").doc().set({
            subTotal : Total,
            discount : 0,
            shipping : 30,                
            total : Total + 30,
            items,
            id,
            CreatedAt
    }).catch((error) => { console.log(error.message); }) .then(
            db.collection("users").doc(User.uid).collection("basket").get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    doc.ref.delete()
                })
                }, 
                history.push("./"+ id)).then(window.location.reload())
        ).catch((error) => { console.log(error.message); })
    //     .then(
        
    //     emailjs.sendForm('service_vfb8sdj', 'contact_form', e.target, 'user_a0kajKqW2OgKvEfUtbcxw')
    //   .then((result) => {
    //       console.log(result.text);
    //   }, (error) => {
    //       console.log(error.text);
    //   })).then(console.log("doneeeeeeeeeeeeee"))

            }else{
                setClass("validation")
              
            }
    }

    useEffect(()=> {
        let cancelled = false;
        User && db.collection("users").doc(User.uid).collection("info").doc("address").get()
        .then(   (snapshot) => {
            if (!cancelled) {
                if(snapshot.exists){
                setSnapshots(snapshot.data());
                console.log(snapshot.data().Fname)
                setFname(snapshot.data().Fname);
                setLname(snapshot.data().Lname);
                setCity(snapshot.data().City);
                setArdessOne(snapshot.data().ArdessOne);
                setArdressTwo(snapshot.data().ArdressTwo);
                setMobile(snapshot.data().Mobile);
                // *** Create `items` **once** when you get the snapshots
            }
        } if(!snapshot.exists){
            console.log("No snapshots")
            setToggleButton(true)}
        })
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
            }, [User, UpdateDatebase,]);

        

    return (
        <div className="checkout">
            <div className="checkout__address">
                <div className="checkout__address__title">
                     <h2>BILLING DETAILS</h2>
                </div>
                <small className={Class}>please fill the empty fields</small>
                <div className="checkout__address__details">
                  <div className="checkout__address__details__name">
                    <span className="checkout__address__details__name__element">
                        <label for="billing_first_name" class="">First name</label>
                        <span className="checkout__address__details__name__element__input">
                             <input className="checkout__address__details__info__element__input__element" type="text" placeholder="" value={Fname} onChange={e=>setFname(e.target.value)} name="name"/>
                        </span>
                   </span>
                   <span className="checkout__address__details__name__element">
                        <label for="billing_first_name" class="">Last name</label>
                        <span className="checkout__address__details__name__element__input">
                             <input className="checkout__address__details__info__element__input__element" type="text" placeholder="" value={Lname} onChange={e=>setLname(e.target.value)} name="email"/>
                        </span>
                   </span>
                  </div>
                    <div className="checkout__address__details__info">
                    <span className="checkout__address__details__info__element">
                        <label for="billing_first_name" class="">City</label>
                        <span className="checkout__address__details__info__element__input">
                        <select className="checkout__address__details__info__element__input__element" value={City} onChange={e=>setCity(e.target.value)} >
                        <option value="" disabled selected hidden >Choose a City</option>
                            <option value="Sharjah">Sharjah</option>
                            <option value="Dubai">Dubai</option>
                            <option value="AbuDhabi">AbuDhabi</option>
                            <option value="AlFijairah">AlFujairah</option>
                            <option value="UmAlquain">UmAlquain</option>
                            <option value="Ajman">Ajman</option>
                            <option value="Ras Alkhaimah">Ras ALkhaimah</option>
                        </select>
                        </span>
                    </span>
                    <span className="checkout__address__details__info__element">
                        <label for="billing_first_name" class="">Adreess line 1</label>
                        <span className="checkout__address__details__info__element__input">
                             <input className="checkout__address__details__info__element__input__element" type="text" placeholder="" value={ArdessOne} onChange={e=>setArdessOne(e.target.value)}/>
                        </span>
                    </span>
                    <span className="checkout__address__details__info__element">
                        <label for="billing_first_name" class="">Adreess line 2</label>
                        <span className="checkout__address__details__info__element__input">
                             <input className="checkout__address__details__info__element__input__element" type="text" placeholder="" value={ArdressTwo} onChange={e=>setArdressTwo(e.target.value)} />
                        </span>
                    </span>
                    <span className="checkout__address__details__info__element">
                        <label for="billing_first_name" class="">Mobile</label>
                        <span className="checkout__address__details__info__element__input">
                             <input className="checkout__address__details__info__element__input__element" type="text" placeholder="" value={Mobile} onChange={e=>setMobile(e.target.value)}/>
                        </span>
                    </span>
                    </div>
                </div>
                <div className="yourOrder">
                <h3>Your Order</h3>
                { items && items.map((item) => 
     
     <OrderItem price={item.price} image={item.image} title={item.title} quantity={item.quantity} id={item.id}/> )/* *** Or whatever renders ID  */}
                </div>
            </div>
            <div className="checkout__placeOrder">
                {console.log(items)}
                <div className="checkout__placeOrder__OrderDetails">
                    <OrderDetails subTotal={Total} total={Total + 30} shipping={30} />
                 </div>
                 <div className=" checkout__placeOrder basket__button">
                    <Link onClick={handleSubmit}> Place Order</Link>
                </div>
            </div>
            
        </div>
    )
}

export default Checkout