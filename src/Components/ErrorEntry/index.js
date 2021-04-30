const ErrorEntry=function({errorEntry}){
    return (
   
            <tr>
             <td> {errorEntry.name} </td> 
             <td> {errorEntry.sku}  </td>
             <td>
            {Object.keys(errorEntry.errors).map((key,index)=>{
                return(
                <span key={index}>
                  
                {errorEntry.errors[key] && <span style={{color:"red",padding:"0 3px",borderRight:"2px solid black"}} >{errorEntry.errors[key]}</span>}
                </span>
                )
            })}
            </td>
            </tr>
      
    )
}

export default ErrorEntry