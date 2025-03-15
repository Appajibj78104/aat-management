import React, { useState } from "react";
import axios from "axios";

const CreateAAT2 = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState("");

  const addQuestion = (type) => {
    setQuestions([
      ...questions,
      {
        type,
        question: "",
        options: type === "mcq" ? [] : null,
        correctAnswer: type === "subjective" ? null : "",
        marks: 0,
      },
    ]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/faculty/aat2`,
        { title, questions, startTime, endTime, duration },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("AAT2 created successfully");
      setTitle("");
      setQuestions([]);
      setStartTime("");
      setEndTime("");
      setDuration("");
    } catch (error) {
      setError("Failed to create AAT2");
      console.error("Error creating AAT2:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Create AAT2</h2>
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-2">
              Start Time
            </label>
            <input
              id="startTime"
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              required
            />
          </div>
          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-2">
              End Time
            </label>
            <input
              id="endTime"
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
            Duration (minutes)
          </label>
          <input
            id="duration"
            type="number"
            placeholder="Enter duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            required
          />
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Questions</h3>
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              type="button"
              onClick={() => addQuestion("mcq")}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Add MCQ
            </button>
            <button
              type="button"
              onClick={() => addQuestion("fillInTheBlanks")}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Add Fill in the Blanks
            </button>
            <button
              type="button"
              onClick={() => addQuestion("subjective")}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Add Subjective
            </button>
          </div>

          {questions.map((question, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 mb-6">
              <input
                type="text"
                placeholder="Question"
                value={question.question}
                onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 mb-4"
                required
              />
              {question.type === "mcq" && (
                <div className="mb-4">
                  <h4 className="font-bold mb-2">Options</h4>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center mb-2">
                      <input
                        type="text"
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option}
                        onChange={(e) => {
                          const updatedOptions = [...question.options];
                          updatedOptions[optionIndex] = e.target.value;
                          handleQuestionChange(index, "options", updatedOptions);
                        }}
                        className="w-full p-2 border rounded"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updatedOptions = question.options.filter((_, i) => i !== optionIndex);
                          handleQuestionChange(index, "options", updatedOptions);
                        }}
                        className="ml-2 bg-red-500 text-white p-2 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const updatedOptions = [...question.options, ""];
                      handleQuestionChange(index, "options", updatedOptions);
                    }}
                    className="bg-green-500 text-white p-2 rounded"
                  >
                    Add Option
                  </button>
                </div>
              )}
              {question.type !== "subjective" && (
                <input
                  type="text"
                  placeholder="Correct Answer"
                  value={question.correctAnswer}
                  onChange={(e) => handleQuestionChange(index, "correctAnswer", e.target.value)}
                  className="w-full p-2 mb-4 border rounded"
                  required
                />
              )}
              <input
                type="number"
                placeholder="Marks"
                value={question.marks}
                onChange={(e) => handleQuestionChange(index, "marks", e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <button
                type="button"
                onClick={() => {
                  const updatedQuestions = questions.filter((_, i) => i !== index);
                  setQuestions(updatedQuestions);
                }}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Remove Question
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Create AAT2
        </button>
      </form>
    </div>
  );
};

export default CreateAAT2;
