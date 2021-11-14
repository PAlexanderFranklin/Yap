import './Item.css';
import CopyToClipboard from 'react-copy-to-clipboard';

function Item(props) {

  const { skylink } = props;

  return (
    <div className="Item">
      <audio src={skylink} controls="controls" preload="metadata" />
      <CopyToClipboard text={skylink}>
        <textarea defaultValue={skylink} readOnly={true} />
      </CopyToClipboard>
    </div>
  );
}

export default Item;
