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
            <div className="relative space-y-2 rounded-3xl border border-black pb-2 duration-500 hover:bg-[#f2f0ef] 2xl:h-[496px]">
                <div className="mb-4 w-full justify-center rounded-t-3xl border-b border-dashed border-black">
                    <ImageLoader
                        alt={title}
                        className="w-full rounded-t-3xl 2xl:h-80"
                        quality={30}
                        id={featuredImage}
                        width={478}
                        height={320}
                    />
                </div>

                <div className="space-y-3 px-4 text-lg text-gray-700">
                    <div className="flex items-center gap-2 text-gray-500">
                        {formatDate($createdAt)}
                        <span className="h-1 w-1 rounded-full bg-gray-500"></span>
                        {timeToRead}
                    </div>
                    <h2 className="line-clamp-2 text-2xl font-semibold text-black">
                        {title}
                    </h2>
                    <p className="text-lg text-gray-700 2xl:bottom-3">
                        {author}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default PostCard;
