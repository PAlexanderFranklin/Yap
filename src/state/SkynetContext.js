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
  window.location.hostname === 'localhost' ? 'https://fileportal.org' : undefined;

// Initiate the SkynetClient
const client = new SkynetClient(portal);

// For now, we won't use any DACs -- uncomment to create
// const contentRecord = new ContentRecordDAC();
const contentRecord = null;
const userProfile = null;
const fileSystem = null;

const dataDomain = 'yasp.hns';

const SkynetProvider = ({ children }) => {
  const [skynetState, setSkynetState] = useState({
    client,
    mySky: null,
    contentRecord,
    userProfile,
    dataDomain,
    fileSystem,
    loggedIn: false,
    userID: null,
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

        // check if user is already logged in with permissions
        const loggedIn = await mySky.checkLogin();
        let userID = null;
        if (loggedIn) {
          userID = await mySky.userID();
        }

        // logIn and logOut are in this file so that they can access setSkynetState
        async function logIn() {
          console.log(mySky)
          const status = await mySky.requestLoginAccess();
          let userID = null;
          if (status) {
            userID = await mySky.userID();
          }
          setSkynetState(s => ({...s, loggedIn: status, userID: userID}))
        }

        async function logOut() {
          console.log(mySky)
          await mySky.logout();
          setSkynetState(s => ({...s, loggedIn: false, userID: null}))
        } 

        // replace mySky in state object
        setSkynetState({...skynetState,
          mySky: mySky,
          loggedIn: loggedIn,
          userID: userID,
          logIn: logIn,
          logOut: logOut,
        });
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

  return (
    <SkynetContext.Provider value={skynetState}>
      {children}
    </SkynetContext.Provider>
  );
};

export { SkynetContext, SkynetProvider };