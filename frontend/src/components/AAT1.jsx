import React, { useState, useEffect } from "react";
import axios from "axios";

const AAT1 = () => {
  const [aat1, setAAT1] = useState([]);
  const [certificate, setCertificate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAAT1();
  }, []);

  const fetchAAT1 = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/student/aat1`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setAAT1(res.data);
    } catch (error) {
      setError("Failed to fetch AAT1");
      console.error("Error fetching AAT1:", error);
    }
  };

  const handleUpload = async (aat1Id) => {
    try {
      if (!certificate.trim()) {
        setError("Please enter a Google Drive URL for the certificate");
        return;
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/student/aat1/upload`,
        {
          aat1Id,
          certificate: certificate.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Certificate uploaded successfully");
      setCertificate("");
      fetchAAT1();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to upload certificate";
      setError(errorMessage);
      console.error("Error uploading certificate:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">AAT1</h2>
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      <div className="space-y-6">
        {aat1.map((aat) => (
          <div
            key={aat._id}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {aat.courseLink}
            </h3>
            <p className="text-gray-600 mb-4">
              <span className="font-medium">Deadline:</span>{" "}
              {new Date(aat.deadline).toLocaleString()}
            </p>
            {aat.submitted ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-md">
                <span className="font-medium">Grade:</span> {aat.grade}
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                <input
                  type="text"
                  placeholder="Certificate URL"
                  value={certificate}
                  onChange={(e) => setCertificate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  required
                />
                <button
                  onClick={() => handleUpload(aat._id)}
                  className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Upload Certificate
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AAT1;
