import './UploadArea.css';
import { MySky, SkynetClient } from 'skynet-js';
import { FileSystemDAC } from "fs-dac-library";
import { useState } from 'react';

function UploadArea(props) {

    const {blob} = props;
    const [skyLink, setSkyLink] = useState("");

    const SkyClient = new SkynetClient("https://siasky.net");

    async function upload() {
        const fileSystemDAC = new FileSystemDAC();
        const mySky = await SkyClient.loadMySky("localhost:3000", {});
        await mySky.loadDacs(fileSystemDAC);
        try {
            const audioFile = new File([blob], "audio.mp3", {type: blob.type});
            let response = await SkyClient.uploadFile(audioFile);
            console.log(response.skyLink)
            setSkyLink(response.skyLink);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="UploadArea">
            <button className="UploadButton" onClick={upload}>
                Upload
            </button>
            <p>
                {skyLink}
            </p>
        </div>
    );
}

export default UploadArea;
