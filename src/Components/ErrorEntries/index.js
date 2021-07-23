import ErrorEntry from '../ErrorEntry'
import {useSelector} from 'react-redux'

const ErrorEntries=function(){

    const errorEntries=useSelector(state=>state.errorData)
    const fileUpload=useSelector(state=>state.peDatas)

    if(fileUpload.headers && fileUpload.headers.length===0){
        return (<></>)
    }

    if(!errorEntries){
        return (<></>)
    }
    
    return (<>
    {errorEntries.length===0 ? "No Error" :
    <>
        <table className="errorEntryTable">
            
            {errorEntries.length>0 && 
            <thead>
            <tr style={{backgroundColor:"#f5f5f5",fontWeight:600}}>
                <td>Name</td>
                <td>SKU</td>
                <td>Errors</td>
            </tr>
            </thead>
            }
            <tbody>
            {errorEntries.map((errorEntry,index)=><ErrorEntry errorEntry={errorEntry} key={index}/>)}
            </tbody>
        </table>
       <button type="button" onClick={()=>{downloadErrorFile(errorEntries)}}>Download</button>
        </>
    }
        </>
    )
}

const downloadErrorFile = function(errorEntries){
    const downloadLink = document.getElementById("errorFileDownloadLink");
    if(!downloadLink){
    const data=getErrorData(errorEntries);

    if(typeof data !== "object" || typeof data[0] !== "object") return;

    const filename=todayDate()+"_errorfile"
    
    let csv='data:text/csv;charset=utf-8,';
        // construct headers

    let first=true;
        Object.keys(data[0]).map((dataKey)=>{
           if(first){
            csv+=dataKey
            first=false;
           }
           else{
            csv+=","+dataKey
           }
            return null;
        })
        csv+='\n';

        // construct data
        data.map(errorData => {
            first=true;
            Object.keys(errorData).map((key)=>{
               let dataContent = errorData[key].replaceAll('#','') 
                
               if(first){
                csv+=dataContent
                first=false
               }
               else{
                csv+=','+dataContent
               }
                return null
            })
            csv+='\n'
            return null
        })     
        const errorFileLink = document.createElement("a");
        errorFileLink.setAttribute("id","errorFileDownloadLink");
        errorFileLink.setAttribute("href",encodeURI(csv));
        errorFileLink.setAttribute("download",filename+".csv")

        document.body.appendChild(errorFileLink)
        errorFileLink.click();
    }
    else
    {
        downloadLink.click();
    }
}

function getErrorData(errors){
    let data=[]
    errors.map(err=>{
        let newErrorData={}
        newErrorData.name=err.name
        newErrorData.sku=err.sku
        Object.keys(err.errors).map((key)=>{
          
                newErrorData[key]=err.errors[key]?err.errors[key]:""
            
            return null
        })
        data.push(newErrorData)
        return null;
    })
    return data

}

const todayDate=function(){
    const dt=new Date();
    const tday=dt.getDate()
    const mDay=dt.getMonth()+1
    const yDay=dt.getFullYear()
    return tday+"-"+mDay+"-"+yDay
}

export default ErrorEntries;