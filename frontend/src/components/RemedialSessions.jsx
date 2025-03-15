import React, { useState, useEffect } from "react";
import axios from "axios";

const RemedialSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/student/remedial-sessions`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setSessions(res.data);
    } catch (error) {
      setError("Failed to fetch remedial sessions");
      console.error("Error fetching remedial sessions:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Remedial Sessions</h2>
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      <div className="space-y-6">
        {sessions.map((session) => (
          <div 
            key={session._id} 
            className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-3">{session.title}</h3>
            <p className="text-gray-600 mb-4">{session.description}</p>
            
            <div className="space-y-2 text-sm text-gray-600">
              <p className="flex items-center">
                <span className="font-medium mr-2">Start Time:</span>
                {new Date(session.startTime).toLocaleString()}
              </p>
              <p className="flex items-center">
                <span className="font-medium mr-2">End Time:</span>
                {new Date(session.endTime).toLocaleString()}
              </p>
              <p className="flex items-center">
                <span className="font-medium mr-2">Duration:</span>
                {session.duration} minutes
              </p>
            </div>

            <div className="mt-6">
              <a
                href={session.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Join Session
                <svg 
                  className="ml-2 h-4 w-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RemedialSessions;
