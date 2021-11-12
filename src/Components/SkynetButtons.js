import './SkynetButtons.css';
import AddToHomescreen from '../images/Add To Homescreen.svg';

function SkynetButtons() {
    return (
        <div className="SkynetButtons">
            <a
            target="_blank"
            href="https://homescreen.hns.siasky.net/#/"
            rel="noreferrer"
            >
                <img src={AddToHomescreen} alt="Add To Skynet Homescreen" />
            </a>
        </div>
    );
}

export default SkynetButtons;
