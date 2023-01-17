import React, { useState, useEffect } from 'react'
import { Link , useHistory } from 'react-router-dom'
import "../css/Authintication.css"
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import firebase from "firebase"
import { auth, db } from '../backend/firebase';


function Authintication({AuthPage}) {
    
    const [Type, setType] = useState("password")
    const [Icon, setIcon] = useState(false)
    const [Create, setCreate] = useState(false)
    const [Email, setEmail] = useState()
    const [Coupon, setCoupon] = useState()
    const [Password, setPassword] = useState()
    const [Fname, setFname] = useState()
    const [Lname, setLname] = useState()
    const [items, setItems] = useState();
    const [User, setUser] = useState()
    const [Locked, setLocked] = useState(false)
    const [Uid, setUid] = useState()
    const [Class, setClass] = useState("hidden-validation")
    const history =  useHistory()
    useEffect(() => {
      auth.onAuthStateChanged((authUser) => {
         
          setUser(authUser)
      })
     
  }, [])
    const showPassword = ()=>{
        if (Type ==="password"){
            setType("text")
            setIcon(true)
        }else{
            setType("password")
            setIcon(false)
        }
    }

    useEffect(()=> {
      let cancelled = false;
      User && User.isAnonymous && db.collection("users").doc(User.uid).collection("basket").get()
      .then(   (snapshot) => {
          // *** Don't try to set state if we've been unmounted in the meantime
          if (!cancelled) {
      
              // *** Create `items` **once** when you get the snapshots
              setItems(snapshot.docs.map(doc => doc.data()));
              console.log(Uid)

          }
      })
      .then(

        User  && !Locked && db.collection("users").doc(User.uid).get()
    
        .then((doc) => {
           console.log(doc.data().code)
            if (doc.data().code !== "undefined") {
                  setCoupon(doc.data().code)
                  console.log("noooooooooooooooooooooooooooo")
            }else{
              setCoupon("undefined")
              console.log("yaaaaaaaaaaaaaaaaaaaaaaaa")
            }
          }).then(setLocked(true))
      )
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
    const  CouponsignIn   = ()=>{
      
        if (Create){

          if(Email, Password, Fname, Lname){
            Coupon &&
              auth
              .createUserWithEmailAndPassword(Email, Password)
              .then((auth) => {
                // Signed in 
                            
                  auth.user.updateProfile({
                    displayName: Fname + " " +Lname})
                    console.log(auth.user)
                    db.collection("users").doc(auth.user.uid).set({
                      code: Coupon
                    
                  })
                  setUid(auth.user.uid)
                // ...
              })
              .catch((error) => {
                alert(error.message)
                // ..
              });

          }else{
            setClass("validation")
          
        }
        }else{
              if(Email, Password){
              Coupon &&
            auth
            .signInWithEmailAndPassword(Email,Password)
            .then((auth)=>{
              console.log(auth.user.uid)
              db.collection("users").doc(auth.user.uid).set({
                code: Coupon
            })
            setUid(auth.user.uid)
            }
              )

            .catch((e) => {
              alert(e.message);
            });
        }else{
          setClass("validation")
        
      }
      }
    } 

    const  signIn   = ()=>{
      
      if (Create){

        if(Email, Password, Fname, Lname){
         
            auth
            .createUserWithEmailAndPassword(Email, Password)
            .then((auth) => {
              // Signed in 
                          
                auth.user.updateProfile({
                  displayName: Fname + " " +Lname})
                  console.log(auth.user)
                  db.collection("users").doc(auth.user.uid).set({
                    code: "undefined"
                  
                })
                setUid(auth.user.uid)
              // ...
            })
            .catch((error) => {
              alert(error.message)
              // ..
            });

        }else{
          setClass("validation")
        
      }
      }else{
            if(Email, Password){
          
          auth
          .signInWithEmailAndPassword(Email,Password)
          .then((auth)=>{
            console.log(auth.user.uid)

          setUid(auth.user.uid)
          }
            )

          .catch((e) => {
            alert(e.message);
          });
      }else{
        setClass("validation")
      
    }
    }
  } 
    useEffect(() => {
      
     Uid && items && Coupon &&
     
     items.forEach(item=>
      
         Uid &&  db.collection("users").doc(Uid).collection("basket").where( "id" , "==" , item.id)
          .get().then(function(querySnapshot) {
            if (querySnapshot.empty) {
                console.log('no documents found');
                db.collection("users").doc(Uid).collection("basket").add({
                  id : item.id,
                  quantity : item.quantity
              })
              // .then(
              //   db.collection("users").doc(Uid).set({
              //     code: Coupon
                 
              // })
              // )
              .then(console.log("doneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"),
              AuthPage && history.push("./checkOut")) 
                          
            }
             else {
              querySnapshot.forEach(
                (doc) =>{ 
                  doc.ref.set({
                    quantity : firebase.firestore.FieldValue.increment(item.quantity)
                  }, { merge: true })
                  // .then(
                  //   db.collection("users").doc(Uid).set({
                  //     code: Coupon
                     
                  // })
                  // )
                  .then(console.log("doneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"),
                  AuthPage && history.push("./checkOut")

                  )  // 👈
                }
              )

                   
            }
        })
        )
 
      }, [items,Uid])

    return (
        <div className="auth">
            {/* <div className="auth__image">
            <img classNa
            me="auth__image__img" src="https://images.pexels.com/photos/6036018/pexels-photo-6036018.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt />
            </div> */}
            {AuthPage === "OrderSummary" && <div className="auth__guest">
              <div className="auth__guest__title">
                <span>Go to check out</span>
                </div>
            <Link to="./checkOut" >Contiue as a guest</Link>
            </div>}
            <div className="auth__login">
               {!Create && <h2 className="auth__login__welcome">Welcome Back!</h2>}
                <h2 className="auth__login__callToAction">{ !Create ? "Sign in  to your account" : "Create an account"}</h2> 
                {!Create ? <h6 className="auth__login__ask">Don't have an account? <Link className="auth__login__ask__link" onClick={()=>setCreate(true)}>Create a new account</Link></h6> :<h6 className="auth__login__ask">Already have an account?<Link className="auth__login__ask__link" onClick={()=>setCreate(false)}>Sign in</Link></h6> }
                <div className="auth__login__credentials">
                <small className={Class}>please fill the empty fields</small>
                    <div className="auth__login__credentials__feild">
                        <label>Email</label>
                        <input type="email"value={Email} onChange={e=>setEmail(e.target.value)} ></input>
                    </div>
                    <div className="auth__login__credentials__feild password">
                        <label>Password</label>
                        <input type={Type} value={Password} onChange={e=>setPassword(e.target.value)}></input>
                       <button  className="auth__login__credentials__feilds__showPass" onClick={showPassword}> {Icon ? <VisibilityIcon /> : <VisibilityOffIcon />}</button>
                        
                       
                    </div>
                    {Create &&<div className="auth__login__credentials__feild">
                        <label>First Name</label>
                        <input type="text"value={Fname} onChange={e=>setFname(e.target.value)} ></input>
                    </div>}
                   {Create && <div className="auth__login__credentials__feild">
                        <label>Last Name</label>
                        <input type="text"value={Lname} onChange={e=>setLname(e.target.value)} ></input>
                    </div>}
                    </div>  
                    <h6 className="auth__login__ask forgotPass"><Link className="auth__login__ask__link">Forgot your password?</Link></h6>            
            </div>
            <div className="auth__login__signIn">
                <button className="auth__login__signIn__click" onClick={!AuthPage ? signIn :CouponsignIn }>{Create ? "Sign up" : "Sign in"}</button>
            </div>
        </div>
    )
}

export default Authintication
