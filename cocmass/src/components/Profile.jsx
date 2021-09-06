import React from 'react'
import "../css/Profile.css"
import ProfileCard from './ProfileCard'
import SideBar from './SideBar'

function Profile() {
    return (
        <div className="profile">
            <div className="profile__sideBar">
                <SideBar />
            </div>
            <div className="profile__content">
            <div className="profile__content__title">
                 <h2>Profile</h2>
                    <span>Manage your profile details</span>
                    <ProfileCard  type="name"/> 
                    <ProfileCard  type="security"/> 
                 </div>
            </div>
        </div>
    )
}

export default Profile
