import React, {useState} from "react";
import Plus from "../../assets/images/icon-plus.svg";
import Minus from "../../assets/images/icon-minus.svg";
import Reply from "../../assets/images/icon-reply.svg";
import Delete from "../../assets/images/icon-delete.svg";
import Edit from "../../assets/images/icon-edit.svg";
import "../../styles/comment.css";
import * as timeago from "timeago.js";
import useAuth from "../../hooks/useAuth";
import DeleteModal from "../modals/DeleteModal";
import ReplyForm from "./ReplyForm";
import {addReply} from "../../services/firestore";
import AlertModal from "../modals/AlertModal";

const Comment = ({comment, type, onDelete, onEdit, upvote, downvote, parentID}) => {
    const {user} = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const openDeleteModal = () => setIsModalOpen(true);
    const closeDeleteModal = () => setIsModalOpen(false);

    const deleteComment = async () => {
        await onDelete(comment.id);
    };
    const handleEdit = () => {
        setIsEditing(true);
    };
    const handleReply = () => {
        if (user) {
            setIsReplying(!isReplying);
            return;
        } else {
            setIsAlertOpen(true);
            setTimeout(() => {
                setIsAlertOpen(false);
            }, 2000);
        }
    };
    const onReply = async (e) => {
        e.preventDefault();
        let reply = e.target.reply.value.trim();
        if (!reply) return;
        reply = reply.replace(`@${comment.user.name} `, "");
        const id = type === "reply" ? parentID : comment.id;
        await addReply(id, {
            content: reply,
            replyingTo: comment.user.name,
            user: {
                name: user.name,
                image: user.photoURL,
            },
        });
        setIsReplying(false);
    };

    const editComment = async (e) => {
        e.preventDefault();
        const editedComment = e.target.edit.value.trim();
        if (comment.content !== editedComment) {
            setIsEditing(false);
            await onEdit(comment.id, {
                content: editedComment,
            });
            return;
        } else return;
    };

    const inc = async () => {
        if (!user) {
            setIsAlertOpen(true);
            setTimeout(() => {
                setIsAlertOpen(false);
            }, 2000);
            return;
        } else if (comment.user.name !== user?.name) {
            await upvote(comment.id);
            return;
        } else return;
    };
    const dec = async () => {
        if (!user) {
            setIsAlertOpen(true);
            setTimeout(() => {
                setIsAlertOpen(false);
            }, 2000);
            return;
        } else if (comment.user.name !== user?.name) {
            await downvote(comment.id);
            return;
        } else return;
    };
    return (
        <>
            <li className='comment'>
                <div className='score__container'>
                    <button className='score__button' onClick={inc}>
                        <img src={Plus} alt='plus' />
                    </button>
                    <span className='score'>{comment.score.length}</span>
                    <button className='score__button' onClick={dec}>
                        <img src={Minus} alt='minus' />
                    </button>
                </div>

                <div className='comment__body'>
                    <div className='user__info'>
                        {
                            comment.user.image ? (
                                <img
                                    className='user-image'
                                    src={comment.user.image}
                                    alt={comment.user.name}
                                    referrerPolicy='no-referrer'
                                />
                            ) : (
                                <div className='user-image' >{comment.user.name.charAt(0)}</div>
                            )
                        }
                        <h3 className='user-name'>{comment.user.name}</h3>
                        {comment.user.name === user?.name && (
                            <div className='is-you'>
                                <p>you</p>
                            </div>
                        )}
                        <span className='created-at'>{timeago.format(comment.createdAt.seconds * 1000)}</span>
                    </div>
                    {isEditing ? (
                        <form className='edit-form' onSubmit={editComment}>
                            <textarea
                                className='input-text'
                                name='edit'
                                id='edit'
                                cols='20'
                                rows='4'
                                defaultValue={comment.content}
                            />
                            <button type='submit' className='edit-btn'>
                                UPDATE
                            </button>
                        </form>
                    ) : (
                        <p className='comment__text'>
                            {type === "reply" && <span className='reply-to'>@{comment.replyingTo}</span>}{" "}
                            {comment.content}
                        </p>
                    )}

                    <div className='comment__controls'>
                        {comment.user.name === user?.name && (
                            <button className='comment__control delete' onClick={openDeleteModal}>
                                <img src={Delete} alt='delete-icon' /> Delete
                            </button>
                        )}
                        {comment.user.name === user?.name ? (
                            <button className='comment__control edit' onClick={handleEdit}>
                                <img src={Edit} alt='edit-icon' /> Edit
                            </button>
                        ) : (
                            <button className='comment__control reply' onClick={handleReply}>
                                <img src={Reply} alt='reply-icon' /> Reply
                            </button>
                        )}
                    </div>
                    <DeleteModal isOpen={isModalOpen} close={closeDeleteModal} onDelete={deleteComment} />
                    <AlertModal isOpen={isAlertOpen} />
                </div>
            </li>
            {isReplying && <ReplyForm onSubmit={onReply} replyingTo={comment.user.name} />}
        </>
    );
};

export default Comment;
