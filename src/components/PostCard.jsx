import React from 'react';
import fileService from '../appwrite/file';
import { Link } from 'react-router-dom';
import { formatDate } from '../conf/helper';
import { ImageLoader } from './index';
const PostCard = ({
    $id,
    title,
    featuredImage,
    $createdAt,
    author,
    slug,
    timeToRead,
}) => {
    return (
        <Link to={`/post/${slug}-${$id}`}>
            <div className=" hover:bg-[#f2f0ef] duration-500 space-y-2 pb-2 border border-black rounded-3xl 2xl:h-[496px] relative">
                <div className="w-full justify-center mb-4 rounded-t-3xl border-dashed border-b border-black">
                    <ImageLoader
                        alt={title}
                        className="w-full rounded-t-3xl 2xl:h-80 "
                        quality={30}
                        id={featuredImage}
                        width={478}
                        height={320}
                    />
                </div>

                <div className="px-4 space-y-3 text-lg text-gray-700 ">
                    <div className="flex items-center gap-2 text-gray-500">
                        {formatDate($createdAt)}
                        <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                        {timeToRead}
                    </div>
                    <h2 className="font-semibold text-2xl line-clamp-2 text-black ">
                        {title}
                    </h2>
                    <p className="text-lg text-gray-700  2xl:bottom-3">
                        {author}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default PostCard;
