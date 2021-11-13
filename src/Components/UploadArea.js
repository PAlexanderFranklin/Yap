import './UploadArea.css';
import { parseSkylink } from 'skynet-js';
import { useContext, useState } from 'react';
import { SkynetContext } from '../state/SkynetContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function UploadArea(props) {

    const { blob, uploaded, setUploaded } = props;
    const [skyLinkURL, setSkyLinkURL] = useState("");

    const { client, mySky, dataDomain, fileSystem } = useContext(SkynetContext);

    async function upload() {
        try {
            const fileName = new Date();
            const audioFile = new File(
                [blob],
                fileName.toLocaleString() + ".mp3",
                {type: blob.type}
            );
            // if (await mySky.checkLogin()) {
            // }
            // else {
                const response = await client.uploadFile(audioFile);
                const tempSkyLink = parseSkylink(response.skylink);
                setSkyLinkURL(await client.getSkylinkUrl(tempSkyLink));
            // }
            setUploaded(true);
        }
        catch (error) {
            console.log(error);
        }
    }

    // async function testStuff() {
    //     console.log(await fileSystem.getDirectoryIndex(dataDomain + "/yaps"));
    // }

    return (
        <div className="UploadArea">
            { !uploaded ?
                <button className="UploadButton" onClick={upload}>
                    Upload
                </button>
                : <div className="success">
                    Your recording is uploaded at the link below!
                    <textarea defaultValue={skyLinkURL} readOnly={true} />
                    <CopyToClipboard text={skyLinkURL} className="UploadButton">
                        <span>Copy</span>
                    </CopyToClipboard>
                </div>
            }
            {/* <button className="UploadButton" onClick={testStuff}>
                Test Stuff
            </button> */}
        </div>
    );
}

export default UploadArea;
