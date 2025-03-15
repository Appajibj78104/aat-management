import User from "../models/User.js";
import StudentAAT1 from "../models/StudentAAT1.js";
import StudentAAT2 from "../models/StudentAAT2.js";
import RemedialSession from "../models/RemedialSession.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ["student", "faculty"] } }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const getAAT1Submissions = async (req, res) => {
  try {
    const submissions = await StudentAAT1.find()
      .populate('studentId', 'name')
      .populate('aat1Id', 'courseLink')
      .sort({ createdAt: -1 });

    const formattedSubmissions = submissions.map(sub => ({
      _id: sub._id,
      studentName: sub.studentId.name,
      courseTitle: sub.aat1Id.courseLink,
      certificate: sub.certificate,
      grade: sub.grade,
      submittedAt: sub.createdAt
    }));

    res.status(200).json(formattedSubmissions);
  } catch (error) {
    console.error("Error fetching AAT1 submissions:", error);
    res.status(500).json({ message: "Failed to fetch submissions" });
  }
};

export const getAAT2Submissions = async (req, res) => {
  try {
    const submissions = await StudentAAT2.find()
      .populate('studentId', 'name')
      .populate('aat2Id', 'title')
      .sort({ createdAt: -1 });

      const formattedSubmissions = submissions.map(sub => ({
        _id: sub._id,
        studentName: sub.studentId ? sub.studentId.name : "Unknown Student",
        testTitle: sub.aat2Id ? sub.aat2Id.title : "Unknown Test",
        marksObtained: sub.marksObtained,
        submittedAt: sub.createdAt
      }));

    res.status(200).json(formattedSubmissions);
  } catch (error) {
    console.error("Error fetching AAT2 submissions:", error);
    res.status(500).json({ message: "Failed to fetch submissions" });
  }
};

export const getRemedialSessions = async (req, res) => {
  try {
    const sessions = await RemedialSession.find()
      .populate('facultyId', 'name')
      .sort({ startTime: 1 });

      const formattedSessions = sessions.map(session => ({
        _id: session._id,
        title: session.title,
        facultyName: session.facultyId ? session.facultyId.name : "Unknown Faculty",
        startTime: session.startTime,
        duration: session.duration,
        students: session.students
      }));
      

    res.status(200).json(formattedSessions);
  } catch (error) {
    console.error("Error fetching remedial sessions:", error);
    res.status(500).json({ message: "Failed to fetch sessions" });
  }
}; 