import './UploadButton.css';

function UploadButton(props) {
    const {blobURL, setSkyLink} = props;
    return (
        <button className="UploadButton">
            Upload
        </button>
    );
}

export default UploadButton;
