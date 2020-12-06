import { APP_LOADING, APP_ERROR } from '../Types/main-types';

const initialState = {
    loading: true,
    errorMessage: null
}

const MainReducer = (state = initialState, action) => {
    switch (action.type) {
        case APP_LOADING:
            return {
                ...state,
                loading: action.loading

            }
        case APP_ERROR:
            return {
                ...state,
                errorMessage: action.errorMessage

            }
        default: return state
    }

}
export default MainReducer;