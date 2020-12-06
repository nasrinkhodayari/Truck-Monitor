import { APP_LOADING } from '../Types/main-types';

export const getAppLoading = loading => {  
    return {
        type: APP_LOADING,
        loading
    }
}