import React, { useState } from "react";
import axios from "axios";

const CreateAAT1 = () => {
  const [courseLink, setCourseLink] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/faculty/aat1`,
        { courseLink, deadline },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("AAT1 created successfully");
      setCourseLink("");
      setDeadline("");
    } catch (error) {
      setError("Failed to create AAT1");
      console.error("Error creating AAT1:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Create AAT1</h2>
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <label htmlFor="courseLink" className="block text-sm font-medium text-gray-700 mb-2">
            Course Link
          </label>
          <input
            id="courseLink"
            type="text"
            placeholder="Enter course link"
            value={courseLink}
            onChange={(e) => setCourseLink(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            required
          />
        </div>
        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
            Deadline
          </label>
          <input
            id="deadline"
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Create AAT1
        </button>
      </form>
    </div>
  );
};

export default CreateAAT1;
