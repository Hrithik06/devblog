import React from 'react';
import { Link } from 'react-router-dom';
import { PostCard } from './index';

const PostCardWrapper = ({ post }) => {
    return (
        <Link to={`/post/${post?.slug}`}>
            {' '}
            <PostCard post={post} />
        </Link>
    );
};

export default PostCardWrapper;
