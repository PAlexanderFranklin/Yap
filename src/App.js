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
  const [fileName, setFileName] = useState("");

  navigator.mediaDevices.getUserMedia({ audio: true },
    () => {},
    () => {},
  );

  return (
    <div className="App">
      <div className="content">
      <img src={yapLogo} alt="Yap Logo" className="logo" />
        <p className="instructions">
          Tap and hold below to record.
        </p>
        <div className="recorder_container">
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
              setFileName("");
            }}
            onRecordingError={(err) => {
              console.log("recording error", err)
            }}
          />
        </div>
        {blobURL !== "" ? 
          <UploadArea
            blob={blob}
            blobURL={blobURL}
            uploaded={uploaded}
            setUploaded={setUploaded}
            localSkyLinks={localSkyLinks}
            setLocalSkyLinks={setLocalSkyLinks}
            fileName={fileName}
            setFileName={setFileName}
          /> : ""}
        <SkynetButtons/>
      </div>
      <Navigation
        localSkyLinks={localSkyLinks}
        setLocalSkyLinks={setLocalSkyLinks}
      />
      <p className="plug">
        Skapp created by Alexander Franklin.
        Source code available at <a
          href="https://github.com/PAlexanderFranklin/Yap"
          className="github_link"
          >
            Github
          </a>
      </p>
    </div>
  );
}

export default App;
