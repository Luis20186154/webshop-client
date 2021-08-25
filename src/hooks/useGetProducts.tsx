import { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { ItemProduct } from '../interfaces/ProductInterface';

export const useGetProducts = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [products, setproducts] = useState<ItemProduct[]>([]);

    const getProducts = async () => {

        await db.collection('products').get().then( querySnapshot => {
                       
            const productsList = querySnapshot.docs.map((doc) => doc.data()) as unknown as ItemProduct[];
            setproducts(productsList)
            /* setproducts(querySnapshot.docs.map((doc) => {                
                return doc.data();                
            })); */

        });        

        setIsLoading(false);
    }

    useEffect(() => {
        getProducts();
    }, [])

    return {
        isLoading,
        products
    }
}
