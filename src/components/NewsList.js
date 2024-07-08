import React from 'react';
import { Link } from 'react-router-dom';
import './NewsList.css';

const NewsList = ({ news, addedNews, loading }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const combinedNews = [...addedNews, ...news];

  return (
    <div className="news-list-container">
      <div className="buttons-container">
        <button className="refresh-button" onClick={() => window.location.reload()}>
          Update News
        </button>
        <Link to="/add-news" className="add-news-button">
          Add News
        </Link>
      </div>
      <ul className="news-items">
        {combinedNews.map(story => (
          <li key={story.id} className="news-item">
            <Link to={`/news/${story.id}`} className="news-link">
              <h2>{story.title}</h2>
              <p className="news-info">Author: {story.by}</p>
              <p className="news-info">Date: {formatDate(story.time)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
