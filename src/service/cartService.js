import { get, patch, post } from "../utils/request";


export const addCart = async () => {
    const result = await post("cart/add");
    return result;
}

export const addProduct = async (option) => {
    const result = await post("cart/addProduct", option);
    return result;
}

export const deleteProduct = async (option) => {
    const result = await post("cart/deleteProduct", option);
    return result;
}

export const getCart = async (option) => {
    const result = await post(`cart/getCart`, option);
    return result;
}


export const changeQuantity = async (option) => {
    const result = patch("card/changeQuantity", option)
    return result;
}
export const updateCard = async (option) => {
    const result = patch("card/update", option)
    return result;
}