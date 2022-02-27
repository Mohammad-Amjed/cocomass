import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "../css/Authintication.css"
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import firebase from "firebase"
import { auth, db } from '../backend/firebase';


function Authintication() {
    const [Type, setType] = useState("password")
    const [Icon, setIcon] = useState(false)
    const [Create, setCreate] = useState(false)
    const [Email, setEmail] = useState()
    const [Password, setPassword] = useState()
    const [Fname, setFname] = useState()
    const [Lname, setLname] = useState()
    const [items, setItems] = useState();
    const [User, setUser] = useState()
    const [Uid, setUid] = useState()
    const [Locked, setLocked] = useState(true)
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
    const  signIn = ()=>{
        if (Create){
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
            }).then(setLocked(false))
            .catch((error) => {
              console.log(error.message)
              // ..
            });
        }else{
        auth
        .signInWithEmailAndPassword(Email,Password)
        .then((auth)=>{
          console.log(auth.user.uid)
          db.collection("users").doc(auth.user.uid).set({
            code: "undefined"
        })
        setUid(auth.user.uid)
        }
          ).then(setLocked(false))

        .catch((e) => {
          alert(e.message);
        });
    }
    } 

    useEffect(() => {
      const batch = db.batch();
     !Locked && User && Uid && items &&
     
    //  items.forEach(item => {
    //   batch.set(
    //     db.collection("users").doc(Uid).collection("basket").doc(item.id), // <- use the item ID as the document ID
    //     {
    //       id: item.id,
    //       quantity: firebase.firestore.FieldValue.increment(item.quantity)
    //     },
    //     { merge: true }
    //   )
    // });
     

     
     items.forEach(item=>
      
      User && db.collection("users").doc(Uid).collection("basket").add({
        id : item.id,
        quantity : item.quantity
    }, {merge: true})
    .then(setLocked(true))
     )
 
     
    
      }, [items, User,Locked,Uid])
    return (
        <div className="auth">
            {/* <div className="auth__image">
            <img className="auth__image__img" src="https://images.pexels.com/photos/6036018/pexels-photo-6036018.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt />
            </div> */}
            <div className="auth__login">
               {!Create && <h2 className="auth__login__welcome">Welcome Back!</h2>}
                <h2 className="auth__login__callToAction">{ !Create ? "Sign in  to your account" : "Create an account"}</h2> 
                {!Create ? <h6 className="auth__login__ask">Don't have an account? <Link className="auth__login__ask__link" onClick={()=>setCreate(true)}>Create a new account</Link></h6> :<h6 className="auth__login__ask">Already have an account?<Link className="auth__login__ask__link" onClick={()=>setCreate(false)}>Sign in</Link></h6> }
                <div className="auth__login__credentials">
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
                <button className="auth__login__signIn__click" onClick={signIn}>{Create ? "Sign up" : "Sign in"}</button>
            </div>
        </div>
    )
}

export default Authintication
