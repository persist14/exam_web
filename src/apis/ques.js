import ajax from "../utils/ajax";

export const quesCreate = async (data) => {
    return await ajax.post('/ques/add', {
        ...data
    })
}
export const quesQuery = async (params) => {
    return await ajax.get('/ques', {
        params
    })
}

export const quesUpd = async (data) => {
    return await ajax.put('/ques', {
        ...data
    })
}

export const quesDel = async (id) => {
    return await ajax.del(`/ques/${id}`)
}