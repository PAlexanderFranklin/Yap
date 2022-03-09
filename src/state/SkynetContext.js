import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
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

const dataDomain = 'yasp.hns';

const SkynetProvider = ({ children }) => {
  const [state, setState] = useState({
    client,
    mySky: null,
    mySkyInitialising: false,
    authenticating: false,
    user: null,
    dataDomain,
  });

  useEffect(() => {
    const execute = async () => {
      setState((state) => ({ ...state, mySkyInitialising: true }));

      // initialize MySky
      const mySky = await client.loadMySky(dataDomain);

      try {
        const isAuthenticated = await mySky.checkLogin();

        if (isAuthenticated) {
          setState((state) => ({ ...state, authenticating: true }));

          const user = await mySky.userID();

          setState((state) => ({ ...state, user, mySky, mySkyInitialising: false, authenticating: false }));
        } else {
          setState((state) => ({ ...state, mySky, mySkyInitialising: false }));
        }
      } catch {
        setState((state) => ({ ...state, mySky, mySkyInitialising: false, authenticating: false }));
      }
    };

    if (!state.mySky && !state.mySkyInitialising) {
      execute();
    }
  }, [state]);

  const authenticate = useCallback(() => {
    const execute = async () => {
      const success = await state.mySky.requestLoginAccess();

      if (success) {
        const user = await state.mySky.userID();

        setState((state) => ({ ...state, user, authenticating: false }));
      } else {
        setState((state) => ({ ...state, authenticating: false }));
      }
    };

    if (state.mySky && !state.authenticating) {
      setState((state) => ({ ...state, authenticating: true }));
      execute();
    }
  }, [state]);

  const logout = useCallback(() => {
    if (state.mySky) {
      state.mySky.logout();

      setState((state) => ({ ...state, user: null }));
    }
  }, [state]);

  const stateContext = useMemo(() => {
    return { ...state, authenticate, logout };
  }, [state, authenticate, logout]);

  return (
    <SkynetContext.Provider value={stateContext}>
      {children}
    </SkynetContext.Provider>
  );
};

export { SkynetContext, SkynetProvider };