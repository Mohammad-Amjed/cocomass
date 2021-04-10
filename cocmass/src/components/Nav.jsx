import React from 'react'
import { Link } from 'react-router-dom'
import "../css/Nav.css"

function Nav() {
    return (
        <div className="nav">
        <nav  className="nav__navContent">
            <div className="nav__navContent__logo">
                <Link  to="/"><h1>cocomass</h1></Link>
            </div>
            <div className="nav__navContent__links">
                <ul id="nm-main-menu-ul" className="nm-menu">
                    <li id="menu-item-11908" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-11908">our story</li>
                    <li id="menu-item-11908" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-11908">Tours & experiences</li>
                    <li id="menu-item-11908" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-11908">Coctails</li>
                    <li id="menu-item-11908" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-11908">Shop</li>
                    <li id="menu-item-11908" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-11908">News</li>
                    <li id="menu-item-11908" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-11908">Contact</li>

                </ul>
            </div>
            <div className="nav__navContent__userInfo">
                <ul id="nm-main-menu-ul" className="nm-menu">
                    <li id="menu-item-11908" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-11908">Log in</li>
                    <li id="menu-item-11908" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-11908">Basket 0</li>
                    </ul>
                    </div>
         </nav>
        </div>
    )
}

export default Nav
