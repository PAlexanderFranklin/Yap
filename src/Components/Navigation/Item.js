import './Item.css';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useContext, useEffect, useState } from 'react';
import { SkynetContext } from '../../state/SkynetContext';

function Item(props) {

  const { client } = useContext(SkynetContext);
  const { skylink } = props;
  const [ fileName, setFileName ] = useState("");

  useEffect(() => {
    async function stuff() {
      try {
        const response = await client.getMetadata(skylink);
        setFileName(response.metadata.filename.replace(/\.[^/.]+$/, ""));
      } catch (error) {
        console.log(error);
      }
    }
    stuff()
  }, [client, skylink]);

  return (
    <div className="Item">
      <h4>{fileName}</h4>
      <audio src={skylink} controls="controls" preload="metadata" />
      <CopyToClipboard text={skylink}>
        <p className="UploadButton saved_item">Copy link</p>
      </CopyToClipboard>
    </div>
  );
}

export default Item;
