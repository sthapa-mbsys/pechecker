import {useState} from 'react'
const ErrorInfo=function(){
    const [showInfo,setInfoStatus]=useState(false)

    const infoStatusChanger=function(){
        setInfoStatus(!showInfo)
    }

    const errorExamples=[
        {
            example:"Attribute name and value header not equal",
            description:"Make sure total number of Attribute Name and Attribute Value(s) are equal"
        },
        {
            example:"Invalid attribute format",
            description:"Attribute format is not as per standardized format, may be has extra space or unit might have to be added as standard one"
        },
        {
            example:"No/Wrong attribute name Expected ",
            description:"Wrong attribute name in variation product with reference to parent product"
        },
        {
            example:"Invalid attribute",
            description:"Wrong attribute value in variation product with refernce to parent product's related attribute values"
        },
        {
            example:"Additional attribute",
            description:"Inclusion of non varying attribute on variation product"
        },
        {
            example:"Empty Category",
            description:"Category field is empty"
        },
        {
            example:"Could not check for category",
            description:"Predefined category list ended one step earlier, maybe need to add this category among predefined one"
        },
        {
            example:"Category not found ",
            description:"Wrong category name, maybe has extra space or spelling mistake"
        },
        {
            example:"Incomplete Attribute Headers",
            description:"No same number of attribute name, value, visible, global field, maybe because of extra space or wrong spelling"
        },
        {
            example:"Headers not found",
            description:"Missing necessary header"
        },
        {
            example:"No Valid Regular Price",
            description:"Invalid content on regular price field"
        },
        {
            example:"No Valid Sale Price",
            description:"Invalid content on sale price field"
        },
        {
            example:"Sale price greater than regular price",
            description:"Sale price field value greater than regular price field"
        },
        {
            example:"Invalid supplier price",
            description:"Invalid content on supplier price field"
        },
        {
            example:"Sale price less than supplier price",
            description:"Sale price field value less than supplier price field value"
        },
        {
            example:"Regular price less than supplier price",
            description:"Regular price field value less than supplier price field value"
        }
    ]

    return (
        <div>
            <button onClick={infoStatusChanger} style={{marginLeft:"90%"}}>{showInfo?"Hide Error Info":"Show Error Info"}</button>
        {showInfo && <table style={{width:"100%",border:"1px solid black"}}>
            <thead>
                <td style={{borderBottom:"1px solid black",borderRight:"1px solid black"}}>
                    Error Message Example
                </td>
                <td style={{borderBottom:"1px solid black"}}>
                    Description
                </td>
            </thead>
            {errorExamples.map(err=>
                <tr>
                    <td style={{borderBottom:"1px solid black",borderRight:"1px solid black",textAlign:"left"}}>
                        {err.example}
                    </td>
                    <td style={{borderBottom:"1px solid black",textAlign:"left"}}>
                        {err.description}
                    </td>
                    </tr>
            )}
            </table>}
        </div>
    )
}

export default ErrorInfo;