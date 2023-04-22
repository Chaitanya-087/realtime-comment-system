import React, {useState} from "react";
import "../../styles/commentSection.css";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import {sendComment} from "../../services/firestore";
import useAuth from "../../hooks/useAuth";

const CommentSection = () => {
    const {user} = useAuth();
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setIsAlertOpen(true);
            setTimeout(() => {
                setIsAlertOpen(false);
            }, 2000);
            return;
        }
        const comment = e.target.comment.value;
        if (comment) {
            await sendComment({
                content: comment,
                user: {
                    name: user.name,
                    image: user.photoURL,
                },
            });
        }
        e.target.reset();
    };

    return (
        <section className='comment__section'>
            <CommentForm onSubmit={handleCommentSubmit} isAlertOpen={isAlertOpen} />
            <CommentList />
        </section>
    );
};

export default CommentSection;
