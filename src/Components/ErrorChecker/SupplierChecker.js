export const SupplierDataChecker=function(thisData,header){
    let supplierPriceLocation,supplierNameLocation,typeLocation,errorType=""
    header.map((head,index)=>{
        if(!head) return null
        if(head.toLowerCase()==="type"){
            typeLocation=index
        }
        else if(head.toLowerCase()==="meta:supplier_cost_actual"){
            supplierPriceLocation=index
        }
        else if(head.toLowerCase()==="meta:product_supplier"){
            supplierNameLocation=index
        }

        return null
    })

    if(thisData[supplierPriceLocation]===""){
        errorType="No Supplier Price"
    }

    if(thisData[supplierNameLocation]==="" && thisData[typeLocation].toLowerCase()!=="variation"){
        if(errorType!==""){
            errorType+=", "
        }
        errorType+="No Supplier Name"
    }

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