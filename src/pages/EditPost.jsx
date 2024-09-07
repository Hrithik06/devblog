import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components/index';
import appwritePostService from '../appwrite/post';
import { useNavigate, useParams } from 'react-router-dom';
const EditPost = () => {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const postId = slug.split('-').pop();

    const getPostData = async (id) => {
        const postData = await appwritePostService.getPost(id);

        if (postData) {
            const fullContent = await appwritePostService.getFullContent(id);
            if (fullContent) {
                setPost({ ...postData, content: fullContent.content });
            }
        }
    };
    useEffect(() => {
        if (slug) {
            getPostData(postId);
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
};

export default EditPost;
