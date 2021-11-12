import './RecordAudio.css';
import { BsFillMicFill } from 'react-icons/bs';

function RecordAudio(props) {

    const {recording, setRecording} = props;

    function tapMic() {
        if(!recording) {
            setRecording(true);
        }
        else {
            setRecording(false);
        }
    }

    let micClass = "";
    if(recording) {
        micClass = " recording";
    }

    return (
        <button className={"RecordAudio" + micClass} onClick={tapMic}>
            <BsFillMicFill className="Mic" />
        </button>
    );
}

export default RecordAudio;
