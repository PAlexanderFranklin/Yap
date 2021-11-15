import './UploadArea.css';
import { parseSkylink } from 'skynet-js';
import { useContext, useState } from 'react';
import { SkynetContext } from '../state/SkynetContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function UploadArea(props) {

    const { blob, blobURL,
        uploaded, setUploaded,
        localSkyLinks, setLocalSkyLinks,
        fileName, setFileName } = props;
    const [ skyLinkURL, setSkyLinkURL ] = useState("");
    const [ uploading, setUploading ] = useState(false);

    const { client, mySky, dataDomain } = useContext(SkynetContext);
    
    async function upload() {
        try {
            setUploading(true);
            let tempFileName = fileName;
            if (tempFileName === "") {
                tempFileName = new Date().toLocaleString();
                setFileName(tempFileName);
            }
            const audioFile = new File(
                [blob],
                tempFileName + ".mp3",
                {type: blob.type}
            );
            let response = await client.uploadFile(audioFile);
            const tempSkyLink = parseSkylink(response.skylink);
            const tempSkyLinkURL = await client.getSkylinkUrl(tempSkyLink);
            setSkyLinkURL(tempSkyLinkURL);
            setUploaded(true);
            setUploading(false);
            setLocalSkyLinks([...localSkyLinks, tempSkyLinkURL]);
            if (await mySky.checkLogin()) {
                try {
                    let response = await mySky.getJSON(
                        dataDomain + "/yaps.json");
                    const skylinks = JSON.parse(response.data.skylinks);
                    await mySky.setJSON(
                        dataDomain + "/yaps.json",
                        {skylinks: JSON.stringify([...skylinks, tempSkyLink])}
                    );
                }
                catch (error) {
                    console.log(error);
                    await mySky.setJSON(
                        dataDomain + "/yaps.json",
                        {skylinks: JSON.stringify([tempSkyLink])}
                    );
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="UploadArea">
            <audio src={blobURL}
                controls="controls"
            />
            { uploading || uploaded ?
                <h3>{fileName}</h3>
                :
                <input
                    type="text"
                    placeholder="(optional) Name recording"
                    onChange={(event) => {setFileName(event.target.value)}}
                    className="name_file"
                />
            }
            { !uploaded ? (uploading ?
                    <button className="UploadButton">
                        Uploading
                    </button>
                    :
                    <button className="UploadButton" onClick={upload}>
                        Upload
                    </button>
                ) : 
                <div className="success">
                    <CopyToClipboard text={skyLinkURL}>
                        <p className="UploadButton">Copy link</p>
                    </CopyToClipboard>
                </div>
            }
        </div>
    );
}

export default UploadArea;
