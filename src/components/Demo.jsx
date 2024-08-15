import React, { useState } from 'react';
import { Button, LogoutBtn } from './index';
import { useSelector } from 'react-redux';

const Demo = () => {
    const userData = useSelector((store) => store.auth.userData);
    const [show, setShow] = useState(false);

    return (
        <div className="m-20 flex flex-col w-44 relative">
            <Button
                children={userData?.name}
                onClick={() => {
                    setShow(!show);
                }}
            />
            {show && (
                <div className="z-10 absolute top-10">
                    <LogoutBtn />
                </div>
            )}
        </div>
    );
};

export default Demo;
