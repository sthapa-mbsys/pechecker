export const VariationErrorChecker=function(allData,thisData,header){
    // parent field, variation attributes, non variation attributes
    var error,errorType='',errors=[];

    const productTypePosition=header.indexOf("type");

    if(thisData[productTypePosition].toLowerCase()==="variable"){
        const variableError=checkVariableError(allData,thisData,header);
        if(!variableError.error){
            return false;
        }
        return {
            error:variableError.error,
            errorType:variableError.errorType
        }
    }

    if(thisData[productTypePosition].toLowerCase()!=="variation"){
        return {
            error:false
        }
    }

    errors.push(parentSKUCheck(allData,thisData,header))

    if(errors.indexOf("Parent variable not found ")===-1){
        errors=errors.concat(variationAttributeCheck(allData,thisData,header));
    }
   

    errors.map(err=>{
        if(err!==""){
            errorType+=err
        }
        return null;
    })

    if(errorType!=='') {
        error=true
        return {
        error,
        errorType
    }

}
    return {
        error:false
    }
}

const parentSKUCheck=function(allData,thisData,header){
    let errorType=''
    const productTypePosition=header.indexOf("type")
    const positionOfParent=header.indexOf("parent")
    const parentSKU=thisData[positionOfParent]

    if(parentSKU===""){
        errorType+="Empty parent SKU "
    }

    else{
    const positionOfSKU=header.indexOf("sku");

    const parentWithSKU=getParentData(allData,parentSKU,productTypePosition,positionOfSKU)

    if(parentWithSKU.length===0){
        errorType+="Parent variable not found "
    }
    }

    return errorType
}

const variationAttributeCheck=function(allData,thisData,header){
    let errorType='',attributeNameLocations=[], attributeValueLocations=[], attributeVisibilityLocations=[], attributeGlobalLocations=[], variableAttributeData=[],variationAttribute, headerName, variationLocatedAt=[]

    for(var headCount=0;headCount<header.length-1;headCount++){
    headerName=header[headCount].replace(/[0-9]/g,'').toLowerCase()
        if(headerName==="attribute  name"){
            attributeNameLocations.push(headCount)
        }
        else if(headerName==="attribute  value(s)"){
            attributeValueLocations.push(headCount)
        }
        else if(headerName==="attribute  visible"){
            attributeVisibilityLocations.push(headCount)
        }
        else if(headerName==="attribute  global"){
            attributeGlobalLocations.push(headCount)
        }
    }

    let parentProduct=getParentData(allData,thisData[header.indexOf("parent")],header.indexOf("type"),header.indexOf("sku"));

    if(parentProduct.length>0){
        parentProduct=parentProduct[0]

        if(parentProduct[header.indexOf("name")].toLowerCase()===thisData[header.indexOf("name")].toLowerCase()){
            errorType="Variation name same as parent"
        }

    attributeValueLocations.map((valueLocation,index)=>{
        variationAttribute=parentProduct[Number(valueLocation)].split(",")
       if(variationAttribute.length>1){
        variationLocatedAt.push(valueLocation)
        variableAttributeData.push({
            nameLocation:attributeNameLocations[index],
            location:valueLocation,
            visibilityLocation:attributeVisibilityLocations[index],
            globalLocation:attributeGlobalLocations[index],
            values:variationAttribute.map(val=>{
                var newVal=val,nonEmpty;
                for(var stringLength=0;stringLength<newVal.length;stringLength++){
                    if(newVal[stringLength]!==" ") 
                    {
                        nonEmpty=stringLength    
                        break;
                    }
                }
                newVal=newVal.substring(nonEmpty,newVal.length)
                return newVal
            })
        })
       }
        return null;
    }) 
    

    // add error if varying attribute is neither empty nor among varying attribute values of parent
    variableAttributeData.map(vData=>{
        if(thisData[vData.nameLocation]!==parentProduct[vData.nameLocation] || thisData[vData.nameLocation]===""){
            if(errorType!=="") errorType+=", "
            errorType+="No/Wrong attribute name "+thisData[vData.nameLocation]+" Expected "+parentProduct[vData.nameLocation]
        }
        if(thisData[vData.location]!=="" && vData.values.indexOf(thisData[vData.location])===-1){
            if(errorType!=="") errorType+=", "
            errorType+="Invalid attribute "+thisData[vData.nameLocation]+":"+thisData[vData.location]
        }
        else {
            if(thisData[vData.visibilityLocation]!=="1"){
                if(errorType!=="") errorType+=", "
                errorType+="Invalid attribute visibility "+thisData[vData.nameLocation]
            }
            if(thisData[vData.globalLocation]!=="1"){
                if(errorType!=="") errorType+=", "
                errorType+="Invalid attribute global "+thisData[vData.nameLocation]
            }
        }
        return null
    })

    // add error if has attributes other than varying ones
    attributeValueLocations.map((valueLocation,index)=>{
        //  only if not a varying attribute
        if(variationLocatedAt.indexOf(valueLocation)===-1){
            if(thisData[valueLocation]!=="" || thisData[attributeNameLocations[index]]!==""){
                if(errorType!=="") errorType+=", "
                errorType+="Additional attribute "+thisData[attributeNameLocations[index]]+":"+thisData[valueLocation]
            }
        }
        return null
    })
}
   
return errorType;

}

const getParentData=function(allData,sku,productTypePosition,positionOfSKU){
    const variableOnly=allData.filter(data=>data[productTypePosition].toLowerCase()==="variable")
    return variableOnly.filter(data=>data[positionOfSKU]===sku)
}

const checkVariableError=function(allData,thisData,header){
    let skuLocation,parentLocation
    for(var c=0;c<header.length;c++){
        if(header[c]==="sku"){
            skuLocation=c;
        }
        else if(header[c]==="parent"){
            parentLocation=c;
        }
        if(skuLocation && parentLocation) break;
    }
    if(!skuLocation || !parentLocation){
        return {
            error:true,
            errorType:"Could not find either SKU or Parent location"
        }
    }
    
    const variableSKU=thisData[skuLocation];
    for(c=0;c<allData.length;c++){
        if(allData[c][parentLocation]===variableSKU){
        return{error:false}
        }
        if(c===allData.length-1){ 
        return {error:true, errorType:"No variation found"}
        } 
    }
}