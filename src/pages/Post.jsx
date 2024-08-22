import React, { Suspense, useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import appwritePostService from '../appwrite/post';
import appwriteFileService from '../appwrite/file';
import { Button, Container, ImageLoader, Loader } from '../components';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import { formatDate } from '../conf/helper';
import image from '../assets/mohammad-rahmani-gA396xahf-Q-unsplash.jpg';
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
        <div className="w-full py-8 flex flex-col items-center">
            <div className=" w-full  ">
                <div className="w-full 2xl:mb-56 xl:mb-36 px-80 flex flex-col justify-center items-center bg-gradient-to-b from-[#f4f4f4] to-[#d6d6d6] border-b-[3px] border-black pb-[290px] ">
                    <div className="2xl:max-w-4xl xl:max-w-2xl space-y-4  mb-4 ">
                        <div className="flex items-center gap-2 text-gray-500 text-xl">
                            {formatDate(post?.$createdAt)}
                            <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                            {post?.timeToRead}
                        </div>
                        <h1 className="xl:text-7xl font-bold text-shadow-gray-300 text-shadow-sm">
                            {post.title}
                        </h1>
                        <p>//TODO: #TAG</p>
                        <p className="text-gray-700 text-xl">{post?.author}</p>
                    </div>
                    <div className="">
                        <figure className="absolute left-1/2 transform -translate-x-1/2 max-w-4xl">
                            <ImageLoader
                                alt={post.title}
                                quality={60}
                                id={post.featuredImage}
                                className={
                                    'rounded-[48px] border-black border-[3px] w-full '
                                }
                                width={896}
                                height={502}
                            />
                        </figure>
                    </div>
                </div>
                {isAuthor && (
                    <div className="absolute right-6 top-6">
                        <Link to={`/edit-post/${slug}`}>
                            <Button bgColor="bg-blue-500" className="mr-3">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-500" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )}
            </div>
            <div className="w-full my-3 space-y-2">
                {!authStatus && (
                    <div className="text-center">
                        <Button onClick={loginToRead}>
                            Login to Read More
                        </Button>
                    </div>
                )}
            </div>
            {authStatus && userData && fullContent && (
                <article className="browser-css dynamic-container space-y-6 text-justify 2xl:max-w-4xl xl:max-w-2xl ">
                    {parse(fullContent?.content || '')}
                </article>
            )}
        </div>
    ) : (
        <Loader />
    );

    // <div className="">Loading Article</div>
}
