import './UploadButton.css';
import { MySky, SkynetClient } from 'skynet-js';
import { FileSystemDAC } from "fs-dac-library";
import { useState } from 'react';

function UploadButton(props) {

    const {blob} = props;
    const [skyLink, setSkyLink] = useState("");

    async function upload() {
        const SkyClient = new SkynetClient("https://siasky.net");
        const fileSystemDAC = new FileSystemDAC();
        const mySky = await SkyClient.loadMySky("localhost:3000", {});
        await mySky.loadDacs(fileSystemDAC);
        try {
            let audioFile = new File([blob], "audio.mp3");
            let { skyLinkResponse } = await SkyClient.uploadFile(audioFile);
            setSkyLink(skyLinkResponse);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <button className="UploadButton" onClick={upload}>
                Upload
            </button>
            {skyLink !== "" ? skyLink : ""}
        </div>
    );
}

export default UploadButton;
