import { get, patch, post } from "../utils/request";

export const checkout = async (option) =>{
    const result = await post("order/checkout", option);
    return result;
}
export const getCheckout = async (id) => {
    const result = await get(`order/${id}`);
    return result;
}

export const getHistoryOrder = async (id) => {
    const result = await get(`order/history/${id}`);
    return result;
}
export const getCountOrderMonth = async () => {
    const result = await get(`order/countOrderMonth`);
    return result;
}
export const getTotalPriceMonth = async () => {
    const result = await get(`order/countTotalPriceMonth`);
    return result;
}
export const deleteOrder = async (id) => {
    const result = await patch(`order/delete/${id}`);
    return result;
}

export const getOrderList = async () => {
    const result = await get("order");
    return result;
}

export const confirmedOrder = async () => {
    const result = await get("order/confirmed");
    return result;
}

export const confirmOrder = async (option) => {
    const result = await patch(`order/confirm`, option);
    return result;
}
export const payment = async (option) =>{
    const result = await post("order/payment", option);
    return result;
}
export const paymentMomo = async (option) =>{
    const result = await post("order/momoPayment", option);
    return result;
}