// import bloggingBro from '../assets/Blogging-bro.svg';
import broAnimatedDark from '../assets/blogging-animate-dark.svg';
import broAnimatedLight from '../assets/blogging-animate-light.svg';
const Hero = () => {
    return (
        <div className="mt-4 flex flex-col items-center justify-between md:mt-0 md:flex-row">
            <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl lg:text-6xl">
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
                    className="w-full duration-500 hover:scale-110"
                />
                {/* <img src={broAnimatedDark} alt="" /> */}
            </div>
        </div>
    );
};

export default Hero;
