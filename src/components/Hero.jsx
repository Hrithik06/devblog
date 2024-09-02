import React from 'react';
// import bloggingBro from '../assets/Blogging-bro.svg';
import broAnimatedDark from '../assets/blogging-animate-dark.svg';
import broAnimatedLight from '../assets/blogging-animate-light.svg';
const Hero = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between mt-4 md:mt-0">
            <div className="space-y-4">
                <h1 className="lg:text-6xl md:text-5xl text-3xl">
                    Welcome to
                    <strong>
                        <i> theblog</i>
                    </strong>
                </h1>
                <p>Uncovering the World, One Post at a Time.</p>
            </div>
            <div className="xl:w-[500px]">
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
