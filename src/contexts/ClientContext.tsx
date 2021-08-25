import React, { createContext, useEffect, useReducer } from 'react'
import { useContext } from 'react';
import { clientReducer } from './ClientReducer';
import { AuthContext } from './AuthContex';
import { loadOldCart } from '../helper/loadOldCart';
import { ItemProduct, ItemProductClient } from '../interfaces/ProductInterface';

//* Definir informacion
export interface ShoppingCart {
    myProducts: ItemProductClient[];
}

//* Definir estado inicial
const cartInitialState: ShoppingCart = {
    myProducts: []
}

//* Datos que deseo compartir globalmente
interface ClientContextPropss {
    cartState: ShoppingCart;
    addProductCart: (product: ItemProductClient) => void;
    deleteProductCart: (productId: string) => void;
}

export const ClientContext = createContext({} as ClientContextPropss);

const ClientContextProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

    const { authState } = useContext(AuthContext);
    const [cartState, dispatch] = useReducer(clientReducer, cartInitialState);

    useEffect(() => {
        if (authState.isLogged) {
            loadOldShoppingCart(authState.id!)
        }
    }, [])

    const loadOldShoppingCart = async (clientId: string) => {
        const cart = await loadOldCart(clientId)
        dispatch({
            type: 'loadOldCart',
            payload: cart
        })
    }

    const addProductCart = (product: ItemProductClient) => {
        dispatch({
            type: 'addProductCart',
            payload: product
        })
    }

    const deleteProductCart = (productId: string) => {
        dispatch({
            type: 'deleteProductCart',
            payload: productId
        })
    }

    return (
        <ClientContext.Provider value={{
            cartState,
            addProductCart,
            deleteProductCart
        }}>
            {children}
        </ClientContext.Provider>
    )
}

export default ClientContextProvider;
