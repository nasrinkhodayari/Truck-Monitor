import axios from 'axios';
import { APP_LOADING } from '../Redux/Types/main-types';

let apiRequests = {
    get: getInputParams => {
        const { path, apiURL, dispatch } = getInputParams;
        dispatch({ type: APP_LOADING, loading: true });
        return axios.get(path + apiURL)
            .finally(() => dispatch({ type: APP_LOADING, loading: false }));
    },
    post: postInputParams => {
        const { path, apiURL, dispatch, inputData } = postInputParams;
        dispatch({ type: APP_LOADING, loading: true });
        return axios.post(path + apiURL, inputData)
            .finally(() => dispatch({ type: APP_LOADING, loading: false }));
    },
    put: putInputParams => {
        const { path, apiURL, dispatch, inputData } = putInputParams;
        dispatch({ type: APP_LOADING, loading: true });
        return axios.put(path + apiURL, inputData)
            .finally(() => dispatch({ type: APP_LOADING, loading: false }));
    },
    delete: deleteInputParams => {
        const { path, apiURL, dispatch } = deleteInputParams;
        dispatch({ type: APP_LOADING, loading: true });
        return axios.delete(path + apiURL)
            .finally(() => dispatch({ type: APP_LOADING, loading: false }));
    }
}

export default apiRequests;