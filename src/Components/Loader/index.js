import Loading from './loader.js';
import {useSelector} from 'react-redux';

const Loader=function(){
    const loaderState=useSelector(state=>state.loaderState.showLoader);
  //  const errorEntries=useSelector(state=>state.errorData)
 //   const fileUpload=useSelector(state=>state.peDatas)

    if(loaderState){
        return <Loading/>
    }
    return <></>
}

export default Loader;