import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import DnsOutlinedIcon from '@material-ui/icons/DnsOutlined';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Modal from 'react-modal';
import "../css/Nav.css"
import { auth, db } from '../backend/firebase';
import Authintication from './Authintication';


function Nav() {
    const [ToggleHeight, setToggleHeight] = useState()
    const [ToggleClassName, setToggleClassName] = useState("hideNav") 
    const [ModalIsOpen, setModalIsOpen] = useState(false)
    const [User, setUser] = useState()
    const [Basket, setBasket] = useState(0)
    const history = useHistory();
    
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

  const showClassName = () => {
      setToggleClassName("showNav")
  }
  const hideClassName = () => {
    setToggleClassName("hideNav")
}
    const logout = ()=> {
      auth.signOut().then(() => {
          console.log("success")
          history.push("/")
          window.location.reload();
        }).catch((error) => {
          // An error happened.
        });
        
    }
    // const hide = ToggleClassName === "showNav" ? document.querySelector("html") : document.querySelector(".toggleDropdown") ; 
   
    //     ToggleClassName === "showNav" && hide.addEventListener("click",  hideClassName);
    //     ToggleClassName === "hideNav" && hide.addEventListener("click",  showClassName);
    
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
                {User && !User.isAnonymous ?
                 <div class="dropdown">
                        <li className="logIn toggleDropdown dropbtn" onClick={ToggleClassName === "hideNav" ? showClassName : hideClassName}>
                    
                      <span className="dropbtn__wrap"> <span> My<span style={{padding: "2px"}}></span>Account</span>  <ArrowDropDownIcon /></span>
                       
                        <div className="sideBar__links dropdown-content">
                            <Link  to="/orders"><DnsOutlinedIcon /> <span className="sideBar__links__text">Orders</span></Link>
                            <Link  to="/address"><LocationOnOutlinedIcon /> <span className="sideBar__links__text">Address</span></Link>
                            <Link  to="/profile"><AccountBoxOutlinedIcon /> <span className="sideBar__links__text">Profile</span></Link>
                            <Link  onClick={logout}><ExitToAppIcon /> <span className="sideBar__links__text">Logout</span></Link>
                        </div>
                     
                    </li> 
                    </div>:   <li className="logIn" onClick={OpenModal}>
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
