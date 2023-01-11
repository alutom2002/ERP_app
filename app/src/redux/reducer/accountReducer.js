import { type } from "../action/account";

const defState = {
    name: '',
    role: '',
    address: ''
};

export default function reducer(state = defState, action){
    switch(action.type){
        case type.SET_ACCOUNT:
            sessionStorage.setItem('account', JSON.stringify(action.payload));
            return action.payload;
        case type.CLEAR_ACCOUNT:
            sessionStorage.clear();
            return {
                name: '',
                role: '',
                address: ''
            };
        default:
            return state;
    }
};