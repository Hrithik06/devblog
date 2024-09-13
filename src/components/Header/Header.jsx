import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Logo, LogoutBtn, Avatar } from '../index';
import { useSelector } from 'react-redux';

export default function Header() {
    const authStatus = useSelector((store) => store.auth.status);
    const userData = useSelector((store) => store.auth.userData);
    const navigation = [
        { name: 'Home', to: '/', active: true },
        // { name: 'Demo', to: '/demo', active: true },
        { name: 'Login', to: '/login', active: !authStatus },
        {
            name: 'Create Account',
            to: '/signup',
            active: !authStatus,
        },
        {
            name: 'My Posts',
            to: '/my-posts',
            active: authStatus,
        },
        {
            name: 'Write',
            to: '/new',
            active: authStatus,
            icon: (
                <svg
                    width="16px"
                    height="16px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        <path
                            d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                        <path
                            d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </g>
                </svg>
            ),
        },
    ];
    useEffect(() => {}, [userData]);
    //FIXME:When user signsup Header doesnt show Avatar immediately it shows only if refreshed
    return (
        <Disclosure as="nav" className="">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon
                                aria-hidden="true"
                                className="block h-6 w-6 group-data-[open]:hidden"
                            />
                            <XMarkIcon
                                aria-hidden="true"
                                className="hidden h-6 w-6 group-data-[open]:block"
                            />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                        <Link to="/">
                            <Logo />
                        </Link>

                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map(
                                    (item) =>
                                        item.active && (
                                            <Link
                                                key={item.name}
                                                to={item.to}
                                                className="flex items-center gap-1 rounded-full px-3 py-2 duration-500 hover:bg-blue-200"
                                            >
                                                <button
                                                    className={`flex items-center gap-1`}
                                                >
                                                    {item?.icon && (
                                                        <span>
                                                            {item?.icon}
                                                        </span>
                                                    )}
                                                    {item.name}
                                                </button>
                                            </Link>
                                        ),
                                )}
                            </div>
                        </div>
                    </div>
                    {authStatus && userData?.name && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm ring-offset-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                                        <Avatar name={userData?.name} />
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <MenuItem>
                                        <LogoutBtn />
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>
                    )}
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map(
                        (item) =>
                            item.active && (
                                <DisclosureButton
                                    key={item.name}
                                    as="a"
                                    to={item.to}
                                    className={
                                        'block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-700 hover:text-white'
                                    }
                                >
                                    {item.name}
                                </DisclosureButton>
                            ),
                    )}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}
