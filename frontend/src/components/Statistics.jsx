import React, { useState, useEffect } from "react";
import axios from "axios";

const Statistics = () => {
  const [statistics, setStatistics] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/student/statistics`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setStatistics(res.data);
    } catch (error) {
      setError("Failed to fetch statistics");
      console.error("Error fetching statistics:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Statistics</h2>
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600 font-medium mb-1">AAT1 Submitted</p>
            <p className="text-2xl font-bold text-blue-800">{statistics.aat1Submitted}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600 font-medium mb-1">AAT2 Submitted</p>
            <p className="text-2xl font-bold text-green-800">{statistics.aat2Submitted}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-600 font-medium mb-1">Sessions Attended</p>
            <p className="text-2xl font-bold text-purple-800">{statistics.sessionsAttended}</p>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 font-medium mb-2">AAT1 Grades</p>
            <div className="flex flex-wrap gap-2">
              {statistics.aat1Grades?.map((grade, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {grade}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 font-medium mb-2">AAT2 Marks</p>
            <div className="flex flex-wrap gap-2">
              {statistics.aat2Marks?.map((mark, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                >
                  {mark}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
