import { useState } from 'react';
import './App.css';
import yapLogo from './images/YapLogo.png';
import Recorder from 'react-mp3-recorder';
import SkynetButtons from './Components/SkynetButtons';
import UploadArea from './Components/UploadArea';
import Navigation from './Components/Navigation';

function App() {

  const [blob, setBlob] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [localSkyLinks, setLocalSkyLinks] = useState([]);

  navigator.getUserMedia({ audio: true },
    () => {},
    () => {},
  );

  return (
    <div className="App">
      <div className="content">
      <img src={yapLogo} alt="Yap Logo" />
        Tap and hold to record.
        <Recorder 
          onRecordingComplete={(blob) => {
            setBlob(blob);
            setUploaded(false);
          }}
          onRecordingError={(err) => {
            console.log("recording error", err)
          }}
        />
        {blob !== "" ? <audio src={URL.createObjectURL(blob)}
          controls="controls" /> : ""}
        {blob !== "" ? 
          <UploadArea blob={blob}
            uploaded={uploaded}
            setUploaded={setUploaded}
            setLocalSkyLinks={setLocalSkyLinks}
          /> : ""}
        <SkynetButtons />
        <Navigation
          localSkyLinks={localSkyLinks}
        />
      </div>
    </div>
  );
}

export default App;
