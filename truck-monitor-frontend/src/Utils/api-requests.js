import axios from 'axios';

let apiRequests = {
    get: (path, apiURL) => {
        return axios.get(path + apiURL)
    },
    getByParam: (path, apiURL, inputParams) => {
        return axios.get(path + apiURL, { params: inputParams })
    },
    post: (path, apiURL, inputData) => {
        return axios.post(path + apiURL, inputData)
    },
    put: (path, apiURL, inputData) => {
        return axios.put(path + apiURL, inputData)
    },
    patch: (path, apiURL) => {
        return axios.patch(path + apiURL)
    },
    delete: (path, apiURL) => {
        return axios.delete(path + apiURL)
    }
}

export default apiRequests;