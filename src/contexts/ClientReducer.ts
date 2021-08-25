import { ShoppingCart } from "./ClientContext";
import { ItemProductClient } from '../interfaces/ProductInterface';
import { addProductCart, deleteProductCart } from '../helper/shoppingCart';
import { getCartOfLocalStorage } from "../helper/common";

type ClientAction =
    | { type: 'loadOldCart', payload: ItemProductClient[] }
    | { type: 'addProductCart', payload: ItemProductClient }
    | { type: 'deleteProductCart', payload: string }

export const clientReducer = (state: ShoppingCart, action: ClientAction): ShoppingCart => {

    switch (action.type) {

        case 'loadOldCart':
            localStorage.setItem('cart', JSON.stringify(action.payload));
            let oldCart: any = localStorage.getItem('cart');

            oldCart = oldCart === null ? [] : JSON.parse(oldCart);

            return {
                ...state,
                myProducts: oldCart
            }

        case 'addProductCart':

            addProductCart(action.payload)            

            if (state.myProducts.length > 0) {                
                const products = getCartOfLocalStorage(state.myProducts, action.payload)
                localStorage.setItem('cart', JSON.stringify(products))
                return {
                    ...state,
                    myProducts: [
                        ...products,
                    ]
                }      

            } else {
                localStorage.setItem('cart', JSON.stringify([action.payload]))
                return {
                    ...state,
                    myProducts: [
                        ...state.myProducts,
                        action.payload
                    ]
                }
            }

        case 'deleteProductCart':

            deleteProductCart(action.payload)
            const products = state.myProducts.filter(product => product.id === action.payload);
            localStorage.setItem('cart', JSON.stringify(products))

            return {
                ...state,
                ...products,
            }

        default:
            return state;
    }

}