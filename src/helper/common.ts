import { ItemProductClient } from '../interfaces/ProductInterface';

export const getCartOfLocalStorage = (cart: ItemProductClient[], newPorduct: ItemProductClient): ItemProductClient[] => {

    const products = cart.map(product => {
        if (product.id === newPorduct.id) {
            return {
                ...product,
                cantity: product.cantity + newPorduct.cantity
            }
        } else {
            return product
        }
    })

    const index = products.findIndex(x => x.id === newPorduct.id);

    index === -1 && products.push(newPorduct)

    return products;

}