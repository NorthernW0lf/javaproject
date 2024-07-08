import React from 'react';
import { Link } from 'react-router-dom';

const NewsItem = ({ story }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <li>
      <h2>{story.title}</h2>
      <p>Author: {story.by}</p>
      <p>Date: {formatDate(story.time)}</p>
      <Link to={`/news/${story.id}`}>See more</Link>
    </li>
  );
};

export default NewsItem;
