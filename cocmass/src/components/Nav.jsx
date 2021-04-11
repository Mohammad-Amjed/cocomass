import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../css/Nav.css"

function Nav() {
    const [ToggleHeight, setToggleHeight] = useState()

    const toggle = ()=>{
        if (ToggleHeight === "toggle"){
            setToggleHeight(undefined)
            console.log(ToggleHeight)
        }else{
            setToggleHeight("toggle")
            console.log(ToggleHeight)
        }
    }
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
                    <li id="menu-item-11908" className="listItem"><span>Tours &</span> experiences</li>
                    <li id="menu-item-11908" className="listItem">Coctails</li>
                    <li id="menu-item-11908" className="listItem">Shop</li>
                    <li id="menu-item-11908" className="listItem">News</li>
              
                </ul>
            </div>
            <div className="nav__navContent__userInfo">
                <ul id="nm-main-menu-ul" className="nm-menu">
                    <li id="menu-item-11908" className="logIn">Log in</li>
                    </ul>
                    </div>
 
                    </div>
                    <div className="nav__navContent__userInfo">
                    <ul >
                    <li id="menu-item-11908" className="basket"><span>Basket</span> 0</li>
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
