import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewsList from './components/NewsList';
import NewsDetail from './pages/NewsDetail';
import AddNews from './pages/AddNews';
import { fetchTopStories } from './services/hackerNewsApi';

const App = () => {
  const [news, setNews] = useState([]);
  const [addedNews, setAddedNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTopStories = async () => {
      try {
        const topStories = await fetchTopStories();
        setNews(topStories);
      } catch (err) {
        console.error('Error fetching top stories:', err);
      } finally {
        setLoading(false);
      }
    };

    getTopStories();
  }, []);

  const handleAddNews = (newNews) => {
    setAddedNews([newNews, ...addedNews]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewsList news={news} addedNews={addedNews} loading={loading} />} />
        <Route path="/news/:id" element={<NewsDetail news={news} addedNews={addedNews} />} />
        <Route path="/add-news" element={<AddNews onAddNews={handleAddNews} />} />
      </Routes>
    </Router>
  );
};

export default App;
