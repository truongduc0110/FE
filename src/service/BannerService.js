import { get, patch, post, del } from "../utils/request";


export const getBanners = async () => {
    const result = await get("banners");
    return result;
}

export const createBanner = async (option) => {
    const result = await post("banners",option);
    return result;
}
export const deleteBanner = async (id) => {
    const result = del(`banners/${id}`)
    return result;
}