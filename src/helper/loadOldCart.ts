import { db } from "../firebase/firebaseConfig"
import { ItemProductClient } from "../interfaces/ProductInterface";

export const loadOldCart = async (clientId: string) => {

    const oldCartSnap = await db.collection(`cart/${clientId}/oldCart`).get();

    const oldCart: ItemProductClient[] = [];    

    oldCartSnap.forEach(doc => {
        oldCart.push(doc.data() as ItemProductClient)
    })

    //console.log('oldCart', oldCart)
    return oldCart;
}

//TODO: Logic to add to orders

/* let docIdRef: string = '';

    await db.collection('7iHEN6jRvjbua1b4Z1yWGmNFbk12').add({
        product: 'pescado'
    }).then( async (doc) => {
        await doc.update({
            id: doc.id
        })
        docIdRef = doc.id;
    })

    const docRef = (await db.collection('7iHEN6jRvjbua1b4Z1yWGmNFbk12').doc(docIdRef).get()).data();

    console.log(docRef)

    await db.collection('orders').add({
        ...docRef
    });    */
