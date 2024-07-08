export const fetchStoryDetails = async (id) => {
    try {
      const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching story details:', error);
      throw error;
    }
  };
  
  export const fetchTopStories = async () => {
    try {
      const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const storyIds = await response.json();
      const stories = await Promise.all(storyIds.slice(0, 30).map(fetchStoryDetails));
      return stories;
    } catch (error) {
      console.error('Error fetching top stories:', error);
      throw error;
    }
  };
  