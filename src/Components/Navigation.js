import './Navigation.css';
import Item from './Navigation/Item';

function Navigation(props) {

  const { localSkyLinks } = props;

  let itemArray = "";
  try {
    itemArray = localSkyLinks.map(element => <Item skylink={element} />);
  }
  catch (error) {
    console.log(error);
    itemArray = "";
  }

  return (
    <div className="Navigation">
      <div className="items">
        {itemArray}
      </div>
    </div>
  );
}

export default Navigation;
