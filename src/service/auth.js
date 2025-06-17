import { post } from "../utils/request";

export const login = async (option) => {
    const result = await post("login",option);
    return result;
}

export const register = async (option) => {
    const result = await post("register",option);
    return result;
}
