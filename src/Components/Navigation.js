import { useContext, useEffect, useState } from 'react';
import './Navigation.css';
import { SkynetContext } from '../state/SkynetContext';
import Item from './Navigation/Item';

function Navigation(props) {

  const { localSkyLinks, setLocalSkyLinks } = props;
  const { client, mySky, dataDomain, user } = useContext(SkynetContext);

  useEffect(() => {
    async function execute() {
      try {
        if (mySky && user) {
          let response = await mySky.getJSON(
            dataDomain + "/yaps.json");
          let skylinks = JSON.parse(response.data.skylinks);
          let newSkylinks = [];
          skylinks.forEach(async (element) => {
            newSkylinks.push(await client.getSkylinkUrl(element));
          });
          setLocalSkyLinks(newSkylinks);
        }
        else {
          setLocalSkyLinks([]);
        }
      }
      catch (error) {
        console.log(error);
      }
    };
    execute()
  }, [client, dataDomain, mySky, user, setLocalSkyLinks])

  const [ itemArray, setItemArray ] = useState([]);
  useEffect(() => {
    try {
      setItemArray(
        localSkyLinks.map(
          element => <Item key={element} skylink={element} />
        )
      );
    }
    catch (error) {
      console.log(error);
      console.log(localSkyLinks);
    }
  }, [localSkyLinks])

  return (
    <div className="Navigation">
      <h2>Saved Audio</h2>
      <div className="items">
        {itemArray}
      </div>
    </div>
  );
}

export default Navigation;
