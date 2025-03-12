import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewAAT1Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await axios.get("/api/faculty/aat1/submissions", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSubmissions(res.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch submissions");
      console.error("Error fetching submissions:", error);
      setLoading(false);
    }
  };

  const handleGrade = async (submissionId, grade) => {
    try {
      await axios.post(
        `/api/faculty/aat1/grade/${submissionId}`,
        { grade },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchSubmissions(); // Refresh the list
      alert("Grade submitted successfully");
    } catch (error) {
      setError("Failed to submit grade");
      console.error("Error submitting grade:", error);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">AAT1 Submissions</h2>
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submission Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Certificate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {submissions.map((submission) => (
                <tr key={submission._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {submission.studentName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {submission.courseTitle}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(submission.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <a
                      href={submission.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View Certificate
                    </a>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {submission.grade || "Not graded"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <select
                      onChange={(e) => handleGrade(submission._id, e.target.value)}
                      className="border rounded px-2 py-1"
                      defaultValue={submission.grade || ""}
                    >
                      <option value="" disabled>
                        Select Grade
                      </option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="F">F</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewAAT1Submissions; 