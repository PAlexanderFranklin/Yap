import './Item.css';
import { useContext } from 'react';
import { SkynetContext } from '../../state/SkynetContext';
import CopyToClipboard from 'react-copy-to-clipboard';

function Item(props) {

  const { skylink } = props;
  const { client } = useContext(SkynetContext);
  const URL = client.getSkylinkUrl(skylink);

  return (
    <div className="Item">
      <audio src={URL} controls="controls" preload="metadata" />
      <CopyToClipboard text={URL}>
        <textarea defaultValue={URL} readOnly={true} />
      </CopyToClipboard>
    </div>
  );
}

export default Item;
