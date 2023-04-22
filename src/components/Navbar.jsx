import "../styles/navbar.css";
import React from "react";
import {useNavigate} from "react-router-dom";
import {logout} from "../services/firebase-auth";
import {FaRegComments} from 'react-icons/fa'
import useAuth from "../hooks/useAuth";

const Navbar = () => {
    const {user} = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await logout();
        window.location.reload();
        localStorage.removeItem("user");
    };

    return (
        <header className='navbar'>
            <div className='navbar__wrapper'>
                <FaRegComments size="32px" color="grey"/>
                <nav className='nav'>
                    <ul className='nav__list'>
                        {user ? (
                            <>
                                <li className='nav__item sign-out' onClick={handleSignOut}>
                                    Sign out
                                </li>
                                <li className='user'>
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={user.name}
                                            referrerPolicy='no-referrer'
                                            className='avatar'
                                            title={user.email}
                                        />
                                    ) : (
                                        user.name.charAt(0)
                                    )}
                                </li>
                            </>
                        ) : (
                            <li className='nav__item sign-in' onClick={() => navigate("/sign-in")}>
                                login
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
