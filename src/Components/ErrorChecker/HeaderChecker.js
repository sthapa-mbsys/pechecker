export const HeaderChecker=function(header){
    let errorType="",attNameCount=0,attValueCount=0,attVisibleCount=0,attGlobalCount=0,currentHead,headerNotFound=""
    header.map(head=>{
        if(!head) return null
        currentHead=head.replace(/[0-9]/,'').toLowerCase()
        if(attributeHeaders.indexOf(currentHead)!==-1){
            if(currentHead.toLowerCase()==="attribute  name"){
                attNameCount++
            }    
            else if(currentHead.toLowerCase()==="attribute  value(s)"){
                attValueCount++
            }
            else if(currentHead.toLowerCase()==="attribute  visible"){
                attVisibleCount++
            }
            else if(currentHead.toLowerCase()==="attribute  global")
            {
                attGlobalCount++
            }
        }
        else {
          
            for(var reqHeadCount=0;reqHeadCount<requiredHeaders.length;reqHeadCount++){
                if(requiredHeaders[reqHeadCount].name.toLowerCase()===head.toLowerCase()){
                    requiredHeaders[reqHeadCount].found=true
                    break;
                }
            }
        }
        return null
    })

    if(attNameCount!==attValueCount || attNameCount!==attVisibleCount || attNameCount!==attGlobalCount){
        errorType=" Incomplete Attribute Headers"
    }

    requiredHeaders.map(reqHead=>{
        if(!reqHead.found){
            if(headerNotFound===""){
                headerNotFound="Headers not found: "
            }
            headerNotFound+=reqHead.name+" "
        }
        return null
    })

    if(headerNotFound!==""){
        errorType+=headerNotFound
    }

    if(errorType!==""){
        return {
            error:true,
            errorType
        }
    }

    return {error:false}
}

let requiredHeaders=[
    {
        name:"Type",
        found:false
    },
    {
        name:"SKU",
        found:false
    },
    {
        name:"Name",
        found:false
    },
    {
        name:"Published",
        found:false
    },
    {
        name:"Visibility in catalog",
        found:false
    },
    {
        name:"Short description",
        found:false
    },
    {
        name:"Description",
        found:false
    },
    {
        name:"meta:supplier_cost_actual",
        found:false
    },
    {
        name:"Regular price",
        found:false
    },
    {
        name:"In stock?",
        found:false
    },
    {
        name:"Categories",
        found:false
    },
    {
        name:"Images",
        found:false
    },
    {
        name:"Parent",
        found:false
    },
    {
        name:"meta:product_supplier",
        found:false
    }
]

const attributeHeaders=[
    "Attribute  name",
    "Attribute  value(s)",
    "Attribute  visible",
    "Attribute  global"
]