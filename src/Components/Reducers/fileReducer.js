const FileReducer=(defaultData={headers:[],entries:[]},action)=>{
    switch(action.type){
        case 'UPLOAD_FILE':
            return {headers:action.data.headers,
                    entries:action.data.entries
            };
            case 'FILE_REMOVED':
                return{
                    headers:[],
                    entries:[]
                }
        default:
            return defaultData;
    }
}

export default FileReducer;