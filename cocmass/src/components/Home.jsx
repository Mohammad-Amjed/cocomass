import React, { useEffect, useState } from 'react'
import { db } from '../backend/firebase';
import Product from './Product'

function Home() {
    const [snapshots, setSnapshots] = useState();
    useEffect(()=> {
        db.collection("products")
         .get()
         .then((snapshot) => {
          setSnapshots(snapshot.docs)            
         }
        )
    }, []);

  
    return (
        <div>
                {  snapshots && snapshots.map((doc)=>(
        <Product path={doc.data().path} image={doc.data().image} body1={doc.data().body1} body2={doc.data().body2} title={doc.data().title} id={doc.data().id}/>     
                  ))}  
        </div>
    )
}

export default Home
