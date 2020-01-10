import React, { useEffect, useState } from 'react';
import firebase from '../../utils/firebase.js';
import Card from '../Card/card.js';
import Button from '../Button/button.js'
import '../Card/card.css'
import '../Kitchen/kitchen.css'

const KitchenApp = () => {
    const [order, setOrder] = useState([]);


    useEffect(() => {
        const order = [];
        firebase.firestore().collection('client').get().then(querySnapshot => (
            querySnapshot.forEach(doc => {
                order.push({
                    id: doc.id,
                    ...doc.data()
                })
            }
            ))
        )
        setOrder(order)
    }, [])


    return (
        <>
            <div>
                {order.map(doc =>
                    <div>
                        <p>Nome: {doc.client}</p>
                        <p>Mesa: {doc.table}</p>
                        <p>PEDIDO:</p>
                        {doc.order.map(item =>
                        <>
                        
                            <p>{item.name}</p>
                            </>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default KitchenApp