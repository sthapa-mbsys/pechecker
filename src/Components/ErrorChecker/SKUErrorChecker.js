export const SKUChecker=function(data,headerData){
    const skuPosition=headerData.indexOf("sku");
    if(data[skuPosition]===""){ 
        return {
        error:true,
        errorType:"Empty SKU"
    }
    }
    return {
        error:false
    }
}