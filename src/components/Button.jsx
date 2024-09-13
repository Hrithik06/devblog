const Button = ({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'white',
    className = '',
    ...props //if user sends any other properties for button
}) => {
    return (
        <button
            className={`rounded-lg px-4 py-2 ${bgColor} ${textColor} ${className} ${type}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
