import ajax from "../utils/ajax";
export const login =  async (data) => {
    console.log(data);
    return await ajax.post('/login', {
        ...data
    })
}
export const getCurrentUser =async() => {
    return await ajax.get(`/getCurrentUser`);
}
export const register = async (data) => {
    return await ajax.post('/register', data)
}