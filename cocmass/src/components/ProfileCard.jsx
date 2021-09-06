import Modal from 'react-modal';
import React, { useEffect, useState } from 'react'
import ChangePassword from './ChangePassword'
import { Link } from 'react-router-dom'
import { auth } from '../backend/firebase'
import "../css/ProfileCard.css"




function ProfileCard({type}) {
    const [Finput, setFinput] = useState()
    const [Linput, setLinput] = useState()
    const [User, setUser] = useState()
    const [ModalIsOpen, setModalIsOpen] = useState(false)

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            setUser(authUser)
           const name =  authUser.displayName.split(" ");
           setFinput(name[0]);
           setLinput(name[1]);
                })
            
    }, [])


    const handleSubmit = (e)=>{
        e.preventDefault();
        User.updateProfile({
            displayName: Finput + " " + Linput})
            .then(console.log("the name has been changed successfully!"))
            .catch( error => console.log(error))
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
        User ?
        <div className="profile__card">
            <div className="profile__card__title">
            {type=== "name" ? "Genaral Information" : "Security"}
             </div>

             <div className="profile__card__content">
             <div className="checkout__address__details__name">
                    <span className="checkout__address__details__name__element">
                        <label className="billing_first_name left">{type==="name" ? "First name" : "Email"}</label>
                        <span className="checkout__address__details__name__element__input">
                             <input className="checkout__address__details__info__element__input__element" type="text" placeholder="" value={type==="name" ?Finput : User.email} onChange={e=>setFinput(e.target.value)}  name="name" disabled={type==="name" ? false : true}/>
                        </span>
                   </span>
                   <span className="checkout__address__details__name__element">
                        <label className="billing_first_name left">{type==="name" ? "Last name" : "Password"}</label>
                        <span className="checkout__address__details__name__element__input">
                             <input className="checkout__address__details__info__element__input__element" type="text" placeholder=""  value={type==="name" ?Linput : "********"} onChange={e=>setLinput(e.target.value)}  name="name" disabled={type==="name" ? false : true} />
                        </span>
                   </span>
                  </div> 
                  <div className="profile__card__content__button right">
               <Link onClick={ type=== "name" ? handleSubmit : OpenModal}>{type==="name" ?"Save Changes" : "Change Password"}</Link>

                  <Modal   isOpen={ModalIsOpen} onRequestClose={closeModal} style={customStyles}>
                        <ChangePassword />
                     </Modal>
                </div>   
                 </div>  
                 
       </div>
       : <div> nothing</div>
    )
}

export default ProfileCard
