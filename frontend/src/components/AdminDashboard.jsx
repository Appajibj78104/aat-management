import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState({ students: [], faculty: [] });
  const [aat1Submissions, setAAT1Submissions] = useState([]);
  const [aat2Submissions, setAAT2Submissions] = useState([]);
  const [remedialSessions, setRemedialSessions] = useState([]);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("users");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      await Promise.all([
        fetchUsers(),
        fetchAAT1Submissions(),
        fetchAAT2Submissions(),
        fetchRemedialSessions(),
      ]);
    } catch (error) {
      setError("Failed to fetch data");
      console.error("Error fetching data:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/users`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUsers({
        students: res.data.filter(user => user.role === "student"),
        faculty: res.data.filter(user => user.role === "faculty")
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchAAT1Submissions = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/aat1-submissions`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setAAT1Submissions(res.data);
    } catch (error) {
      console.error("Error fetching AAT1 submissions:", error);
    }
  };

  const fetchAAT2Submissions = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/aat2-submissions`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setAAT2Submissions(res.data);
    } catch (error) {
      console.error("Error fetching AAT2 submissions:", error);
    }
  };

  const fetchRemedialSessions = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/remedial-sessions`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setRemedialSessions(res.data);
    } catch (error) {
      console.error("Error fetching remedial sessions:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h2>
      <button
        onClick={handleLogout}
        className="text-white px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition-all duration-200"
      >
        Logout
      </button>
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "users"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab("aat1")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "aat1"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          AAT1 Submissions
        </button>
        <button
          onClick={() => setActiveTab("aat2")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "aat2"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          AAT2 Submissions
        </button>
        <button
          onClick={() => setActiveTab("remedial")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "remedial"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Remedial Sessions
        </button>
      </div>

      {/* Content Sections */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === "users" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Students</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.students.map((student) => (
                    <tr key={student._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold mb-4 mt-8">Faculty</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.faculty.map((faculty) => (
                    <tr key={faculty._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{faculty.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{faculty.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "aat1" && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Certificate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {aat1Submissions.map((submission) => (
                  <tr key={submission._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{submission.studentName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{submission.courseTitle}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{submission.grade || "Not graded"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a
                        href={submission.certificate}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View Certificate
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "aat2" && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Test</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Marks</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {aat2Submissions.map((submission) => (
                  <tr key={submission._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{submission.studentName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{submission.testTitle}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{submission.marksObtained}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(submission.submittedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "remedial" && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Faculty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Students</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {remedialSessions.map((session) => (
                  <tr key={session._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{session.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{session.facultyName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(session.startTime).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{session.duration} mins</td>
                    <td className="px-6 py-4 whitespace-nowrap">{session.students.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
