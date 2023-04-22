import Comment from "./Comment";
import ReplyList from "./ReplyList";
import useAuth from "../../hooks/useAuth";
import React, {Fragment, useEffect, useState} from "react";
import {commentsListner, deleteComment,editComment, upvoteComment,downvoteComment} from "../../services/firestore";

const CommentList = () => {
    const [comments, setComments] = useState([]);
    const {user} = useAuth();

    useEffect(() => {
        const unsubscribe = commentsListner(setComments);
        return () => {
            unsubscribe();
        };
    }, []);

    const onDelete = async (id) => {
        await deleteComment(id);
    };

    const onEdit = async (id, comment) => {
        await editComment(id, comment);
    };

    const downvote = async (id) => {
        await downvoteComment(id, user?.name);
    };

    const upvote = async (id) => {
        await upvoteComment(id, user?.name);
    };


    return (
        <ul className='comments__container'>
            {comments.map((comment) => {
                return (
                    <Fragment key={comment.id}>
                        <Comment
                            comment={comment}
                            type='comment'
                            onDelete={onDelete}
                            onEdit={onEdit}
                            upvote={upvote}
                            downvote={downvote}
                        />
                        <ReplyList commentID={comment.id} />
                    </Fragment>
                );
            })}
        </ul>
    );
};

export default CommentList;
