import http from "http";


export const getQuestions = (lat, long) => {
    const response = http.get('questions', {
        lat: lat,
        long: long
    })
    return response;
}

export const getAQuestion = (id) => {
    const response = http.get('question/id/' + id)
    return response;
}

export const createQuestion = (formdata) => {
    const response = http.post('question/create', formdata)
    return response;
}

export const getUserQuestion = () => {
    const response = http.get('question/user/default')
    return response;
}

export const updateQuestion = (id, body) => {
    const response = http.put('question/update',{
        body: body
    })
    return response;
}