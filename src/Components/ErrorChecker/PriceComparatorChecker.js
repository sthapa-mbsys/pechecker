export const PriceComparator=function(thisData,header){
    let thuloLink,sastoDealLink,darazLink,errorType=""
    header.map((head,index)=>{
        if(head==="thulo"){
            thuloLink=index
        }
        else if(head==="sastodeal"){
            sastoDealLink=index
        }
        else if(head==="daraz"){
            darazLink=index
        }
        return null;
    });



    if(thuloLink){
        if(thisData[thuloLink]!=="" && (thisData[thuloLink].toLowerCase().indexOf("thulo.com")===-1 || thisData[thuloLink].toLowerCase().indexOf("?q=")!==-1 || thisData[thuloLink].toLowerCase().indexOf("&q=")!==-1)){
            if(errorType){
                errorType+=" --- "
            }
            errorType+="Thulo link seems to be invalid"
        }
    }

    if(sastoDealLink){
        if(thisData[sastoDealLink]!=="" && (thisData[sastoDealLink].toLowerCase().indexOf("sastodeal.com")===-1 || thisData[sastoDealLink].toLowerCase().indexOf("?q=")!==-1 || thisData[sastoDealLink].toLowerCase().indexOf("&q=")!==-1)){
            if(errorType){
                errorType+=", "
            }
            errorType+="Sasto Deal link seems to be invalid"
        }
    }

    if(darazLink){
        if(thisData[darazLink]!=="" && (thisData[darazLink].toLowerCase().indexOf("daraz.com")===-1 || thisData[darazLink].toLowerCase().indexOf("?q=")!==-1 || thisData[darazLink].toLowerCase().indexOf("&q=")!==-1)){
            if(errorType){
                errorType+=" --- "
            }
            errorType+="Daraz link seems to be invalid"
        }
    }

    if(errorType){
        return {
            error:true,
            errorType
        }
    }

    return {
        error:false
    }

}
