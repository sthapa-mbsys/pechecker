const ErrorEntry=function({errorEntry}){
    return (
   
            <tr>
             <td> {errorEntry.name} </td> 
             <td> {errorEntry.sku}  </td>
             <td>
            {Object.keys(errorEntry.errors).map((key,index)=>{
                return(
                <span key={index}>
                {errorEntry.errors[key] && <li style={{color:"red",padding:"0 3px"}}>{errorEntry.errors[key]}</li>}
                </span>
                )
            })}
            </td>
            </tr>
      
    )
}

export default ErrorEntry