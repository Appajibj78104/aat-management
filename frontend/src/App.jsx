import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import SuperadminDashboard from "./components/SuperAdminDashboard";
import AdminDashboard from "./components/AdminDashboard";
import FacultyDashboard from "./components/FacultyDashboard";
import CreateAAT1 from "./components/CreateAAT1";
import CreateAAT2 from "./components/CreateAAT2";
import CreateRemedialSession from "./components/CreateRemedialSession";
import ViewStudents from "./components/ViewStudents";
import StudentDashboard from "./components/StudentDashboard";
import AAT1 from "./components/AAT1";
import AAT2 from "./components/AAT2";
import RemedialSessions from "./components/RemedialSessions";
import Statistics from "./components/Statistics";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Routes>
            {/* Update default route to show landing page */}
            <Route path="/" element={<LandingPage />} />

            {/* Login and Register routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Superadmin routes */}
            <Route path="/superadmin" element={<SuperadminDashboard />} />

            {/* Admin routes */}
            <Route path="/admin" element={<AdminDashboard />} />

            {/* Faculty dashboard and nested routes */}
            <Route path="/faculty/*" element={<FacultyDashboard />} />

            {/* Student dashboard and nested routes */}
            <Route path="/student" element={<StudentDashboard />}>
              <Route path="aat1" element={<AAT1 />} />
              <Route path="aat2" element={<AAT2 />} />
              <Route path="remedial-sessions" element={<RemedialSessions />} />
              <Route path="statistics" element={<Statistics />} />
            </Route>

            {/* Fallback route for invalid paths */}
            <Route 
              path="*" 
              element={
                <div className="flex min-h-screen items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900">404</h1>
                    <p className="mt-2 text-lg text-gray-600">Page Not Found</p>
                  </div>
                </div>
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;