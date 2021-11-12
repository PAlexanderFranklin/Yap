import { useState } from 'react';
import { MySky, SkynetClient } from 'skynet-js';
import './App.css';
import Recorder from 'react-mp3-recorder';
import SkynetButtons from './Components/SkynetButtons';
import UploadButton from './Components/UploadButton';

function App() {

  const [blobURL, setBlobURL] = useState("");
  const [skyLink, setSkyLink] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  
  const skyClient = new SkynetClient();
  const mySky = skyClient.loadMySky("localhost:3000", {});
  // setLoggedIn(mySky.checkLogin())

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
        Tap and hold to record.
        <Recorder 
          onRecordingComplete={(blob) => {
            setBlobURL(URL.createObjectURL(blob));
          }}
          onRecordingError={(err) => {
            console.log("recording error", err)
          }}
        />
        <audio src={blobURL} controls="controls" />
        {blobURL !== "" ?
          <UploadButton
            blobURL={blobURL}
            setSkyLink={setSkyLink}
            skyClient={skyClient}
            mySky={mySky}
            loggedIn={loggedIn}
          />
          : ""}
        {skyLink !== "" ? skyLink : ""}
      </div>
    </div>
  );
}

export default App;
