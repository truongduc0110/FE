const API_DOMAIN = "http://localhost:3000/"
const API_DOMAIN_CHAT_BOT = " http://127.0.0.1:8000/"

export const get = async (patch) => {
    const response = await fetch(API_DOMAIN + patch);
    const result = response.json()
    return result
}

export const post = async (patch, option) => {
    const response = await fetch(API_DOMAIN + patch, {
        method: "POST",
        headers: {
            Accept: "appliction/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(option)
    });
    const result = response.json()
    return result
}
export const postChatBot = async (patch, option) => {
    const response = await fetch(API_DOMAIN_CHAT_BOT + patch, {
        method: "POST",
        headers: {
            Accept: "appliction/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(option)
    });
    const result = response.json()
    return result
}
export const del = async (patch) => {
    const response = await fetch(API_DOMAIN + patch, {
        method: "DELETE",
    });
    const result = response.json()
    return result
}

export const update = async (patch) => {
    const response = await fetch(API_DOMAIN + patch, {
        method: "UPDATE",
    });
    const result = response.json()
    return result
}

export const patch = async (patch, option) => {
    const response = await fetch(API_DOMAIN + patch, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(option)
    });
    const result = await response.json()
    return result
}