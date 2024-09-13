const Avatar = ({ name }) => {
    const nameArray = name?.split(' ');

    const initials =
        nameArray?.length > 1
            ? `${nameArray[0]?.charAt(0)}${nameArray.pop().charAt(0)}`
            : nameArray[0]?.charAt(0);
    return (
        <div
            className="m-0 flex h-9 w-9 items-center justify-center rounded-full bg-gray-300"
            data-testid="initials"
        >
            {initials}
        </div>
    );
};

export default Avatar;
