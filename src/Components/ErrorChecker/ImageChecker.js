export const ImageChecker=function(thisData,header){
    let imageLocation
    for(var hCount=0;hCount<header.length;hCount++){
        if(header[hCount]==="images"){
            imageLocation=hCount;
            break;
        }
    }
    if(!imageLocation){
        return {
            error:true,
            errorType:"Couldnot find image location"
        }
    }

    if(thisData[imageLocation]===""){
        return {
            error:true,
            errorType:"Empty image field"
        }
    }

    let spaceCount=0,commaCount=0,prevSpace=false,prevComma=false;
    for(var sCount=0;sCount<thisData[imageLocation].length;sCount++){
        if(thisData[imageLocation][sCount]===" " && !prevSpace && !prevComma && sCount!==thisData[imageLocation].length-1){
            spaceCount++;
            prevSpace=true
        }
        else{
            prevSpace=false
        }

        if(thisData[imageLocation][sCount]===","){
            commaCount++;
            prevComma=true
        }
        else{
            prevComma=false
        }
    }

    if(spaceCount>=commaCount+1){
        return {
            error:true,
            errorType:"Possible multiple images without comma"
        }
    }

    const splitedImages=thisData[imageLocation].split(",")
    let invalidImageErrors=""
    splitedImages.forEach(image=>{
        image=image.replaceAll(" ","");
        if(image.substr(-4).toLowerCase()!==".jpg" && image.substr(-5).toLowerCase()!==".jpeg"){
            if(invalidImageErrors){
                invalidImageErrors+=", "
            }
            invalidImageErrors+="Possible invalid image "+image
        }
        return null;
    })

    if(invalidImageErrors){
        return {
            error:true,
            errorType:invalidImageErrors
        }
    }

    return {
        error:false
    }
}