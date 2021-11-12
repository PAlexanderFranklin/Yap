import { useState } from 'react';
import './App.css';
import Recorder from 'react-mp3-recorder';
import SkynetButtons from './Components/SkynetButtons';

function App() {

  const [blobURL, setBlobURL] = useState("");

  navigator.getUserMedia({ audio: true },
    () => {
      console.log('Permission Granted');
    },
    () => {
      console.log('Permission Denied');
    },
  );

  return (
    <div className="App">
      <SkynetButtons />
      <div className="content">
        <Recorder 
          onRecordingComplete={(blob) => {
            setBlobURL(URL.createObjectURL(blob));
          }}
          onRecordingError={(err) => {
            console.log("recording error", err)
          }}
        />
        <audio src={blobURL} controls="controls" />
      </div>
    </div>
  );
}

export default App;
