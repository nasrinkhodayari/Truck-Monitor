import { APP_LOADING, APP_ERROR } from '../Types/main-types';

const initialState = {
    loading: true,
    errorMessage: null
}

const MainReducer = (state = initialState, action) => {
    const { type, loading, errorMessage } = action;
    switch (type) {
        case APP_LOADING:
            return {
                ...state,
                loading: loading

            }
        case APP_ERROR:
            return {
                ...state,
                errorMessage: errorMessage

            }
        default: return state
    }

}
export default MainReducer;