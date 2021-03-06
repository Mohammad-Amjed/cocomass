import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal';
import "../css/Nav.css"
import { auth, db } from '../backend/firebase';
import Authintication from './Authintication';


function Nav() {
    const [ToggleHeight, setToggleHeight] = useState()
    const [ModalIsOpen, setModalIsOpen] = useState(false)
    const [User, setUser] = useState()
    const [Basket, setBasket] = useState(0)
    
    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            setUser(authUser)
            setModalIsOpen(false)
        })
       
    }, [])

    useEffect(() => {
        
        User && db.collection("users")
        .doc(User.uid)
        .collection("basket")
        .onSnapshot((docs) => {
            let basketCount = 0
            docs.forEach((doc) =>{basketCount = basketCount + doc.data().quantity})
            setBasket(basketCount)
        })
        
    }, [User])
    const toggle = ()=>{
        if (ToggleHeight === "toggle"){
            setToggleHeight(undefined)
            console.log(ToggleHeight)
        }else{
            setToggleHeight("toggle")
            console.log(ToggleHeight)
        }
    }
    const OpenModal = ()=> {
        setModalIsOpen(true)
        setToggleHeight(undefined)
    }
    const closeModal = ()=> {
      setModalIsOpen(false)
  }
    const logout = ()=> {
      auth.signOut().then(() => {
          console.log("success")
          window.location.reload();
        }).catch((error) => {
          // An error happened.
        });
        
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
        <div className="nav">
        <nav  className="nav__navContent">
            <div className="nav__navContent__logo">
                <Link  to="/"><h1>cocomass</h1></Link>
            </div>
            <div className={"nav__navContent__links__container " + ToggleHeight}>
            <div className="nav__navContent__links">
                <ul  className="nm-menu">
                    <li id="menu-item-11908" className="listItem"><span>our story</span></li>
                    <li id="menu-item-11908"className="listItem"><span>Tours &</span> experiences</li>
                    <li id="menu-item-11908" className="listItem">Coctails</li>
                    <li id="menu-item-11908" className="listItem">Shop</li>
                    <li id="menu-item-11908" className="listItem">News</li>
              
                </ul>
            </div>
            <div className="nav__navContent__userInfo">
                <ul id="nm-main-menu-ul" className="nm-menu">
                {User ?   <li className="logIn" onClick={logout}>
                    Log out
                    </li> :   <li className="logIn" onClick={OpenModal}>
                        Log In
                    </li>}
                    <Modal   isOpen={ModalIsOpen} onRequestClose={closeModal} style={customStyles}>
                        <Authintication />
                     </Modal>
                    </ul>
                    </div>
 
                    </div>
                    <div className="nav__navContent__userInfo">
                    <ul >
                    <li id="menu-item-11908" className="basket"><Link to="/cart">Basket </Link>{Basket}</li>
                    </ul>
                   
                  </div>
                  <div className="nav__navContent__burger" onClick={toggle}>
                      <span className="nav__navContent__burger__line"></span>
                      <span className="nav__navContent__burger__line"></span>
                      <span className="nav__navContent__burger__line"></span>
                  </div>
         </nav>
        </div>
    )
}

export default Nav
