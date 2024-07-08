import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchStoryDetails } from '../services/hackerNewsApi';
import Comment from '../components/Comment';
import '../components/NewsDetail.css';

const NewsDetail = ({ news, addedNews }) => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStory = async () => {
      try {
        let storyData = news.find(story => story.id === parseInt(id)) || addedNews.find(story => story.id === parseInt(id));

        if (!storyData) {
          storyData = await fetchStoryDetails(id);
        }

        if (!storyData) {
          throw new Error('No story found');
        }

        setStory(storyData);

        if (storyData.kids) {
          const commentsData = await Promise.all(storyData.kids.map(commentId => fetchStoryDetails(commentId)));
          setComments(commentsData);
        }
      } catch (err) {
        console.error('Error fetching story details:', err);
        setError('No story found');
      } finally {
        setLoading(false);
      }
    };

    getStory();
  }, [id, news, addedNews]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const handleAddComment = () => {
    const newCommentData = {
      id: Date.now(),
      text: newComment,
      by: 'current_user',
      time: Date.now() / 1000,
    };
    setComments([newCommentData, ...comments]);
    setNewComment('');
  };

  const handleEditComment = (id, text) => {
    setComments(
      comments.map(comment => 
        comment.id === id ? { ...comment, text } : comment
      )
    );
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!story) return <div>No story found</div>;

  return (
    <div className="news-detail-container">
      <h1>{story.title}</h1>
      <p>Author: {story.by}</p>
      <p>Date: {formatDate(story.time)}</p>
      <p>{story.text}</p>
      <p>Comments: {story.descendants}</p>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={handleAddComment}>Add Comment</button>
      <ul>
        {comments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            onEdit={handleEditComment}
            onDelete={handleDeleteComment}
          />
        ))}
      </ul>
      <Link to="/">Back to the news</Link>
    </div>
  );
};

export default NewsDetail;