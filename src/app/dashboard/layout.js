"use client";
import PayoutCalculator from "./payout/page";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "next-auth/react"; 
import axios from "axios";
import "../globals.css";

const NewsBlogIntegration = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("business");
  const [authorFilter, setAuthorFilter] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [typeFilter, setTypeFilter] = useState("");
  const [showPayout, setShowPayout] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const apiKey = "af418483-cb6e-4a99-8699-bb9419436480";
        const queryParams = new URLSearchParams({
          "api-key": apiKey,
          q: category,
          "show-fields": "thumbnail,byline,publication",
          "show-tags": "type",
        });

        if (authorFilter) queryParams.append("byline", authorFilter);
        if (dateRange.start) queryParams.append("from-date", dateRange.start);
        if (dateRange.end) queryParams.append("to-date", dateRange.end);
        if (typeFilter) queryParams.append("tag", `type/${typeFilter}`);

        const response = await axios.get(
          `https://content.guardianapis.com/search?${queryParams.toString()}`
        );
        setArticles(response.data.response.results || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, authorFilter, dateRange, typeFilter]);

  return (
    <div className="h-full p-4">
      {/* Sidebar Toggle Button */}
      <div className="flex flex-row justify-between">
        <div className=" p-1">
          <button onClick={() => setIsOpen(!isOpen)} className="">
            <FontAwesomeIcon icon={faBars} className="text-white text-3xl" />
          </button>
        </div>

        <div className="flex flex-row justify-between">
          <h1 className=" text-2xl font-bold">
            Business Articles from The Guardian
          </h1>
        </div>

        <div>
          <button
            onClick={() => setShowPayout(!showPayout)}
            className="p-1 text-white rounded-xl border-2"
          >
            Payout
          </button>
        </div>

        <div className="">
        <button
  onClick={() => signOut({ callbackUrl: "/" })} 
  className="p-1 text-white rounded-xl border-2   hover:text-[18px] transition"
>
  Logout
</button>

        </div>
      </div>

      {/* Floating PayoutCalculator */}
      {showPayout && (
        <div className="fixed top-20 right-4 z-50">
          <PayoutCalculator />
        </div>
      )}

      <div className="flex">
        {/* Sidebar with Filters */}
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
            className="relative left-0 w-64 h-full overflow-y-auto bg-black shadow-lg p-4 pt-4 z-50"
          >
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <ul>
              {["business", "news", "blog", "technology", "sport", "health"].map((cat) => (
                <li
                  key={cat}
                  className={`py-2 cursor-pointer hover:text-blue-500 ${
                    category === cat ? "text-blue-400 font-bold" : "text-white"
                  }`}
                  onClick={() => setCategory(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </li>
              ))}
            </ul>

            {/* Search & Filters */}
            <div className="mt-4">
              <h4 className="font-semibold text-white mt-4">Filter by Author</h4>
              <input
                type="text"
                placeholder="Author name"
                value={authorFilter}
                onChange={(e) => setAuthorFilter(e.target.value)}
                className="w-full p-2 mt-2 rounded bg-gray-700 text-white"
              />

              <h4 className="font-semibold text-white mt-4">Filter by Date</h4>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="w-full p-2 mt-2 rounded bg-gray-700 text-white"
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="w-full p-2 mt-2 rounded bg-gray-700 text-white"
              />

              <h4 className="font-semibold text-white mt-4">Filter by Type</h4>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full p-2 mt-2 rounded bg-gray-700 text-white"
              >
                <option value="">All</option>
                <option value="article">Article</option>
                
              </select>
            </div>
          </motion.div>
        )}

        {/* Articles Section */}
        <div className="w-full ml-8 mt-2">
          {children}
          {loading ? (
            <div className="text-blue-500 text-center text-xl">Loading...</div>
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 ml-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition"
                >
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
            <p className="mt-4 text-gray-500 text-center">No articles found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsBlogIntegration;
