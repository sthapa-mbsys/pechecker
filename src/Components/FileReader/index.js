import {useSelector,useDispatch} from 'react-redux'
import {error_entry_action} from '../Actions'
import {HeaderChecker} from '../ErrorChecker/HeaderChecker'
import {SKUChecker as skuChecker} from '../ErrorChecker/SKUErrorChecker'
import {categoryChecker} from '../ErrorChecker/CategoryErrorChecker'
import {VariationErrorChecker as variationChecker} from '../ErrorChecker/VariationErrorChecker'
import {AttributeFormatChecker} from '../ErrorChecker/AttributeFormatChecker'
import {PriceChecker} from '../ErrorChecker/PriceChecker'
import {SupplierDataChecker} from '../ErrorChecker/SupplierChecker'
import {GeneralChecker} from '../ErrorChecker/GeneralChecker'
import {PriceComparator} from '../ErrorChecker/PriceComparatorChecker'
import {ImageChecker} from '../ErrorChecker/ImageChecker'
import {DescriptionCheck} from '../ErrorChecker/DescriptionChecker'
import {show_loader_action,hide_loader_action} from '../Actions'

const FileReader=function({SubmitHandler}){

    const headerData=useSelector(state=>state.peDatas.headers);
    const entries=useSelector(state=>state.peDatas.entries);

    const dispatch=useDispatch();
    const start_check=function(){

        let headerResult,skuResult,categoryResult,variationResult,attributeFormatResult,priceResult,supplierResult,imageErrorResult,descriptionErrorResult,generalErrorResult,newErrorEntry,priceComparatorErrorResult,existingErrors=[];
        
        headerResult=HeaderChecker(headerData)

        if(headerResult.error){
            alert("header error "+headerResult.errorType)
            dispatch(hide_loader_action()); 
            return;
        }

        for(var entryCount=0;entryCount<entries.length;entryCount++){
         skuResult=skuChecker(entries[entryCount],headerData)
         categoryResult=categoryChecker(entries[entryCount],headerData)
         priceResult=PriceChecker(entries[entryCount],headerData)
         variationResult=variationChecker(entries,entries[entryCount],headerData)
         attributeFormatResult=AttributeFormatChecker(entries[entryCount],headerData)
         supplierResult=SupplierDataChecker(entries[entryCount],headerData)
         generalErrorResult=GeneralChecker(entries[entryCount],headerData)
         priceComparatorErrorResult=PriceComparator(entries[entryCount],headerData)
         imageErrorResult=ImageChecker(entries[entryCount],headerData)
         descriptionErrorResult=DescriptionCheck(entries[entryCount],headerData)

         if(skuResult.error || categoryResult.error || variationResult.error || attributeFormatResult.error || priceResult.error || supplierResult.error || generalErrorResult.error || priceComparatorErrorResult.error || imageErrorResult.error || descriptionErrorResult.error){
            newErrorEntry={
                name:entries[entryCount][headerData.indexOf("name")],
                sku:entries[entryCount][headerData.indexOf("sku")],
                errors:{
                    skuError:skuResult.error?skuResult.errorType:false,
                    categoryError:categoryResult.error?categoryResult.errorType:false,
                    priceError:priceResult.error?priceResult.errorType:false,
                    variationError:variationResult.error?variationResult.errorType:false,
                    attributeFormatError:attributeFormatResult.error?attributeFormatResult.errorType:false,
                    imageError:imageErrorResult.error?imageErrorResult.errorType:false,
                    derscriptionError:descriptionErrorResult.error?descriptionErrorResult.errorType:false,
                    supplierError:supplierResult.error?supplierResult.errorType:false,
                    generalError:generalErrorResult.error?generalErrorResult.errorType:false,
                    priceComparatorError:priceComparatorErrorResult.error?priceComparatorErrorResult.errorType:false
                }
            }

            existingErrors=existingErrors.concat(newErrorEntry);

         }
        }
        
        dispatch(hide_loader_action()); 
        dispatch(error_entry_action(existingErrors));
    }

    return (<>
     {headerData.length===0 && entries.length===0 ?
     <button type="button" onClick={()=>{
            SubmitHandler()
    }}>Upload File</button>
    :
    <button type="button" onClick={()=>{
        dispatch(show_loader_action());
        setTimeout(()=>{
            start_check();
        },1000);
    }}>Compute Errors</button>
    }
    </>
    )
}

export default FileReader