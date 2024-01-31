import { FAIL_REQUESR, GET_STUDENT_LIST, MAKE_REQUESR } from "./ActionType"

const initialstate={
    loading: true,
    studentlist: [],
    userobj:{},
    errmessage:""
}

export const Reducer=(state=initialstate, action)=>{
    switch(action.type){
        case MAKE_REQUESR:
            return{
                ...state,
                loading: true
            }
        case FAIL_REQUESR:
            return{
                ...state,
                loading:false,
                errmessage:action.payload
            }
            case GET_STUDENT_LIST:
                return{
                    loading:false,
                    errmessage:"",
                    studentlist:action.payload,
                    userobj:{}
                }
        default: return state
    }
}