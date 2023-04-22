import React, {memo} from "react";
import "../../styles/commentForm.css";
import {FcLock} from "react-icons/fc";
import useAuth from "../../hooks/useAuth";

const ReplyForm = ({onSubmit,replyingTo}) => {
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
                name='reply'
                id='reply'
                autoFocus='on'
                cols='20'
                rows='3'
                placeholder='Add a comment...'
                defaultValue={`@${replyingTo} `}
            />
            <button type='submit' className='send-btn' title='send comment'>
                REPLY
            </button>
        </form>
    );
};

export default memo(ReplyForm);

