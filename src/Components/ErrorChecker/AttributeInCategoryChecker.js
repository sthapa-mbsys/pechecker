export const attributeInCategoryCheck=(attributeName,category,standardCategoryAttributes)=>{
    let categoriesToCheck=[],splittedCat,finalizedAttributeName

    if(typeof attributeName !== 'object') return
    if(typeof category !== 'string') return
    if(typeof standardCategoryAttributes !== 'object' || standardCategoryAttributes.length===0) return

    finalizedAttributeName=attributeName.filter(name=>name!=="");
    if(finalizedAttributeName.length===0) return;

    const multipleCategoryBreakDown = category.split(',')

    switch(checkCategoryAt){
        case 'first':
            categoriesToCheck=multipleCategoryBreakDown.map(multipleCat=>{
                 splittedCat=multipleCat.split('>')
                 return splittedCat[0].trim().toLowerCase().replaceAll('/n','').replaceAll('/t','')
            })
            break;
        default:
            categoriesToCheck=multipleCategoryBreakDown.map(multipleCat=>{
                splittedCat=multipleCat.split('>')
                return splittedCat[splittedCat.length-1].trim().toLowerCase().replaceAll('/n','').replaceAll('/t','')
           })
    }
    return compareCategoryAttribute(categoriesToCheck,attributeName,standardCategoryAttributes)

}

const compareCategoryAttribute = (category,attributes,standardList) => {
    let standardAttributes,matchedAll = false,notFoundAttributes=[],attributeFoundIndex,error='',inGlobalAttributes;
    category.forEach(cat=>{
        if(matchedAll) return
        
        cat=cat.replaceAll('&#44;',',')

        standardAttributes=standardList.find(list=>list.category.toLowerCase().trim()===cat.toLowerCase().trim())

        if(standardAttributes && typeof standardAttributes.attributes === 'object'){
            standardAttributes=standardAttributes.attributes
            for(var attCount=0;attCount<attributes.length;attCount++){
                const thisAttribute=attributes[attCount].toLowerCase().trim()
                if(thisAttribute==="") continue;

                inGlobalAttributes=globalAttributes.indexOf(thisAttribute)
                if(inGlobalAttributes===-1){
                attributeFoundIndex=standardAttributes.findIndex(std=>std.toLowerCase().trim()===thisAttribute)

                if(attributeFoundIndex === -1){
                    if(notFoundAttributes.indexOf(attributes[attCount]) === -1){
                        notFoundAttributes.push(attributes[attCount])
                    }
                    continue;
                }
                }
                if(attCount+1===attributes.length) matchedAll=true;
            }

        }
    })

    if(!matchedAll){
        notFoundAttributes.forEach(attName => {
            if(error === ''){
                error="Found non standardized attributes : "+attName
            }
            else{
                error+=", "+attName
            }
        })
        return error
    }

    return
}

const checkCategoryAt = 'last'
const globalAttributes=["brand"]