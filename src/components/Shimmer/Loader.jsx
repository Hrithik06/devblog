const Loader = () => {
    return (
        <div className="flex h-screen items-center justify-center py-6">
            <div className="flex h-36 w-36 items-center justify-center">
                <div className="container flex items-center justify-center">
                    <div className="water relative h-20 w-20 overflow-hidden rounded-full bg-[#35b3e7] before:absolute before:-top-[50%] before:left-[50%] before:h-[200%] before:w-[200%] before:animate-[wave_5s_linear_infinite] before:rounded-[45%] before:bg-white before:content-[''] after:absolute after:-top-[50%] after:left-[50%] after:h-[200%] after:w-[200%] after:animate-[wave_5s_linear_infinite] after:rounded-[35%] after:bg-white after:bg-white/30 after:content-['']"></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
