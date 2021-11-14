import { useContext, useEffect, useState } from 'react';
import './Navigation.css';
import { SkynetContext } from '../state/SkynetContext';
import Item from './Navigation/Item';

function Navigation(props) {

  const { localSkyLinks, setLocalSkyLinks } = props;
  const { client, mySky, dataDomain } = useContext(SkynetContext);
  const [ reload, setReload ] = useState(false);

  useEffect(() => {
    async function stuff() {
      try {
        let response = await mySky.getJSON(
          dataDomain + "/yaps.json");
        let skylinks = JSON.parse(response.data.skylinks);
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
  }, [client, dataDomain, mySky, setLocalSkyLinks, reload])

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
        <button className="UploadButton" onClick={() => {setReload(!reload)}}>
          Load audio from mySky
        </button>
      </div>
    </div>
  );
}

export default Navigation;
