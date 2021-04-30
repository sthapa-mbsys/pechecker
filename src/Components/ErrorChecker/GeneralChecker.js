export const GeneralChecker=function(thisData,header){
    let currentHead,errorType=""
    header.map((head,index)=>{
        if(typeof head!=="string" && typeof head!=="number" ){
            return null
        }
        currentHead=head.toLowerCase()
        if(currentHead==="type"){
            if(thisData[index]===""){
                if(errorType!==""){
                    errorType+=", "
                }
                errorType+="Empty Type Field"
            }
            else if(thisData[index].toLowerCase()!=="simple" && thisData[index].toLowerCase()!=="variable" && thisData[index].toLowerCase()!=="variation"){
                if(errorType!==""){
                    errorType+=", "
                }
                errorType+="Invalid Type : "+thisData[index]
            }
        }
        else if(currentHead==="published"){
            if(thisData[index]===""){
                if(errorType!==""){
                    errorType+=", "
                }
                errorType+="Empty Published Field"
            }
        }
        else if(currentHead==="visibility in catalog"){
            if(thisData[index]===""){
                if(errorType!==""){
                    errorType+=", "
                }
                errorType+="Empty Visibility Field"
            }
            else if(thisData[index].toLowerCase()!=="visible" && thisData[index].toLowerCase()!=="hidden"){
                if(errorType!==""){
                    errorType+=", "
                }
                errorType+="Invalid Visibility Field"
            }
        }
        else if(currentHead==="in stock?"){
            if(thisData[index]===""){
                if(errorType!==""){
                    errorType+=", "
                }
                errorType+="Empty In Stock Field"
            }
        }
        else if(currentHead==="allow customer reviews?"){
            if(thisData[index]==="" && thisData[header.indexOf("type")].toLowerCase()!=="variation"){
                if(errorType!==""){
                    errorType+=", "
                }
                errorType+="Empty Allow Customer Field"
            }
        }
        else if(currentHead==="name"){
            if(thisData[index]===""){
                if(errorType!==""){
                    errorType+=", "
                }
                errorType+="Empty "+currentHead+" field"
            }
        }
        return null
    })

    if(errorType!==""){
        return {
            error:true,
            errorType
        }
    }

    return {
        error:false
    }
}