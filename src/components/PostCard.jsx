import React from 'react';
import fileService from '../appwrite/file';
import { Link } from 'react-router-dom';
import { formatDate } from '../conf/helper';
const PostCard = ({ $id, title, featuredImage, $updatedAt, author }) => {
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 space-y-2 space-x-2 ">
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
                <p className="text-sm text-purple-800 flex items-center">
                    <svg
                        width="16px"
                        height="16px"
                        viewBox="0 0 512 512"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        fill="#000000"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            {' '}
                            <title>ink-pen</title>{' '}
                            <g
                                id="Page-1"
                                stroke="none"
                                strokeWidth="1"
                                fill="none"
                                fillRule="evenodd"
                            >
                                {' '}
                                <g
                                    id="icon"
                                    fill="#000000"
                                    transform="translate(71.447342, 64.000000)"
                                >
                                    {' '}
                                    <path
                                        d="M237.238,46.437 L330.114,139.313 L280.552658,288 L15.466,376.362 L179.038345,212.613806 C180.797325,213.083146 182.645775,213.333333 184.552658,213.333333 C196.334733,213.333333 205.885991,203.782075 205.885991,192 C205.885991,180.217925 196.334733,170.666667 184.552658,170.666667 C172.770583,170.666667 163.219325,180.217925 163.219325,192 C163.219325,193.915222 163.471705,195.771497 163.945022,197.537382 L1.42108547e-14,361.66 L88.552658,96 L237.238,46.437 Z M291.219325,-1.42108547e-14 L376.552658,85.3333333 L341.428,120.457 L256.095,35.124 L291.219325,-1.42108547e-14 Z"
                                        id="Combined-Shape"
                                    >
                                        {' '}
                                    </path>{' '}
                                </g>{' '}
                            </g>{' '}
                        </g>
                    </svg>
                    {author}
                    <span className="inline-block w-6 bg-purple-800 rounded-[50%]"></span>
                    {formatDate($updatedAt)}
                </p>
                <h2 className="font-semibold text-2xl ">{title}</h2>
            </div>
        </Link>
    );
};

export default PostCard;
