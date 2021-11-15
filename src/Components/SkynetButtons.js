import './SkynetButtons.css';
import AddToHomescreen from '../images/AddToHomescreen.svg';
// import { SkynetContext } from '../state/SkynetContext';
// import { useContext } from 'react';

function SkynetButtons() {

    // const { mySky, loggedIn } = useContext(SkynetContext);

    return (
        <div className="SkynetButtons">
            {/* { loggedIn ?
                <button onClick={() => {
                    try {
                        mySky.logout();
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
                        mySky.requestLoginAccess();
                    } catch (error) {
                        console.log(error);
                    }}}
                    className="login_to_mysky"
                >
                    Login to mySky
                </button>
            } */}
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
