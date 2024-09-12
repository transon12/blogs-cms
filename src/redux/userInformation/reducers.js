import { MeTypes } from './constants';
const initialState = {
    userInfor: '',
    posts: {},
};
export default function userInforReducer(state = initialState, actions) {
    switch (actions.type) {
        case MeTypes.RESPONSE_SUCCESS: {
            console.log(actions.payload.actionType);
            switch (actions.payload.actionType) {
                case MeTypes.CHANGE_PASSWORD:
                    return {
                        ...state,
                        payload: actions.payload.data,
                        loading: false,
                        passwordChange:true,
                    }
                default:
                    return state;
            }
        }
        case MeTypes.RESPONSE_ERROR: {
            switch (actions.payload.actionType) {
              case MeTypes.CHANGE_PASSWORD:
                return {
                    ...state,
                    payload: actions.payload.error,
                    loading: false,
                    passwordChange: false,
                }
                default:
                    return state;
            }
        }
        case MeTypes.UPDATE_PROFILE:
            return {
                ...state, // lấy lại tất cả các state cũ
                userInfor: actions.payload.data,
            };
        case MeTypes.UPDATE_POSTUSER:
            return {
                ...state,
                posts: actions.payload.data,
            };
        case MeTypes.UPDATE_COMPARE:
            return {
                ...state,
                posts: actions.payload.data,
            };

        default:
            return state
    }

}


