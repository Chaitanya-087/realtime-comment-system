import Comment from "./Comment";
import "../../styles/replies.css";
import useAuth from "../../hooks/useAuth";
import React, {useEffect, useState} from "react";
import {deleteReply, downvoteReply, editReply, repliesListner, upvoteReply} from "../../services/firestore";

const ReplyList = ({commentID}) => {
    const [replies, setReplies] = useState([]);
    const {user} = useAuth();

    useEffect(() => {
        const unsubscribe = repliesListner(commentID, setReplies);
        return () => {
            unsubscribe();
        };
    }, []);

    const upvote = async (replyId) => {
        await upvoteReply(commentID, replyId, user?.name);
    };

    const downvote = async (replyId) => {
        await downvoteReply(commentID, replyId, user?.name);
    };
    const onDelete = async (replyId) => {
        await deleteReply(commentID, replyId);
    };

    const onEdit = async (replyId, reply) => {
        await editReply(commentID, replyId, reply);
    };

    return (
        <ul className='replies__container' data-length={replies?.length}>
            {replies.map((reply) => (
                <Comment comment={reply} type='reply' parentID={commentID} key={reply.id} upvote={upvote} downvote={downvote} onDelete={onDelete} onEdit={onEdit}/>
            ))}
        </ul>
    );
};

export default ReplyList;
