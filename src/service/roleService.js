import { get, patch, post } from "../utils/request";

export const getRoleList = async () => {
    const result = await get("roles");
    return result;
}
export const getRoleDetail = async (id) => {
    const result = await get(`roles/${id}`);
    return result;
}
export const getRolebyUser = async (id) => {
    const result = await get(`getRolebyUser/${id}`);
    return result;
}
export const createRole = async (option) => {
    const result = await post("create/role",option);
    return result;
}
export const editRole = async (id, option) => {
    const result = patch(`edit/role/${id}`, option)
    return result;
}
export const deleteRole = async (id) => {
    const result = patch(`delete/role/${id}`)
    return result;
}

export const UpdatePermissions = async (option) => {
    const result = patch(`role/permissions`, option)
    return result;
}
