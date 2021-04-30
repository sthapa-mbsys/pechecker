import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {FileUploadAction,fileRemoveAction,error_remove_action} from '../Actions'
import {CSVReader} from 'react-papaparse'
import FileReader from '../FileReader'

const FileUploader=function(){
    const [peData,setPEData]=useState({});
    const dispatch=useDispatch();

    const SubmitHandler=function(){
        if(JSON.stringify(peData)==="{}"){
            alert("Upload valid CSV file");
            return false;
        }
        dispatch(FileUploadAction(peData))
    };

    const fileChangeHandler=function(data){
        let mData,eligible,modifiedData,finalEligibleData;
        modifiedData=data.map(function(dataList,index){
            mData=dataList.data;
            eligible=false;
            if(index>0){
            for(var count=0;count<dataList.data.length;count++){
                if(dataList.data[count]!==""){
                    eligible=true;
                    break;
                }
            }
            }

            mData[mData.length]=eligible;
        
            return mData;
        });
        
        finalEligibleData=modifiedData.filter(individualData=>individualData[individualData.length-1])

        const headersOnLowerCase=data[0].data.map((head)=>{
            try{
            return head.toLowerCase()
             }
            catch(err){
                console.log("err ",err);
            }
            return head;
        }
        )

     setPEData({headers:headersOnLowerCase,entries:finalEligibleData});
    }

    const fileRemoveHandle=function(){
        dispatch(fileRemoveAction())
        dispatch(error_remove_action())
    }

    const errorHandler=function(e){
        console.log(e)
        alert("error occured!!")
    }

    return (
        <div>
            <h3>PE Checker</h3>
            <CSVReader multiple onDrop={fileChangeHandler} onError={errorHandler} addRemoveButton onRemoveFile={fileRemoveHandle}>Drop CSV file here to upload</CSVReader>
            <FileReader SubmitHandler={SubmitHandler}/>            
        </div>
    )
}

export default FileUploader;