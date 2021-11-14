import { useState } from 'react';
import './App.css';
import yapLogo from './images/YapLogo.png';
import Recorder from 'react-mp3-recorder';
import SkynetButtons from './Components/SkynetButtons';
import UploadArea from './Components/UploadArea';
import Navigation from './Components/Navigation';

function App() {

  const [blob, setBlob] = useState("");
  const [blobURL, setBlobURL] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [localSkyLinks, setLocalSkyLinks] = useState([]);

  navigator.mediaDevices.getUserMedia({ audio: true },
    () => {},
    () => {},
  );

  return (
    <div className="App">
      <div className="content">
      <img src={yapLogo} alt="Yap Logo" className="logo" />
        <p>Tap and hold to record.</p>
        <Recorder 
          onRecordingComplete={(blob) => {
            setBlob(blob);
            try {
              setBlobURL(URL.createObjectURL(blob))
            }
            catch (error) {
              console.log(error);
            }
            setUploaded(false);
          }}
          onRecordingError={(err) => {
            console.log("recording error", err)
          }}
        />
        {blobURL !== "" ? 
          <UploadArea
            blob={blob}
            blobURL={blobURL}
            uploaded={uploaded}
            setUploaded={setUploaded}
            localSkyLinks={localSkyLinks}
            setLocalSkyLinks={setLocalSkyLinks}
          /> : ""}
        <SkynetButtons />
        <Navigation
          localSkyLinks={localSkyLinks}
          setLocalSkyLinks={setLocalSkyLinks}
        />
      </div>
    </div>
  );
}

export default App;
