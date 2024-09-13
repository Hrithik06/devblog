import { useState, useEffect } from 'react';
import { PostCard, Container, Button } from '../components/index';
import appwritePostService from '../appwrite/post';
import { useSelector } from 'react-redux';
import noPosts from '../assets/no-posts.svg';
import { Link } from 'react-router-dom';
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
                {posts?.length > 0 ? (
                    <div className="grid grid-cols-2">
                        {posts.map((post) => (
                            <div key={post.$id} className="p-2">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="m-10 flex flex-col items-center">
                        <img src={noPosts} alt="" className="w-96" />
                        <h2 className="block text-center text-3xl">
                            This is where you can manage your posts, but you
                            haven&apos;t written anything yet.
                        </h2>
                        <Link to={'/new'}>
                            <Button className="mt-4 block w-56 text-white duration-200 hover:rounded-full">
                                Write Your first Blog here
                            </Button>
                        </Link>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default MyPosts;
