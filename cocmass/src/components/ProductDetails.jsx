import React, { useEffect, useState } from 'react'
import DoneIcon from '@material-ui/icons/Done';
import "../css/ProductDetails.css"
import { auth, db } from '../backend/firebase';

function ProductDetails({id, title, image, body1,body2, price}) {
    const [quantity, setQuantity] = useState(1)
    const [Prev, setPrev] = useState(0)
    const [PrevQuantity, setPrevQuantity] = useState()
    const [IsDisabled, setIsDisabled] = useState(false)
    const [Confirm, setConfirm] = useState(false)
    const [User, setUser] = useState()
    
    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
           
            setUser(authUser)
        })
       
    }, [])

    
    var isAdded = 0
    var prevQuantity = null
    const refId =  User && db.collection("users").doc(User.uid).collection("basket").where( "id" , "==" , id);

    User && refId.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            isAdded ++
           setPrev(isAdded)
         });
        });
    
        console.log(Prev);

  const updateBasket = (User)=>{
//    the && operator is most likley useless 
    const refId =  User && db.collection("users").doc(User.uid).collection("basket").where( "id" , "==" , id);
    User && console.log(User)
       
  

    User && refId.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            
            prevQuantity = doc.data().quantity;
            console.log(prevQuantity)
            setPrevQuantity(prevQuantity)
            

                
    if (Prev === 1) {
    refId.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            doc.ref.update({
                "quantity": prevQuantity + quantity,
              
              })
        });
        }).then(
            setIsDisabled(false),
            setConfirm(true)
           
        );
 }
            
        });
        });


            
   


   if (Prev === 0 ) {
    User && db.collection("users").doc(User.uid).collection("basket").add({
        id,
        quantity
    }).then(

       ()=>{ refId.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                isAdded ++
               setPrev(isAdded)
             });
            }).then(
                setIsDisabled(false),
                setConfirm(true)
            );
            console.log(Prev);
            
        }

    ) 

 }
  }

    const addToBasket = ()=> {
        setIsDisabled(true)
        setConfirm(false)
   
                  if (!User) {
                  auth.signInAnonymously()
                .then((auth) => {
                  console.log("done")
                  console.log(auth.user)
                  setUser(auth.user)
                  console.log(User)
                  updateBasket(auth.user)
                   
                }).then(setConfirm(true))
                .catch((error) => {
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  // ...
                });
                  } else {
                    console.log("already signed in")
                    updateBasket(User)
                                    }
       
        
        // console.log(isAdded)

    // else if (Prev === 1) {
    //     refId.get().then(function(querySnapshot) {
    //         querySnapshot.forEach(function(doc) {
    //             doc.ref.update({
    //                 "quantity": 123,
                  
    //               })
    //         });
    //         });
    //  }
    //  if (Prev === 1){
    //     setIsDisabled(false)
    //     console.log(IsDisabled)
    //         }
        }

    // // const [{ basket }, dispatch] = useStateValue();
    // const history = useHistory();

    // const addToBasket = ()=> {
    //     console.log({id, title, image, rating, price, route})
    //     dispatch({
    //         type: "ADD_TO_BASKET",
    //         item: {
    //           id: "id",
    //           title: "title",
    //           price: "price",
    //           image: "image",
    //           rating: "rating",
    //         },
           
    //       }); 
    //       history.push("./cart");
    // }
    // console.log(basket)
    return (
        <div className="productDetails">
            <div className="productDetails__left"><img className="product__left__image" src={image} alt="A render of the Brunel Edition"  /></div>
            <div className="productDetails__right">
                <div className="productDetails__right__container">
                <div className="productDetails__right__title">
                    <h2>{title}</h2>
                </div>
                <div className="productDetails__right__price">
                    <h2>{price} AED</h2>
                </div>
                
                <div className="productDetails__right__info">
                    <p>{body1}</p>
                    <p>{body2}</p>
                </div>
                </div>
                <div className="productDetails__right__checkout">
                 { Confirm && <div className="productDetails__right__checkout__confirm"><span><DoneIcon /></span>{title} has been successfully added to the basket</div> }
                    <div className="productDetails__right__checkout__quantity">
                        
                        <div className="productDetails__right__checkout__quantity__left">
                        <span>Quanity</span>
                        </div>

                        <div className="productDetails__right__checkout__quantity__right">
                        <span onClick={()=>{if(quantity>1){setQuantity(quantity-1)}}}>-</span>
                        <span type="text" className="number">{quantity}</span>
                        <span onClick={()=>{setQuantity(quantity+1)}}>+</span>
                        </div>
                    </div>
                    <div className="productDetails__right__checkout__button">
                        <button className="addToBasket" onClick={addToBasket} disabled={IsDisabled}>
                          { IsDisabled ? <div id="wave">
                                    <span class="dot"></span>
                                    <span class="dot"></span>
                                    <span class="dot"></span>
                             </div> : "add To Basket"}
                    </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
