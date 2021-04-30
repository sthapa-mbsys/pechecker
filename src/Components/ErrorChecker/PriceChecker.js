export const PriceChecker=function(thisData,header){
    let salePricePosition,regularPricePosition,supplierPricePosition

    header.map((head,index)=>{
        if(!head) return null
        if(head.toLowerCase()==="regular price"){
            regularPricePosition=index
        }
        else if(head.toLowerCase()==="sale price"){
            salePricePosition=index
        }
        else if(head.toLowerCase()==="meta:supplier_cost_actual"){
            supplierPricePosition=index
        }
        return null
    })

        if(thisData[regularPricePosition]==="" || isNaN(thisData[regularPricePosition])){
            return {
                error:true,
                errorType:"No Valid Regular Price"
            }
        }

        if(thisData[salePricePosition]!==""){
            if(isNaN(thisData[salePricePosition])){
                return{
                    error:true,
                    errorType:"No Valid Sale Price"
                }
            }

            if(Number(thisData[salePricePosition])>Number(thisData[regularPricePosition])){
                return {
                    error:true,
                    errorType:"Sale price greater than regular price"
                }
            }
        }

        if(supplierPricePosition){
            if(isNaN(thisData[supplierPricePosition])){
                return {
                    error:true,
                    errorType:"Invalid supplier price"
                }
            }

            if(thisData[salePricePosition]!=="" && !isNaN(thisData[salePricePosition])){
                if(Number(thisData[salePricePosition])<Number(thisData[supplierPricePosition])){
                    return {
                        error:true,
                        errorType:"Sale price less than supplier price"
                    }
                }
            }

            if(Number(thisData[regularPricePosition])<Number(thisData[supplierPricePosition])){
                return {
                    error:true,
                    errorType:"Regular price less than supplier price"
                }
            }
        }

        return {
            error:false
        }

}