'use client';

import { useState } from 'react';
import axios from 'axios';
import "../globals.css";

const Page = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);

  const fetchArticles = async () => {
    if (!globalSearch.trim()) return; 

    setLoading(true);
    setSearchClicked(true);
    try {
      const apiKey = process.env.API_KEY ;
      const response = await axios.get(
        `https://content.guardianapis.com/search?q=${encodeURIComponent(globalSearch)}&api-key=${apiKey}&show-fields=byline,publication`
      );
      setArticles(response.data.response.results || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') fetchArticles();
  };

  return (
    <div className="flex bg-black">
      {/* Main Content */}
      <div className="flex-1 p-6">
    
        {/* Search Bar */}
        <div className="flex gap-2 mt-4">
          <input 
            type="text" 
            value={globalSearch} 
            onChange={(e) => setGlobalSearch(e.target.value)} 
            onKeyPress={handleKeyPress} 
            placeholder="Search articles..." 
            className="p-2 border-2 rounded-2xl flex-1 text-white bg-black"
          />
          <button onClick={fetchArticles} className="bg-black text-white px-4 py-2 rounded-md">
            Search
          </button>
        </div>

        {/* Articles Display */}
        {loading ? (
          <div className="mt-4">Loading...</div>
        ) : (
          <div className="mt-6">
            {articles.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {articles.map((article) => (
                  <div key={article.id} className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition">
                    <a
                      href={article.webUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <h3 className="text-lg font-semibold hover:text-blue-400">
                        {article.webTitle}
                      </h3>
                    </a>
                    <a className="text-sm text-gray-600"><strong>Author:</strong> {article.fields?.byline || 'Unknown'}</a>
                    <p className="text-sm text-gray-600"><strong>Published Date:</strong> {new Date(article.webPublicationDate).toLocaleDateString()}</p>
                    <p className="text-gray-400 text-sm">Type: {article.type}</p>
                  </div>
                ))}
              </div>
            ) : (
              searchClicked && <p className="mt-4 text-gray-500">No articles found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
