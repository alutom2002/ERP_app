import { type } from "../action/tab";

export default function (state = 0, action){
    switch(action.type){
        case type.CHANGE_TAB:
            return action.payload;
        default:
            return state;
    }
}