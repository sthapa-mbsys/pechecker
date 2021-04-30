const ErrorReducer=(defData=[],action)=>{
    switch(action.type){
        case "SET_ERROR_ENTRIES":
            return action.data;
        case "REMOVE_ERROR_ENTRIES":
            return [];
        default:
            return null;
    }
}

export default ErrorReducer;