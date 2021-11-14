import './UploadArea.css';
import { parseSkylink } from 'skynet-js';
import { useContext, useState } from 'react';
import { SkynetContext } from '../state/SkynetContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function UploadArea(props) {

    const { blob, uploaded, setUploaded, setLocalSkyLinks } = props;
    const [skyLinkURL, setSkyLinkURL] = useState("");

    const { client, mySky, dataDomain } = useContext(SkynetContext);
    
    async function upload() {
        try {
            const fileName = new Date();
            const audioFile = new File(
                [blob],
                fileName.toLocaleString() + ".mp3",
                {type: blob.type}
            );
            let response = await client.uploadFile(audioFile);
            const tempSkyLink = parseSkylink(response.skylink);
            setSkyLinkURL(await client.getSkylinkUrl(tempSkyLink));
            setUploaded(true);
            if (await mySky.checkLogin()) {
                let data = await mySky.getJSON(
                    dataDomain + "/yaps.json").data;
                if (data == null) {
                    await mySky.setJSON(
                        dataDomain + "/yaps.json",
                        {skylinks: []}
                    );
                }
                let response = await mySky.getJSON(
                    dataDomain + "/yaps.json");
                const skylinks = response.data.skylinks;
                await mySky.setJSON(
                    dataDomain + "/yaps.json",
                    {skylinks: skylinks + tempSkyLink}
                );
                setLocalSkyLinks(skylinks + tempSkyLink);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="UploadArea">
            { !uploaded ?
                <button className="UploadButton" onClick={upload}>
                    Upload
                </button>
                : <div className="success">
                    Your recording is uploaded at the link below! Click to copy.
                    <CopyToClipboard text={skyLinkURL}>
                        <textarea defaultValue={skyLinkURL} readOnly={true} />
                    </CopyToClipboard>
                </div>
            }
        </div>
    );
}

export default UploadArea;
