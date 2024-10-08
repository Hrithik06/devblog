import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthLayout, ErrorPage } from './components/index.js';

import Home from './pages/Home.jsx';
import AddPost from './pages/AddPost';
import SignUp from './pages/SignUp';
import EditPost from './pages/EditPost';
import Login from './pages/Login';
import Post from './pages/Post';
import MyPosts from './pages/MyPosts';
import Demo from './components/Demo.jsx';
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/login',
                element: (
                    <AuthLayout authentication={false}>
                        <Login />
                    </AuthLayout>
                ),
            },
            {
                path: '/signup',
                element: (
                    <AuthLayout authentication={false}>
                        <SignUp />
                    </AuthLayout>
                ),
            },
            {
                path: '/my-posts',
                element: (
                    <AuthLayout authentication>
                        <MyPosts />
                    </AuthLayout>
                ),
            },
            {
                path: '/new',
                element: (
                    <AuthLayout authentication>
                        <AddPost />
                    </AuthLayout>
                ),
            },
            {
                path: '/edit-post/:slug',
                element: (
                    <AuthLayout authentication>
                        <EditPost />
                    </AuthLayout>
                ),
            },
            {
                path: '/post/:slug',
                element: <Post />,
            },
            {
                path: '/demo',
                element: <Demo />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>,
    //</React.StrictMode>,
);
