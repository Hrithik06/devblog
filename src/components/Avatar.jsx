import React from 'react';
const Avatar = ({ name }) => {
    const nameArray = name.split(' ');
    const initials =
        nameArray.length > 1
            ? `${nameArray[0].charAt(0)}${nameArray.pop().charAt(0)}`
            : nameArray[0].charAt(0);
    return (
        <div className="rounded-full bg-gray-300 w-9 h-9 flex items-center justify-center m-0">
            {initials}
        </div>
    );
};

export default Avatar;
