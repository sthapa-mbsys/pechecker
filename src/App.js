import './App.css';
import FileUploader from './Components/FileUploader'
import ErrorEntries from './Components/ErrorEntries'
import ErrorInfo from './Components/ErrorInfo'
function App() {
  return (
    <div className="App">
      <div className="container">
     <FileUploader/>
     <ErrorInfo/>
     <ErrorEntries/>
     </div>
    </div>
  );
}

export default App;
