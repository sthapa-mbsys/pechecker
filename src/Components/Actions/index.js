export const FileUploadAction=(datas)=>{
    const data={
        type:"UPLOAD_FILE",
        data:datas
    }
    return data; 
}

export const error_entry_action=function(error_data){
    return {
        type:"SET_ERROR_ENTRIES",
        data:error_data
    }
}

export const fileRemoveAction=function(){
    return {
        type:"FILE_REMOVED"
    }
}

export const error_remove_action=function(){
    return {
        type:"REMOVE_ERROR_ENTRIES"
    }
}