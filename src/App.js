import { useState } from 'react';
import { MySky, SkynetClient } from 'skynet-js';
import './App.css';
import yapLogo from './images/YapLogo.png';
import Recorder from 'react-mp3-recorder';
import SkynetButtons from './Components/SkynetButtons';
import UploadButton from './Components/UploadButton';

function App() {

  const [blob, setBlob] = useState("");

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
      <div className="content">
    <img src={yapLogo} />
        Tap and hold to record.
        <Recorder 
          onRecordingComplete={(blob) => {
            setBlob(blob);
          }}
          onRecordingError={(err) => {
            console.log("recording error", err)
          }}
        />
        <audio src={blob} controls="controls" />
        {blob !== "" ?
          <UploadButton blob={blob} />
          : ""}
        <SkynetButtons />
      </div>
    </div>
  );
}

export default App;
