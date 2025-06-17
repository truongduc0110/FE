import { get, patch, post } from "../utils/request";


export const createAccount = async (option) => {
    const result = await post("create/account",option);
    return result;
}

export const getAccountList = async () => {
    const result = await get("accounts");
    return result;
}

export const getAccountDetail = async (id) => {
    const result = await get(`accounts/${id}`);
    return result;
}

export const deleteAccount = async (id) => {
    const result = patch(`delete/account/${id}`)
    return result;
}

export const editAccount = async (id, option) => {
    const result = patch(`edit/account/${id}`, option)
    return result;
}

export const changeStatus = async (id, option) => {
    const result = patch(`account/change-status.php?id=${id}`, option)
    return result;
}

export const userInfo = async (option) => {
    const result = await post("account/infoUser.php",option);
    return result;
}