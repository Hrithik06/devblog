import React from 'react';
import { Link } from 'react-router-dom';
import { Logo, Container, LogoutBtn, Button } from '../index';
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
            name: 'Sign up for free',
            slug: '/signup',
            active: !authStatus,
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
        <header className="py-3 shadow ">
            <Container>
                <nav className="flex">
                    <div className="mr-4 ">
                        <Link to="/">
                            <Logo width="70px" />
                        </Link>
                    </div>
                    <ul className="flex ml-auto">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
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
                                <Button
                                    children={userData?.name.split(' ')[0]}
                                />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
};

export default Header;
