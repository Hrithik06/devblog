import React from 'react';
import { Link } from 'react-router-dom';
import { Logo, Container, LogoutBtn, Avatar } from '../index';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const authStatus = useSelector((store) => store.auth.status);
    const userData = useSelector((store) => store.auth.userData);

    const navigate = useNavigate();
    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true,
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus,
        },
        {
            name: 'Create Account',
            slug: '/signup',
            active: !authStatus,
            className: 'bg-blue-500 rounded-lg',
        },
        {
            name: 'All Posts',
            slug: '/all-posts',
            active: authStatus,
        },
        {
            name: 'Add Post',
            slug: '/add-post',
            active: authStatus,
        },
    ];

    return (
        <header className="py-6 shadow  bg-[#f2f2f2] top-0 sticky z-50 ">
            <Container>
                <nav className="flex items-center">
                    <div className="mr-4 ">
                        <Link to="/">
                            <Logo width="70px" />
                        </Link>
                    </div>
                    <ul className="flex ml-auto space-x-2 items-center">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className={`inline-bock px-3 py-2 duration-200 hover:bg-blue-100 rounded-full ${item.className}`}
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null,
                        )}
                        {authStatus && userData && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                        {authStatus && userData && (
                            <li>
                                <Avatar name={userData?.name} />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
};

export default Header;
