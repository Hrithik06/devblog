import React, { useState, useEffect } from 'react';
import { PostCard, Container } from '../components/index';
import appwritePostService from '../appwrite/post';
import { useSelector } from 'react-redux';
const MyPosts = () => {
    const userData = useSelector((store) => store.auth.userData);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        appwritePostService.getMyPost(userData.$id).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    return (
        <div className="w-full py-8">
            <Container>
                <div className="grid grid-cols-2">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 ">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default MyPosts;
