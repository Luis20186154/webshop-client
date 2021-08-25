import { ItemProductClient } from './../interfaces/ProductInterface';
import { auth, db } from "../firebase/firebaseConfig"
import firebase from 'firebase/app';

export const addProductCart = async (product: ItemProductClient) => {
    await db.collection(`cart/${auth.currentUser?.uid}/oldCart`).doc(product.id).get()
        .then(docRef => {
            if(docRef.exists){
                docRef.ref.update({
                    id: product.id,
                    cantity: firebase.firestore.FieldValue.increment(1)
                })
            } else {
                docRef.ref.set(product)
            }
        });
}

export const deleteProductCart = async (prodcutId: string) => {
    await db.collection(`cart/${auth.currentUser?.uid}/oldCart`).doc(prodcutId).delete();
}