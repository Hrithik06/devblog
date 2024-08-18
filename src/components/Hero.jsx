import React from 'react';
// import bloggingBro from '../assets/Blogging-bro.svg';
import broAnimatedDark from '../assets/blogging-animate-dark.svg';
import broAnimatedLight from '../assets/blogging-animate-light.svg';
const Hero = () => {
    return (
        <div className="flex items-center justify-between ">
            <div className="space-y-4">
                <h1 className="text-6xl">
                    Welcome to
                    <strong>
                        <i> theblog</i>
                    </strong>
                </h1>
                <p>Uncovering the World, One Post at a Time.</p>
            </div>
            <div className="w-[500px]">
                <img
                    src={broAnimatedLight}
                    alt=""
                    className="w-full hover:scale-110 duration-500"
                />
                {/* <img src={broAnimatedDark} alt="" /> */}
            </div>
        </div>
    );
};

export default Hero;
