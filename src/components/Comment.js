import React, { useState } from 'react';

const Comment = ({ comment, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.text);

  const handleEdit = () => {
    onEdit(comment.id, editedComment);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <div>
          <textarea
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
        </div>
      ) : (
        <div>
          <p><strong>{comment.by}</strong></p>
          <p dangerouslySetInnerHTML={{ __html: comment.text }} />
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(comment.id)}>Delete</button>
        </div>
      )}
    </li>
  );
};

export default Comment;