import React from 'react';

const Loader = () => {
    return (
        <div className=" flex justify-center py-6 items-center h-screen">
            <div className="h-36 w-36 flex items-center justify-center">
                <div className="container flex justify-center items-center">
                    <div className="water h-20 w-20 bg-[#35b3e7] rounded-full relative overflow-hidden before:content-[''] before:absolute before:w-[200%] before:h-[200%] before:-top-[50%] before:left-[50%] before:bg-white after:content-[''] after:absolute after:w-[200%] after:h-[200%] after:-top-[50%] after:left-[50%] after:bg-white before:rounded-[45%] before:animate-[wave_5s_linear_infinite] after:rounded-[35%] after:bg-white/30 after:animate-[wave_5s_linear_infinite]"></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
