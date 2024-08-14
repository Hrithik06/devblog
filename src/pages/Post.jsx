import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import appwritePostService from '../appwrite/post';
import appwriteFileService from '../appwrite/file';
import { Button, Container } from '../components';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

export default function Post() {
    const [post, setPost] = useState(null);
    const [fullContent, setFullContent] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const userData = useSelector((state) => state.auth.userData);
    const authStatus = useSelector((state) => state.auth.status);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwritePostService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate('/');
            });
        } else navigate('/');

        userData && fetchFullContent();
    }, [slug, navigate]);

    const fetchFullContent = async () => {
        const mainContent = await appwritePostService.getFullContent(slug);

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
        // console.log(slug);
    };

    // if (!userData) {
    //     // console.log('HELLo');

    //     return (
    //         <div>
    //             <div className="w-full mb-6">
    //                 <h1 className="text-2xl font-bold">{post.title}</h1>
    //             </div>
    //             <img
    //                 src={appwriteFileService.getFilePreview(post.featuredImage)}
    //                 alt={post.title}
    //                 className="rounded-xl"
    //             />
    //             Please Login
    //         </div>
    //     );
    // }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteFileService.getFilePreview(
                            post.featuredImage,
                            { quality: 80 },
                        )}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
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
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                    {!authStatus && (
                        <Button onClick={loginToRead}>
                            Login to Read More
                        </Button>
                    )}
                </div>
                {authStatus && userData && fullContent && (
                    <div className="browser-css">
                        {parse(fullContent?.content || '')}
                    </div>
                )}
            </Container>
        </div>
    ) : null;
}
