const Container = ({ children }) => {
    return (
        <div
            className={`mx-auto w-full px-4 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl`}
        >
            {children}
        </div>
    );
};

export default Container;
