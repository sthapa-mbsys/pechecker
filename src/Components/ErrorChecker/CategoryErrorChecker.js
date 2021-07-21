import {GetCategories} from './Categories'
export const categoryChecker=function(data,headerData){
        let errorType=""
        const categoryPosition=headerData.indexOf("categories");
        const productTypePosition=headerData.indexOf("type");
        if(data[productTypePosition].toLowerCase()!=="variation"){
        if(data[categoryPosition]===""){ 
            return{
            error:true,
            errorType:"Empty Category"
        }
        }

        // check if category is among predefined categories
        errorType+=isAmongPredefinedCategories(data[categoryPosition])

        }

        if(errorType!==""){
            return {
                error:true,
                errorType
            }
        }

        return {
            error:false,
            standardCategoryAttributes:maintainStandardCategoryAttributes
        }
    }

const isAmongPredefinedCategories=function(entryCategories){
    let allCategories=[],structuredCategory,categoryName,parentGroup,errorType="",lengthOfParentGroup
    const categoriesData=GetCategories()
    const categories=categoriesData.categories

    allCategories=entryCategories.split(",")

    allCategories.map(multipleCategory=>{
        if(errorType!=="") return null
        structuredCategory=multipleCategory.split(">")
        parentGroup=null
        structuredCategory.map(cat=>{
            if(errorType!=="") return null
            // for(var charCount=0;charCount<cat.length;charCount++){
            //     if(cat[charCount]!==" "){
            //         nonEmptyStartAt=charCount
            //         break;
            //     }
            // }

            // for(charCount=cat.length-1;charCount>=0;charCount--){
            //     if(cat[charCount]!==" "){
            //         nonEmptyEndAt=charCount+1
            //         break;
            //     }
            // }

            categoryName=cat.trim().replaceAll('/n','').replaceAll('/t','');
            categoryName=categoryName.replace("&#44;",",")

            if(!parentGroup){
                parentGroup=categories
            }

            lengthOfParentGroup=parentGroup.length

            if(lengthOfParentGroup===0){
                if(errorType!=="") errorType+=" --- "
                errorType+="Could not check for category "+categoryName
            }

            for(var childCount=0;childCount<lengthOfParentGroup;childCount++){
                if(categoryName.toLowerCase()===parentGroup[childCount].name.toLowerCase()){

                    if(parentGroup[childCount].passAttributeToChild !== 'undefined' && parentGroup[childCount].passAttributeToChild){
                        if(typeof parentGroup[childCount].attributes !== 'undefined'){
                            lastGlobalAttributes=parentGroup[childCount].attributes
                        }
                    }

                    if(lastGlobalAttributes.length!==0 || typeof parentGroup[childCount].attributes !== 'undefined'){
                        const thisCategory=parentGroup[childCount].name
                        const duplicateCheck=maintainStandardCategoryAttributes.filter(standAtt => standAtt.category === thisCategory)
                        if(duplicateCheck.length===0){
                            maintainStandardCategoryAttributes.push({
                                category:thisCategory,
                                attributes:typeof parentGroup[childCount].attributes !== 'undefined' ? parentGroup[childCount].attributes : lastGlobalAttributes,
                            })
                        }
                    }

                    parentGroup=parentGroup[childCount].child
                    break
                }
                if(lengthOfParentGroup-1===childCount){
                    if(errorType!=="") errorType+=" --- "
                    errorType+="Category not found "+categoryName
                }
            }

            return null;
        }
        )
        lastGlobalAttributes=[]
        return null;
    })
    return errorType;
}

let maintainStandardCategoryAttributes=[]
let lastGlobalAttributes=[]