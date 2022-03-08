import './SkynetButtons.css';
import AddToHomescreen from '../images/AddToHomescreen.svg';
import { SkynetContext } from '../state/SkynetContext';
import { useContext } from 'react';

function SkynetButtons() {

    const { loggedIn, logIn, logOut } = useContext(SkynetContext);

    return (
        <div className="SkynetButtons">
            { loggedIn ?
                <button onClick={() => {
                    try {
                        logOut();
                    } catch (error) {
                        console.log(error);
                    }}}
                    className="login_to_mysky"
                >
                    Logout of mySky
                </button>
                :
                <button onClick={() => {
                    try {
                        logIn();
                    } catch (error) {
                        console.log(error);
                    }}}
                    className="login_to_mysky"
                >
                    Login to mySky
                </button>
            }
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
