import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../css/Authintication.css"
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { auth, db } from '../backend/firebase';


function Authintication() {
    const [Type, setType] = useState("password")
    const [Icon, setIcon] = useState(false)
    const [Create, setCreate] = useState(false)
    const [Email, setEmail] = useState()
    const [Password, setPassword] = useState()
    const [Fname, setFname] = useState()
    const [Lname, setLname] = useState()
    const showPassword = ()=>{
        if (Type ==="password"){
            setType("text")
            setIcon(true)
        }else{
            setType("password")
            setIcon(false)
        }
    }

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
              // ...
            })
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
        }
          )

        .catch((e) => {
          alert(e.message);
        });
    }
    } 
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
