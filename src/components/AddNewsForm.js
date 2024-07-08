import React, { useState } from 'react';

const AddNewsForm = ({ onAddNews }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newStory = {
      id: Date.now(),
      title,
      text: description,
      by: author,
      time: Date.now() / 1000,
    };

    onAddNews(newStory);

    setTitle('');
    setDescription('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add News</h3>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Body</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddNewsForm;
