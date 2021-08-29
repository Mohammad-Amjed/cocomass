import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import DnsOutlinedIcon from '@material-ui/icons/DnsOutlined';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import "../css/SideBar.css"

function SideBar() {
    const {pathname} = useLocation();
    return (
        <div className="sideBar">
            <div className="sidebar__title">
                <h3>Hala Mohammad!</h3>
                <Link>Sign out</Link>
            </div>
            <div className="sideBar__links">
                <Link className={pathname=="/orders" && "active"} to="/orders"><DnsOutlinedIcon /> <span className="sideBar__links__text">Orders</span></Link>
                <Link className={pathname=="/address" && "active"} to="/address"><LocationOnOutlinedIcon /> <span className="sideBar__links__text">Address</span></Link>
                <Link className={pathname=="/profile" && "active"} to="/profile"><AccountBoxOutlinedIcon /> <span className="sideBar__links__text">Profile</span></Link>
            </div>

        </div>
    )
}

export default SideBar
