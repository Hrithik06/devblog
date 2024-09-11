import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import appwritePostService from '../appwrite/post';
import appwriteFileService from '../appwrite/file';
import { Button, ImageLoader, Loader } from '../components';
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
        <div className="flex w-full flex-col items-center py-8">
            <div className="w-full">
                <div className="2xl:mb-42 flex w-full flex-col items-center justify-center from-[#f4f4f4] to-[#d6d6d6] md:mb-48 md:border-b-[3px] md:border-black md:bg-gradient-to-b md:pb-32 lg:pb-52 xl:mb-36 xl:pb-64 2xl:pb-72">
                    <div className="mb-4 space-y-4 px-4 md:max-w-2xl md:px-0 lg:max-w-4xl xl:ml-12 xl:max-w-5xl 2xl:max-w-6xl">
                        <div className="flex items-center gap-2 text-xl text-gray-500">
                            {formatDate(post?.$createdAt)}
                            <span className="h-1 w-1 rounded-full bg-gray-500"></span>
                            {post?.timeToRead}
                        </div>
                        <h1 className="text-shadow-sm text-3xl font-bold text-shadow-gray-300 md:text-5xl xl:text-7xl">
                            {post.title}
                        </h1>
                        <p>//TODO: #TAG</p>
                        <p className="text-xl text-gray-700">{post?.author}</p>
                    </div>
                    <div className="w-full">
                        <figure className="mx-2 md:absolute md:max-lg:mx-24 lg:max-xl:mx-40 xl:left-1/2 xl:-translate-x-1/2 xl:transform">
                            <ImageLoader
                                alt={post.title}
                                quality={60}
                                id={post.featuredImage}
                                className={
                                    'rounded-3xl border-2 border-black md:rounded-[48px] xl:border-[3px]'
                                }
                                width={896}
                                height={502}
                            />
                        </figure>
                    </div>
                </div>
                {isAuthor && (
                    <div className="absolute right-10 top-24">
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
            {!authStatus && (
                <div className="my-3 w-full md:max-lg:mt-20">
                    <div className="text-center">
                        <Button onClick={loginToRead}>
                            Login to Read More
                        </Button>
                    </div>
                </div>
            )}
            {authStatus && userData && fullContent && (
                <article className="browser-css dynamic-container mx-6 mt-4 space-y-6 text-wrap md:max-lg:mx-24 lg:max-xl:mx-40 xl:max-w-4xl">
                    {parse(fullContent?.content || '')}
                </article>
            )}
        </div>
    ) : (
        <Loader />
    );

    // <div className="">Loading Article</div>
}
