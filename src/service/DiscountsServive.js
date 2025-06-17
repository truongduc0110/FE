import { get, patch, post , del} from "../utils/request";

export const getDiscountList = async (page) => {
    const result = await get(`discounts?page=${page}`);
    return result;
}

export const getDiscountDetail = async (id) => {
    const result = await get(`discounts/${id}`);
    return result;
}
export const getDiscountOfCategory = async () => {
    const result = await get(`discounts/category`);
    return result;
}
export const editDiscount = async (id,option) => {
    const result = await patch(`discounts/${id}`, option);
    return result;
}

export const deleteDiscount = async (id) => {
    const result = del(`discounts/${id}`)
    return result;
}
export const deleteDiscountCategory = async (id) => {
    const result = del(`discounts/category/${id}`)
    return result;
}
export const createDiscount = async (option) => {
    const result = await post("discounts",option);
    return result;
}
export const applyDiscount = async (option) => {
    const result = await post("discounts/apply",option);
    return result;
}