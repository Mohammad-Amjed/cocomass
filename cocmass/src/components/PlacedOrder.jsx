import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { Link } from 'react-router-dom'
import { auth } from '../backend/firebase'
import "../css/PlacedOrder.css"
import Authintication from './Authintication';
import CompletedOrder from './CompletedOrder'
function PlacedOrder({products}) {
        const [ModalIsOpen, setModalIsOpen] = useState(false)
        const [User, setUser] = useState()
        
        useEffect(() => {
            auth.onAuthStateChanged((authUser) => {
                setUser(authUser)
                setModalIsOpen(false)
            })
           
        }, [])
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
                <div className="PlacedOrder"> 
                        <div className="PlacedOrder__emailConfirmation">
                        <div className="PlacedOrder__emailConfirmation__text">
                           <h3>THANK YOU FOR YOUR ORDER MOHAMMAD!</h3>
                           <p>You will recive a confirmation email once your Order has been confirmed.</p>
                        </div>
                        <div className="PlacedOrder__emailConfirmation__link">
                                <Link to="./" >Continue Shopping</Link>
            
                         </div>

                        </div>


                        <div className="PlacedOrder__products orders__content__products ">
                                { products && <CompletedOrder items={products} length={products.items.length} />}
                           </div> 
                           <div className="PlacedOrder__callToAction">
        
                       <div className="PlacedOrder__callToAction__link">
                       {User && User.isAnonymous ?  <Link onClick={OpenModal}>  <h3>Sign in to save and track your Order and to save your address</h3> </Link>: <Link to="/orders">  <h3>View Orders</h3> </Link> }
                                <Modal   isOpen={ModalIsOpen} onRequestClose={closeModal} style={customStyles}>
                           <Authintication />
                           </Modal>
                         </div>
                        </div>
                </div>
        )
}

export default PlacedOrder
