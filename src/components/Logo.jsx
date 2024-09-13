import BLACKLOGO from '../assets/theblog-high-resolution-logo-black-transparent.svg';
import WHITELOGO from '../assets/theblog-high-resolution-logo-white-transparent.svg';
const Logo = ({ width = '100px' }) => {
    return (
        <div>
            <img className="w-40" src={BLACKLOGO} alt="" />
            {/* <img className="w-28" src={WHITELOGO} alt="" /> */}
        </div>
    );
};

export default Logo;
