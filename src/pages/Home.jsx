import React, { useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwritePostService from '../appwrite/post';
import { useDispatch, useSelector } from 'react-redux';
import { addHomeBlogs } from '../store/homeSlice';
import { Hero } from '../components/index';
function Home() {
    // const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const homeBlogs = useSelector((store) => store.home.homeBlogs);
    useEffect(() => {
        !homeBlogs &&
            appwritePostService.getAllPost().then((posts) => {
                if (posts) {
                    dispatch(addHomeBlogs(posts.documents));
                    // setPosts(posts.documents);
                }
            });
    }, []);

    if (!homeBlogs) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                TODO:Shimmer
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
    return (
        <div className="w-full pb-8">
            <Container>
                {homeBlogs && <Hero />}
                {/* <div className="flex flex-wrap justify-start"> */}
                <div className="grid grid-cols-2">
                    {homeBlogs?.map((post) => (
                        <div key={post.$id} className="p-2 ">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
