import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../css/Authintication.css"
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { auth } from '../backend/firebase';


function Authintication() {
    const [Type, setType] = useState("password")
    const [Icon, setIcon] = useState(false)
    const [Email, setEmail] = useState()
    const [Password, setPassword] = useState()
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
        auth
        .signInWithEmailAndPassword(Email,Password)
        .then((auth) => {
          auth.user.updateProfile({
            displayName: "Name",})
          console.log(auth.user.uid);
  
        })
        .catch((e) => {
          alert(e.message);
        });
    } 
    return (
        <div className="auth">
            {/* <div className="auth__image">
            <img className="auth__image__img" src="https://images.pexels.com/photos/6036018/pexels-photo-6036018.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt />
            </div> */}
            <div className="auth__login">
                <h2 className="auth__login__welcome">Welcome Back!</h2>
                <h2 className="auth__login__callToAction">Sign in  to your account</h2> 
                <h6 className="auth__login__ask">Don't have an account? <Link className="auth__login__ask__link">Create a new account</Link></h6>
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
                    </div>  
                    <h6 className="auth__login__ask forgotPass"><Link className="auth__login__ask__link">Forgot your password?</Link></h6>            
            </div>
            <div className="auth__login__signIn">
                <button className="auth__login__signIn__click" onClick={signIn}>Sign in</button>
            </div>
        </div>
    )
}

export default Authintication
