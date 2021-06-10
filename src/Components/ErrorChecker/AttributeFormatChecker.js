import {AttributeFormats} from './AttributeFormats'
export const AttributeFormatChecker=function(thisData,header){
    var attributeNameLocations=[],attributeValueLocations=[],currentHead,errors=[],errorType="",attValStart,attValueEnd,attributeDefaults=[]
    const attributeNamesToAvoid=["type"]
    header.map((head,index)=>{
        if(!head) return null
        currentHead=head.replace(/[0-9]/g,'')
        if(currentHead.toLowerCase()==="attribute  name"){
            attributeNameLocations.push(index)
        }
        else if(currentHead.toLowerCase()==="attribute  value(s)")
        {
            attributeValueLocations.push(index)
        }
        else if(currentHead.trim().toLowerCase()==="attribute  default"){
            attributeDefaults=attributeDefaults.concat([
                {
                    "defaultLocation":index,
                    "lastValueLocation":attributeValueLocations[attributeValueLocations.length-1]
                }
            ]);
        }
        return null
    })

    if(attributeNameLocations.length!==attributeValueLocations.length){
        return {
            error:true,
            errorType:"Attribute name and value header not equal "
        }
    }

    attributeDefaults.forEach(defData=>{
        if(defData.defaultLocation && defData.lastValueLocation){
            if(thisData[defData.defaultLocation].trim()!=="" && thisData[defData.lastValueLocation].indexOf(thisData[defData.defaultLocation])===-1){
                errors.push("Default attribute value "+thisData[defData.defaultLocation]+" is not among attibute values ");
            }
        }
    })

    attributeNameLocations.map((nameLocation,index)=>{
        const attValues=thisData[attributeValueLocations[index]].toLowerCase();

        if(attributeNamesToAvoid.indexOf(thisData[nameLocation].toLowerCase())!==-1){
            errors.push("Invalid attribute name "+thisData[nameLocation]);
            return null;
        }

        if(thisData[nameLocation]!=="" && thisData[attributeValueLocations[index]]===""){
            errors.push("No value for attribute "+thisData[nameLocation]);
        }

        if(thisData[nameLocation]==="" && thisData[attributeValueLocations[index]]!==""){
            errors.push("No attribute name for "+thisData[attributeValueLocations[index]]);
        }

        if(attValues.indexOf(" and ")!==-1 || attValues.indexOf("&")!==-1 || attValues.indexOf("/")!==-1 || attValues.indexOf("\\")!==-1 || attValues.indexOf("+")!==-1){
            errors.push("Possible concatinated value for "+thisData[nameLocation]+", seperate it by comma");
            return null;
        }

        let allAttributeValues=thisData[attributeValueLocations[index]].split(",")
        for(var thisAttributeCount=0;thisAttributeCount<allAttributeValues.length;thisAttributeCount++){
            attValStart=0
            attValueEnd=allAttributeValues[thisAttributeCount].length

            for(var thisAttributeLength=0;thisAttributeLength<allAttributeValues[thisAttributeCount].length;thisAttributeLength++){
                if(allAttributeValues[thisAttributeCount][thisAttributeLength]!==" "){
                    attValStart=thisAttributeLength
                    break;
                }
            }

            for( thisAttributeLength=allAttributeValues[thisAttributeCount].length-1;thisAttributeLength>=0;thisAttributeLength--){
                if(allAttributeValues[thisAttributeCount][thisAttributeLength]!==" "){
                    attValueEnd=thisAttributeLength+1
                    break;
                }
            }

            allAttributeValues[thisAttributeCount]= allAttributeValues[thisAttributeCount].substr(attValStart,attValueEnd-attValStart)

            if(allAttributeValues[thisAttributeCount].length>15){
                errors.push("Lengthy attribute value "+allAttributeValues[thisAttributeCount]);
            }

        errors.push(validateAttributeFormat(thisData[nameLocation],allAttributeValues[thisAttributeCount]))
        }
        return null
    })

    errors.map(err=>{
        if(err!==""){
            if(errorType!==""){
                errorType+=" --- "
            }
            errorType+=err
        }
        return null;
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

const validateAttributeFormat=function(attributeName,attributeValue){
    let attributeFormatData=AttributeFormats(),regex
    attributeFormatData=attributeFormatData.attributeFormats
    for(var attCount=0;attCount<attributeFormatData.length;attCount++){
        if(attributeName===attributeFormatData[attCount].name){
          for(var unitCount=0;unitCount<attributeFormatData[attCount].units.length;unitCount++){
              if(attributeFormatData[attCount].space){
              regex=new RegExp(`\\d (${attributeFormatData[attCount].units[unitCount]})$`)
              }
              else{
                regex=new RegExp(`\\d(${attributeFormatData[attCount].units[unitCount]})$`)
              }
              if(attributeValue.match(regex)){
                  return ""
              }
              if(attributeFormatData[attCount].shouldHaveNumber && attributeFormatData[attCount].shouldHaveNumber==="partial"){
                if(attributeValue===attributeFormatData[attCount].units[unitCount]){
                    return ""
                }
              }
              if(unitCount===attributeFormatData[attCount].units.length-1){
                return "Invalid attribute format "+attributeName+":"+attributeValue+""
              }
          }
        }
    }

    return ""
}