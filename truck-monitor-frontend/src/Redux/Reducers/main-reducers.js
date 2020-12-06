import { APP_LOADING } from '../Types/main-types';

const initialState = {
    loading: true
}

const MainReducer = (state = initialState, action) => {
    switch (action.type) {
        case APP_LOADING:
            return {
                ...state,
                loading: action.loading

            }
        default: return state
    }

}
export default MainReducer;