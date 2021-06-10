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
        image=image.replaceAll(" ","").replaceAll("\n","");
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

    let image,bigImages=[],unknownImages=[],imageSize;

    const images=thisData[imageLocation].split(",");
    for(var imgCount=0;imgCount<images.length;imgCount++){
        image=images[imgCount].trim();
     const fileImg= getImageSize(image);
        if(fileImg){
             imageSize=fileImg/1024;
            imageSize=imageSize.toFixed(2);
            if(imageSize>200){
                bigImages=bigImages.concat(images[imgCount]+" SIZE: "+imageSize+" KB");
            }
        }
        else{
            unknownImages=unknownImages.concat(images[imgCount])
        }
    }

    if(bigImages.length>0 || unknownImages.length>0){
        let imgErr='';
        if(bigImages.length>0){
            imgErr="LARGE IMAGES DETECTED ";
            for(var bigImgCount=0;bigImgCount<bigImages.length;bigImgCount++){
                if(bigImgCount!==0){
                    imgErr+=", "+bigImages[bigImgCount];
                }
                else{
                    imgErr+=bigImages[bigImgCount];
                }
            }
        }
        if(unknownImages.length>0){
            imgErr=" CHECK LINK FOR ";
            for(var unknownImgCount=0;unknownImgCount<unknownImages.length;unknownImgCount++){
                if(unknownImgCount!==0){
                    imgErr+=", "+unknownImages[unknownImgCount];
                }
                else{
                    imgErr+=unknownImages[unknownImgCount];
                }
            }
        }
        return {
            error:true,
            errorType:imgErr
        }
    }

    return {
        error:false
    }
    
}

function getImageSize(url) {
    var fileSize='';
    try{
    const xhr=new XMLHttpRequest();
    xhr.open("GET",url,false);
    xhr.send(null);
    if(xhr.status===200){
        fileSize=xhr.getResponseHeader('content-length');
    }
    }
    catch(error){
        console.log("Error: ",error);
    }
    return fileSize;
}