import { createContext, useState, useEffect } from 'react';
import { SkynetClient } from 'skynet-js';

// To import DAC, uncomment here, and 2 spots below.
// import { ContentRecordDAC } from '@skynetlabs/content-record-library';
// import { UserProfileDAC } from '@skynethub/userprofile-library';
// import { FileSystemDAC } from "fs-dac-library";

const SkynetContext = createContext(undefined);

// We'll define a portal to allow for developing on localhost.
// When hosted on a skynet portal, SkynetClient doesn't need any arguments.
const portal =
  window.location.hostname === 'localhost' ? 'https://siasky.net' : undefined;

// Initiate the SkynetClient
const client = new SkynetClient(portal);

// For now, we won't use any DACs -- uncomment to create
// const contentRecord = new ContentRecordDAC();
const contentRecord = null;
const userProfile = null;
const fileSystem = null;

const dataDomain =
  window.location.hostname === 'localhost' ? 'localhost' : '040an7sv0j08555hjtsavlmn71jatfv2jaictupnbg9umq6o05qqhfo';

const SkynetProvider = ({ children }) => {
  const [skynetState, setSkynetState] = useState({
    client,
    mySky: null,
    contentRecord,
    userProfile,
    dataDomain,
    fileSystem,
    loggedIn: false,
  });

  useEffect(() => {
    // define async setup function
    async function initMySky() {
      try {
        // load invisible iframe and define app's data domain
        // needed for permissions write
        const mySky = await client.loadMySky(dataDomain, {
        //   debug: false,
        //   dev: false,
        });

        // load necessary DACs and permissions
        // Uncomment line below to load DACs
        // await mySky.loadDacs(contentRecord);
        // await mySky.loadDacs(userProfile);
        // await mySky.loadDacs(fileSystem);

        // replace mySky in state object
        setSkynetState({ ...skynetState, mySky });
      } catch (e) {
        console.error(e);
      }
    }

    // call async setup function
    if (!skynetState.mySky) {
      initMySky();
    }

    return () => {
      if (skynetState.mySky) {
        skynetState.mySky.destroy();
      }
    };
  }, [skynetState]);

  // const logout = React.useCallback(() => {
  //   if (state.mySky) {
  //     state.mySky.logout();

  //     setState((state) => ({ ...state, user: null }));
  //   }
  // }, [state]);

  return (
    <SkynetContext.Provider value={skynetState}>
      {children}
    </SkynetContext.Provider>
  );
};

export { SkynetContext, SkynetProvider };