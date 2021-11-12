import './UploadButton.css';

function UploadButton(props) {

    const {blobURL, setSkyLink, SkyClient, mySky, loggedIn} = props;

    async function upload() {
        if (loggedIn) {
            console.log("stuff");
        }
        else {
            try {
                setSkyLink(await SkyClient.uploadFile(blobURL));
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <button className="UploadButton" onClick={upload}>
            Upload
        </button>
    );
}

export default UploadButton;
