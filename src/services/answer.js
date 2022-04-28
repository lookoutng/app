import http from "http";


export const deleteAnswer = (id) => {
    const response = http.delete('question/delete/' + id, {})
    return response;
}

export const reportAnswer = (id, formdata) => {
    const response = http.put('answer/report/' + id, formdata)
    return response;
}

export const updateAnswer = (id, formdata) => {
    const response = http.put('answer/update/' + id, formdata)
    return response;
}

export const createAnswer = (id, body) => {
    const response = http.post('answer/create/question' + id, { body:body })
    return response;
}