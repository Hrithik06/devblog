import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import appwritePostService from '../appwrite/post';
import appwriteFileService from '../appwrite/file';
import { Button, Container } from '../components';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import { formatDate } from '../conf/helper';

export default function Post() {
    const [post, setPost] = useState(null);
    const [fullContent, setFullContent] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const userData = useSelector((state) => state.auth.userData);
    const authStatus = useSelector((state) => state.auth.status);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    const postId = slug.split('-').pop();
    useEffect(() => {
        if (slug) {
            appwritePostService.getPost(postId).then((post) => {
                if (post) {
                    setPost(post);
                } else navigate('/');
            });
        } else navigate('/');

        userData && fetchFullContent();
    }, [slug, navigate]);

    const fetchFullContent = async () => {
        const mainContent = await appwritePostService.getFullContent(postId);

        setFullContent(mainContent);
    };
    const deletePost = () => {
        appwritePostService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteFileService.deleteFile(post.featuredImage);
                navigate('/');
            }
        });
    };

    const loginToRead = async () => {
        navigate('/login', {
            state: { from: location },
        });
    };

    return post ? (
        <div className="py-8">
            <Container className="max-w-3xl">
                <div className="w-full flex justify-center mb-4 relative ">
                    <img
                        src={appwriteFileService.getFilePreview(
                            post.featuredImage,
                            { quality: 80 },
                        )}
                        alt={post.title}
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${slug}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6 space-y-2">
                    <h1 className="text-4xl font-bold">{post.title}</h1>
                    <div className="flex items-center gap-2 text-gray-500">
                        {post?.author}
                        <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                        {formatDate(post?.$createdAt)}
                        <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                        {post?.timeToRead}
                    </div>
                    {!authStatus && (
                        <Button onClick={loginToRead}>
                            Login to Read More
                        </Button>
                    )}
                </div>
                {authStatus && userData && fullContent && (
                    <article className="browser-css dynamic-container space-y-6 text-justify">
                        {parse(fullContent?.content || '')}
                    </article>
                )}
            </Container>
        </div>
    ) : null;
}
