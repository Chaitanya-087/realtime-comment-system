import React, {memo, useState} from "react";
import "../../styles/commentForm.css";
import {FcLock} from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import AlertModal from "../modals/AlertModal";

const CommentForm = ({onSubmit,isAlertOpen}) => {
    const {user} = useAuth();
    return (
        <form className='comment__form' onSubmit={onSubmit}>
            {" "}
            {user ? (
                <div className='user'>
                    {user.photoURL ? (
                        <img
                            className='avatar'
                            referrerPolicy='no-referrer'
                            title={user.email}
                            src={user.photoURL}
                            alt={user.displayName}
                        />
                    ) : (
                        user.email.charAt(0)
                    )}
                </div>
            ) : (
                <div className='no-user'>
                    <FcLock className='lock-icon' size='18px' />
                </div>
            )}
            <textarea
                className='input-text'
                name='comment'
                id='comment'
                cols='20'
                rows='3'
                placeholder='Add a comment...'
            />
            <button type='submit' className='send-btn' title='send comment'>
                SEND
            </button>
            <AlertModal isOpen={isAlertOpen} />
        </form>
    );
};

export default memo(CommentForm);
