import React from 'react';
import noBgLogo from '../assets/logo-no-background.svg';

const Logo = ({ width = '100px' }) => {
    return (
        <div>
            <img className="w-20" src={noBgLogo} alt="" />
        </div>
    );
};

export default Logo;
