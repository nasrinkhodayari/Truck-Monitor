import { APP_LOADING ,APP_ERROR} from '../Types/main-types';

export const getAppLoading = loading => {  
    return {
        type: APP_LOADING,
        loading
    }
}
export const getAppError = errorMessage => {  
    return {
        type: APP_ERROR,
        errorMessage
    }
}