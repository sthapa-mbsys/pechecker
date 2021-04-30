import ErrorEntry from '../ErrorEntry'
import {useSelector} from 'react-redux'
import {CSVDownloader} from 'react-papaparse'

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
       <CSVDownloader type="button" data={getErrorData(errorEntries)} filename={todayDate()+"_errorfile"}>Download</CSVDownloader>
        </>
    }
        </>
    )
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