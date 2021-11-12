import { useState } from 'react';
import './App.css';
import RecordAudio from './Components/RecordAudio';

function App() {

  const {recording, setRecording} = useState(false);

  return (
    <div className="App">
      <div className="content">
        <RecordAudio
          recording={recording}
          setRecording={setRecording}
        />
      </div>
    </div>
  );
}

export default App;
