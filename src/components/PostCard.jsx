import React from 'react';
import fileService from '../appwrite/file';
import { Link } from 'react-router-dom';
const PostCard = ({ $id, title, featuredImage }) => {
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                    <img
                        src={fileService.getFilePreview(featuredImage)}
                        alt={title}
                        className="rounded-lg"
                    />
                </div>
                <h2 className="font-bold text-xl">{title}</h2>
            </div>
        </Link>
    );
};

export default PostCard;
