import React from 'react';
const Avatar = ({ name }) => {
    const nameArray = name.split(' ');
    const initials =
        nameArray.length > 1
            ? `${nameArray[0].charAt(0)}${nameArray.pop().charAt(0)}`
            : nameArray[0].charAt(0);
    return (
        <div className="rounded-full bg-gray-300 py-2 px-2.5">{initials}</div>
    );
};

export default Avatar;
