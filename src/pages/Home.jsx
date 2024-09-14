import React, { useEffect, Suspense } from 'react';
import { Container, PostCard, ShimmerPostCard } from '../components';
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
    return (
        <div className="w-full pb-8">
            <Container>
                <Hero />
                {homeBlogs ? (
                    <div className="grid-cols-2 lg:grid">
                        {homeBlogs?.map((post) => (
                            <div key={post.$id} className="h-full p-2">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid-cols-2 max-lg:space-y-4 lg:grid lg:space-x-4">
                        <ShimmerPostCard />
                        <ShimmerPostCard />
                        <ShimmerPostCard />
                        <ShimmerPostCard />
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Home;
