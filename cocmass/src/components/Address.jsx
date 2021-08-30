import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { auth, db } from '../backend/firebase';
import DoneIcon from '@material-ui/icons/Done';
import "../css/Address.css"
import SideBar from './SideBar';

function Address() {
    const [Fname, setFname] = useState()
    const [Lname, setLname] = useState()
    const [City, setCity] = useState()
    const [Confirm, setConfirm] = useState(false)
    const [UpdateDatebase, setUpdateDatebase] = useState(false)
    const [ArdessOne, setArdessOne] = useState()
    const [ArdressTwo, setArdressTwo] = useState()
    const [snapshots, setSnapshots] = useState(undefined);
    const [Mobile, setMobile] = useState()
    const [User, setUser] = useState()
    const [ToggleButton, setToggleButton] = useState(false)

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
           
            setUser(authUser)
        })
       
    }, [])

    useEffect(()=> {
        let cancelled = false;
        User && db.collection("users").doc(User.uid).collection("info").doc("address").get()
        .then(   (snapshot) => {
            if (!cancelled) {
                if(snapshot.exists){
                setSnapshots(snapshot.data());
                // *** Create `items` **once** when you get the snapshots
            }
        } if(!snapshot.exists){
            console.log("No snapshots")
            setToggleButton(true)}
            setFname("");
            setLname("");
            setArdessOne("");
            setArdressTwo("");
            setMobile("");
        })
                // });
                return () => {
                    // *** The component has been unmounted. If you can proactively cancel
                    // the outstanding DB operation here, that would be best practice.
                    // This sets a flag so that it definitely doesn't try to update an
                    // unmounted component, either because A) You can't cancel the DB
                    // operation, and/or B) You can, but the cancellation occurred *just*
                    // at the wrong time to prevent the promise fulfillment callback from
                    // being queued. (E.g., you need it even if you can cancel.)
                    cancelled = true;
                };
            }, [User, UpdateDatebase]);

            const handleSubmit = (e)=>{
                e.preventDefault();
                if (!ToggleButton){
                setToggleButton(true)
                setSnapshots(undefined);
                setConfirm(false);
                }else{
                User && db.collection("users").doc(User.uid).collection("info").doc("address").set({
                    Fname,
                    Lname,
                    City,
                    ArdessOne,
                    ArdressTwo,
                    Mobile
                }).then(
                    setFname(""),
                    setLname(""),
                    setArdessOne(""),
                    setArdressTwo(""),
                    setMobile(""),
                    setCity(""),
                    setConfirm(true),
                    UpdateDatebase ?  setUpdateDatebase(false) : setUpdateDatebase(true),
                    setToggleButton(false),
                    console.log("done"))
                }
              }
    return (
        <div className="address">
            <div className="address__sideBar">
                <SideBar />
            </div>
            <div className="address__content">
             <div className="checkout__address__title">
                     <h2>BILLING DETAILS</h2>
                </div>
                { Confirm && <div className="productDetails__right__checkout__confirm"><span><DoneIcon /></span>Addres has been updated successfully</div> }
                {!ToggleButton && <div className="address__content__button">
                    <Link onClick={handleSubmit}>ADD NEW ADDRESS</Link>
                </div>}
                <div className="checkout__address__details">
                  <div className="checkout__address__details__name">
                    <span className="checkout__address__details__name__element">
                        <label for="billing_first_name" class="">First name</label>
                        <span className="checkout__address__details__name__element__input">
                             <input className="checkout__address__details__info__element__input__element" type="text" placeholder="" value={snapshots ? snapshots.Fname : Fname} onChange={e=>setFname(e.target.value)} name="name" disabled={snapshots ? true :false}/>
                        </span>
                   </span>
                   <span className="checkout__address__details__name__element">
                        <label for="billing_first_name" class="">Last name</label>
                        <span className="checkout__address__details__name__element__input">
                             <input className="checkout__address__details__info__element__input__element" type="text" placeholder="" value={snapshots ? snapshots.Lname : Lname} onChange={e=>setLname(e.target.value)} name="email" disabled={snapshots ? true :false}/>
                        </span>
                   </span>
                  </div>
                    <div className="checkout__address__details__info">
                    <span className="checkout__address__details__info__element">
                        <label for="billing_first_name" class="">City</label>
                        <span className="checkout__address__details__info__element__input">
                        <select className="checkout__address__details__info__element__input__element" value={City} onChange={e=>setCity(e.target.value)} disabled={snapshots ? true :false}>
                        <option value="" disabled selected hidden style={{color:"green"}}>{snapshots ? snapshots.City : "Choose a City" }</option>
                            <option value="Sharjah">Sharjah</option>
                            <option value="Dubai">Dubai</option>
                            <option value="AbuDhabi">AbuDhabi</option>
                            <option value="AlFijairah">AlFujairah</option>
                            <option value="UmAlquain">UmAlquain</option>
                            <option value="Ajman">Ajman</option>
                            <option value="Ras Alkhaimah">Ras ALkhaimah</option>
                        </select>
                        </span>
                    </span>
                    <span className="checkout__address__details__info__element">
                        <label for="billing_first_name" class="">Adreess line 1</label>
                        <span className="checkout__address__details__info__element__input">
                             <input className="checkout__address__details__info__element__input__element" type="text"placeholder="" ArdessOne value={snapshots ? snapshots.ArdessOne : ArdessOne} onChange={e=>setArdessOne(e.target.value)} disabled={snapshots ? true :false}/>
                        </span>
                    </span>
                    <span className="checkout__address__details__info__element">
                        <label for="billing_first_name" class="">Adreess line 2</label>
                        <span className="checkout__address__details__info__element__input">
                             <input className="checkout__address__details__info__element__input__element" type="text" placeholder="" value={snapshots ? snapshots.ArdressTwo : ArdressTwo} onChange={e=>setArdressTwo(e.target.value)} disabled={snapshots ? true :false}/>
                        </span>
                    </span>
                    <span className="checkout__address__details__info__element">
                        <label for="billing_first_name" class="">Mobile</label>
                        <span className="checkout__address__details__info__element__input">
                             <input className="checkout__address__details__info__element__input__element" type="text" placeholder="" value={snapshots ? snapshots.Mobile : Mobile} onChange={e=>setMobile(e.target.value)} disabled={snapshots ? true :false}/>
                        </span>
                    </span>
                    </div>
                </div> 
                {ToggleButton && <div className="address__content__button right">
                    <Link onClick={handleSubmit}>SHAVE CHANGES</Link>
                </div>}
                </div>

        </div>
    )
}

export default Address
