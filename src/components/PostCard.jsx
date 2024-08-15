import React from 'react';
import fileService from '../appwrite/file';
import { Link } from 'react-router-dom';
import { formatDate } from '../conf/helper';
const PostCard = ({ $id, title, featuredImage, $createdAt, author, slug }) => {
    return (
        <Link to={`/post/${slug}-${$id}`}>
            <div className="w-full hover:bg-[#f2f0ef] duration-500 space-y-2 pb-2 space-x-2">
                <div className="w-full justify-center mb-4 ">
                    <img
                        src={fileService.getFilePreview(featuredImage, {
                            width: 384,
                            height: 240,
                            quality: 60,
                        })}
                        alt={title}
                        className=""
                    />
                </div>

                <p>{author}</p>
                <h2 className="font-semibold text-wrap text-xl ">{title}</h2>
                <p>{formatDate($createdAt)}</p>
            </div>
        </Link>
    );
};

export default PostCard;
