import { get, patch, post } from "../utils/request";

export const getCategoryList = async () => {
    const result = await get(`category`);
    return result;
}
export const getProductInCategory = async (id) => {
    const result = await get(`category/product/${id}`);
    return result;
}
export const getCategoryDetail = async (id) => {
    const result = await get(`category/${id}`);
    return result;
}

export const editCategory = async (id,option) => {
    const result = await patch(`edit/category/${id}`, option);
    return result;
}

export const getCategoryListSort = async (sort, value) => {
    const result = await get(`category/read.php?sort=${sort}&value=${value}`);
    return result;
}

export const deleteCategory = async (id) => {
    const result = patch(`delete/category/${id}`)
    return result;
}

export const changeStatus = async (id, option) => {
    const result = patch(`category/change-status.php?id=${id}`, option)
    return result;
}

export const createCategory = async (option) => {
    const result = await post("create/category",option);
    return result;
}