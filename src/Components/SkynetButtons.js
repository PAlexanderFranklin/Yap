import './SkynetButtons.css';
import AddToHomescreen from '../images/AddToHomescreen.svg';
import { SkynetContext } from '../state/SkynetContext';
import { useContext } from 'react';

function SkynetButtons() {

    const { user, authenticate, authenticating, logout } = useContext(SkynetContext);

    return (
        <div className="SkynetButtons">
            {/* not logged in */}
            {!authenticating && !user && (
            <button className="login_to_mysky" onClick={() => authenticate()}>
                Authenticate with MySky
            </button>
            )}
    
            {/* logging in */}
            {authenticating && (
            <button className="login_to_mysky" disabled={true}>
                Waiting for authentication
            </button>
            )}
    
            {/* logged in */}
            {!authenticating && user && (
            <button
                className="login_to_mysky"
                onClick={logout}
            >
                Sign out from MySky
            </button>
            )}
            <a
            target="_blank"
            href="https://homescreen.hns.siasky.net/#/skylink/AQCrn58EwIKUsZ94r9bXOGauv-KapM77N1wT62jYAXWovw"
            rel="noreferrer"
            >
                <img src={AddToHomescreen} alt="Add To Skynet Homescreen" className="homescreen" />
            </a>
        </div>
    );
}

export default SkynetButtons;
