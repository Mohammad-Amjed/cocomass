import React, { useEffect, useState } from 'react'
import { Link , useHistory } from 'react-router-dom'
import firebase from "firebase"
import "../css/Authintication.css"
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { auth, db } from '../backend/firebase';


function PlacedOrderAuthintication() {
    const [Type, setType] = useState("password")
    const [Icon, setIcon] = useState(false)
    const [Create, setCreate] = useState(true)
    const [Email, setEmail] = useState()
    const [Password, setPassword] = useState()
    const [Fname, setFname] = useState()
    const [Lname, setLname] = useState()
    const [User, setUser] = useState()
    const [TempBasket, setTempBasket] = useState()
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

   const history =  useHistory()
    const  signIn = async ()=>{
        if (Create){
          const credential = firebase.auth.EmailAuthProvider.credential(Email, Password);
          const currentUser = firebase.auth().currentUser;
          if (currentUser) {
            currentUser.linkAndRetrieveDataWithCredential(credential).then((userCredential) => {
              const user = userCredential.user;
              user.updateProfile({
                displayName: Fname + " " +Lname})
                console.log(user)
                db.collection("users").doc(user.uid).set({
                  code: "undefined"
              })
              console.log("Account linking success", user);
              history.push("./Orders")
            }, (error) => {
              console.log("Account linking error", error);
            })           
          }
        }else{
          const result = User && await db.collection("users").doc(User.uid).collection("basket").get();
          const items_array = [];
          result.docs.forEach((doc)=>{
            items_array.push(doc.data());
          });
          // setTempBasket(items_array);
          console.log(items_array);
        

     
        auth
        .signInWithEmailAndPassword(Email,Password)
        .then((auth)=>{
          console.log(auth.user.uid)
          const batch = db.batch();
          const userBasketColRef = db
            .collection("users")
            .doc(auth.user.uid)
            .collection("basket");
          
          items_array.forEach(item => {
            batch.set(
              userBasketColRef.doc(item.id), // <- use the item ID as the document ID
              {
                id: item.id,
                quantity: firebase.firestore.FieldValue.increment(item.quantity)
              },
              { merge: true }
            );
          });
          
          batch.commit()
            .then(() => console.log('Updated basket successfully!'),
            history.push("./Orders"))
            .catch((err) => console.error('Failed to update basket'));
          // items_array.forEach((doc)=>{
          //   db.collection("users").doc(auth.user.uid).collection("basket").add({
          //    id: doc.id,
          //    quantity: doc.quantity
          //   })
          // })

        }
          )

        .catch((e) => {
          alert(e.message);
        });
    }
    } 
    return (
        <div className="auth">
 
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

export default PlacedOrderAuthintication
