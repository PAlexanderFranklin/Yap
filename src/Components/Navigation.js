import { useContext, useEffect } from 'react';
import './Navigation.css';
import { SkynetContext } from '../state/SkynetContext';
import Item from './Navigation/Item';

function Navigation(props) {

  const { localSkyLinks, setLocalSkyLinks } = props;
  const { client, mySky, dataDomain } = useContext(SkynetContext);

  useEffect(() => {
    async function stuff() {
      try {
        let skylinks = await mySky.getJSON(
          dataDomain + "/yaps.json").data.skylinks;
        let newSkylinks = [];
        skylinks.forEach(async (element) => {
          newSkylinks.push(await client.getSkylinkUrl(element));
        });
        setLocalSkyLinks(newSkylinks);
      }
      catch (error) {
        console.log(error);
      }
    }
    stuff();
  }, [dataDomain, mySky, setLocalSkyLinks])

  let itemArray = "";
  try {
    itemArray = localSkyLinks.map(element => <Item key={element} skylink={element} />);
  }
  catch (error) {
    console.log(error);
    console.log(localSkyLinks);
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
