import React, { useState, useEffect } from 'react';
import { PostCard, Container } from '../components/index';
import appwritePostService from '../appwrite/post';
const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        appwritePostService.getAllPost().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4 2xl:w-96">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default AllPosts;
