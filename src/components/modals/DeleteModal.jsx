import React from "react";
import "../../styles/deleteModal.css";

const DeleteModal = ({isOpen, close, onDelete}) => {
  
  return (
    <div className={isOpen ? "delete-modal show-modal" : "delete-modal"}>
      <div className='modal-content'>
        <h3 className='modal-title'>Delete comment</h3>
        <p className='modal-message'>
          Are you sure you want to delete this comment?This will remove the
          comment and can't be undone.
        </p>
        <div className='modal-controls'>
          <button className='cancel-btn' onClick={close}>
            NO,CANCEL
          </button>
          <button className='delete-btn' onClick={onDelete}>
            YES,DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
