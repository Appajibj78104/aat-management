import AAT1 from "../models/AAT1.js";
import AAT2 from "../models/AAT2.js";
import RemedialSession from "../models/RemedialSession.js";
import User from "../models/User.js";
import { sendEmail } from "../utils/emailUtils.js";
import StudentAAT1 from "../models/StudentAAT1.js";

// Create AAT1
export const createAAT1 = async (req, res) => {
  const { courseLink, deadline } = req.body;
  // Use optional chaining in case req.user isn't set
  const facultyId = req.user?.id;

  if (!facultyId) {
    console.error("Faculty ID is missing from req.user. Check your authentication middleware.");
    return res.status(400).json({ message: "Faculty ID missing. Authentication failed." });
  }

  try {
    const aat1 = await AAT1.create({ courseLink, deadline, facultyId });
    res.status(201).json(aat1);
  } catch (error) {
    console.error("Error in createAAT1:", error);
    res.status(500).json({ message: "Failed to create AAT1", error: error.message });
  }
};

export const createAAT2 = async (req, res) => {
  const { title, questions, startTime, endTime, duration } = req.body;
  const facultyId = req.user?.id;

  if (!facultyId) {
    console.error("Faculty ID is missing from req.user in createAAT2.");
    return res.status(400).json({ message: "Faculty ID missing. Authentication failed." });
  }
  
  try {
    const aat2 = await AAT2.create({ title, questions, startTime, endTime, duration, facultyId });
    res.status(201).json(aat2);
  } catch (error) {
    console.error("Error in createAAT2:", error);
    res.status(500).json({ message: "Failed to create AAT2", error: error.message });
  }
};

// Create Remedial Session
export const createRemedialSession = async (req, res) => {
  const { title, description, startTime, endTime, duration, link, students } = req.body;
  const facultyId = req.user?.id;

  if (!facultyId) {
    console.error("Faculty ID is missing from req.user in createRemedialSession.");
    return res.status(400).json({ message: "Faculty ID missing. Authentication failed." });
  }

  try {
    const remedialSession = await RemedialSession.create({
      title,
      description,
      startTime,
      endTime,
      duration,
      link,
      facultyId,
      students,
    });

    // Send email notifications to selected students
    const studentEmails = await User.find({ _id: { $in: students } }).select("email");
    studentEmails.forEach((student) => {
      sendEmail(
        student.email,
        "Remedial Session Notification",
        `You have been invited to a remedial session. Title: ${title}, Description: ${description}, Start Time: ${startTime}, End Time: ${endTime}, Duration: ${duration} minutes, Link: ${link}`
      );
    });

    res.status(201).json(remedialSession);
  } catch (error) {
    console.error("Error in createRemedialSession:", error);
    res.status(500).json({ message: "Failed to create remedial session", error: error.message });
  }
};

// View Students
export const viewStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select("-password");
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Failed to fetch students" });
  }
};

// Get AAT1 submissions
export const getAAT1Submissions = async (req, res) => {
  try {
    const submissions = await StudentAAT1.find()
      .populate('studentId', 'name')
      .populate('aat1Id', 'courseLink')
      .sort({ createdAt: -1 });

    const formattedSubmissions = submissions.map(sub => ({
      _id: sub._id,
      studentName: sub.studentId?.name || "Unknown",
      courseTitle: sub.aat1Id?.courseLink || "Unknown",
      certificate: sub.certificate,
      grade: sub.grade,
      submittedAt: sub.createdAt
    }));

    res.status(200).json(formattedSubmissions);
  } catch (error) {
    console.error("Error fetching AAT1 submissions:", error);
    res.status(500).json({ message: "Failed to fetch submissions", error: error.message });
  }
};

// Grade AAT1 submission
export const gradeAAT1Submission = async (req, res) => {
  const { submissionId } = req.params;
  const { grade } = req.body;

  try {
    const submission = await StudentAAT1.findById(submissionId);
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    submission.grade = grade;
    await submission.save();

    res.status(200).json({ message: "Grade updated successfully" });
  } catch (error) {
    console.error("Error updating grade:", error);
    res.status(500).json({ message: "Failed to update grade", error: error.message });
  }
};
