import {get, patch, post} from "../utils/request";

export const getProductList = async (page) => {
    const result = await get(`products?page=${page}`);
    return result;
}

export const getProductOfCategory = async (params) => {
    const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== null && value !== undefined && value !== "")
    );
    const query = new URLSearchParams(filteredParams).toString();
    const result = await get(`products?${query}`);
    return result;
}

export const getProductRandom = async (parentId) => {
    const result = await get(`products/random/${parentId}`);
    return result;
}

export const getPopularProducts = async () => {
    const result = await get(`products/popular`);
    return result;
}
export const getProductListDeleted = async (page) => {
    const result = await get(`products/deleted.php?page=${page}`);
    return result;
}

export const getProductDetail = async (id) => {
    const result = await get(`products/${id}`);
    return result;
}

export const getProductCategory = async (id) => {
    const result = await get(`products/listProductCategory.php?id=${id}`);
    return result;
}

export const deleteProduct = async (id) => {
    const result = patch(`delete/product/${id}`)
    return result;
}
export const deletePermanently = async (option) => {
    const result = post(`products/permanently_deleted.php`, option)
    return result;
}

export const restoreProduct = async (option) => {
    const result = patch(`products/restore.php`, option)
    return result;
}

export const changeStatus = async (id, option) => {
    const result = patch(`products/change-status.php?id=${id}`, option)
    return result;
}

export const createProduct = async (option) => {
    const result = await post("create/product",option);
    return result;
}
export const editProduct = async (option, id) => {
    const result = await post(`edit/product/${id}`,option);
    return result;
}
















export const getProductListSort = async (sort, value) => {
    const result = await get(`products/read.php?sort=${sort}&value=${value}`);
    return result;
}
export const getProductDeletedSort = async (sort, value) => {
    const result = await get(`products/deleted.php?sort=${sort}&value=${value}`);
    return result;
}