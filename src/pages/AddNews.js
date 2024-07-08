import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/AddNews.css';

const AddNews = ({ onAddNews }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [by, setAuthor] = useState('');
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNews = {
      title,
      by,
      description,
      time: new Date().getTime() / 1000
    };
    onAddNews(newNews);
    console.log(newNews)
    console.log(newNews.title)
    console.log(newNews.date)
    console.log(newNews.date)
    
    setTitle('');
    setDescription('');
    setAuthor('');
    
    navigate("/ ")
  };

  return (
    <div className="add-news-container">
      <h2>Add News</h2>
      <form onSubmit={handleSubmit}>
        <label className="form-label">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          required
        />

        <label className="form-label">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input"
          rows="4"
          required
        ></textarea>

        <label className="form-label">Author:</label>
        <input
          type="text"
          value={by}
          onChange={(e) => setAuthor(e.target.value)}
          className="form-input"
          required
        />

        <button type="submit" className="form-submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNews;
