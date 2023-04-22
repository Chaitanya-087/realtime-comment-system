import React from "react";
import "../../styles/alertModal.css";
import {useNavigate} from "react-router-dom";
const AlertModal = ({isOpen}) => {
    const navigate = useNavigate();
    return (
        <div className={isOpen ? "alert-modal show-modal" : "alert-modal"}>
            <div className='modal-content'>
                <h3 className='modal-title'>Auth required</h3>
                <p className='modal-message'>You need to be logged in to perform this action.</p>
                <div className='modal-controls'>
                    <button className='signup-btn' onClick={() => navigate('/sign-up')}>SIGN UP</button>
                    <button className='signin-btn' onClick={() => navigate('/sign-in')}>SIGN IN</button>
                </div>
            </div>
        </div>
    );
};

export default AlertModal;
