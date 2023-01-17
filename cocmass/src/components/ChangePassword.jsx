import React, { useEffect, useState } from 'react'
import "../css/ChangePassword.css"
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { reauthenticateWithCredential } from "firebase/auth";
import { auth } from '../backend/firebase';
function ChangePassword() {
        const [OldPassword, setOldPassword] = useState();
        const [NewPassword, setNewPassword] = useState();
        const [OldPasswordType, setOldPasswordType] = useState("password")
        const [NewPasswordType, setNewPasswordType] = useState("password")
        const [OldPasswordIcon, setOldPasswordIcon] = useState(false)
        const [NewPasswordIcon, setNewPasswordIcon] = useState(false)
        const [User, setUser] = useState()
        
        useEffect(() => {
                auth.onAuthStateChanged((authUser) => {
                    setUser(authUser)
                        })
                    
            }, [])
        const showOldPassword = ()=>{
                if (OldPasswordType ==="password"){
                    setOldPasswordType("text")
                    setOldPasswordIcon(true)
                }else{
                    setOldPasswordType("password")
                    setOldPasswordIcon(false)
                }
            }
            
        const showNewPassword = ()=>{
                if (NewPasswordType ==="password"){
                    setNewPasswordType("text")
                    setNewPasswordIcon(true)
                }else{
                    setNewPasswordType("password")
                    setNewPasswordIcon(false)
                }
            }
            
        // Reauthenticates the current user and returns a promise...
        const reauthenticate = (OldPassword) => {
                auth
                .signInWithEmailAndPassword(User.email,OldPassword)
                .then((auth)=>{
                  console.log(auth.user.uid)
                }
                  )
        }

        // Changes user's password...
        const onChangePasswordPress = () => {
                auth
                .signInWithEmailAndPassword(User.email,OldPassword)
                .then((auth)=>{
                  console.log(auth.user.uid)
                }
                  ).then(() => {
                User.updatePassword(NewPassword).then(() => {
                alert("Password was changed");
                window.location.reload();
                }).catch((error) => { alert(error.message); });
                }).catch((error) => { alert(error.message) });
        }
                        
        return (
                <div className="changePassword">

            <div className="auth__login">
                <h2 className="auth__login__callToAction">Change Password</h2> 
                <div className="auth__login__credentials">
                <div className="auth__login__credentials__feild password">
                        <label>Old Password</label>
                        <input type={OldPasswordType} value={OldPassword} onChange={e=>setOldPassword(e.target.value)}></input>
                       <button  className="auth__login__credentials__feilds__showPass" onClick={showOldPassword}> {OldPasswordIcon ? <VisibilityIcon /> : <VisibilityOffIcon />}</button>

                    </div>
                    <div className="auth__login__credentials__feild password">
                        <label> New Password</label>
                        <input type={NewPasswordType} value={NewPassword} onChange={e=>setNewPassword(e.target.value)}></input>
                       <button  className="auth__login__credentials__feilds__showPass" onClick={showNewPassword}> {NewPasswordIcon ? <VisibilityIcon /> : <VisibilityOffIcon />}</button>
                    </div>
                    </div>             
            </div>
            <div className="auth__login__signIn">
                <button className="auth__login__signIn__click" onClick={onChangePasswordPress} >Change password</button>
            </div>
 
      </div>
        )
}

export default ChangePassword
