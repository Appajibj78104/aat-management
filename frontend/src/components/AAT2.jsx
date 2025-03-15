import React, { useState, useEffect } from "react";
import axios from "axios";

const AAT2 = () => {
  const [aat2, setAAT2] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAAT2();
  }, []);

  const fetchAAT2 = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/student/aat2`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setAAT2(res.data);
    } catch (error) {
      setError("Failed to fetch AAT2");
      console.error("Error fetching AAT2:", error);
    }
  };

  const handleSubmit = async (aat2Id) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/student/aat2/submit`,
        { aat2Id, answers },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert(`AAT2 submitted successfully. Marks Obtained: ${res.data.marksObtained}`);
      setAnswers([]);
      fetchAAT2();
    } catch (error) {
      setError("Failed to submit AAT2");
      console.error("Error submitting AAT2:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">AAT2</h2>
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      <div className="space-y-6">
        {aat2.map((aat) => (
          <div
            key={aat._id}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-3">{aat.title}</h3>
            <div className="space-y-2 mb-4 text-gray-600">
              <p>
                <span className="font-medium">Start Time:</span>{" "}
                {new Date(aat.startTime).toLocaleString()}
              </p>
              <p>
                <span className="font-medium">End Time:</span>{" "}
                {new Date(aat.endTime).toLocaleString()}
              </p>
            </div>
            {aat.submitted ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-md">
                <span className="font-medium">Marks Obtained:</span> {aat.marksObtained}
              </div>
            ) : (
              <div className="mt-6 space-y-6">
                {aat.questions.map((question, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-800 mb-3">{question.question}</p>
                    {question.type === "mcq" && (
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <label
                            key={optionIndex}
                            className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                          >
                            <input
                              type="radio"
                              name={`question-${index}`}
                              value={option}
                              onChange={(e) => {
                                const updatedAnswers = [...answers];
                                updatedAnswers[index] = e.target.value;
                                setAnswers(updatedAnswers);
                              }}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    {question.type === "fillInTheBlanks" && (
                      <input
                        type="text"
                        placeholder="Your answer"
                        value={answers[index] || ""}
                        onChange={(e) => {
                          const updatedAnswers = [...answers];
                          updatedAnswers[index] = e.target.value;
                          setAnswers(updatedAnswers);
                        }}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      />
                    )}
                    {question.type === "subjective" && (
                      <textarea
                        placeholder="Your answer"
                        value={answers[index] || ""}
                        onChange={(e) => {
                          const updatedAnswers = [...answers];
                          updatedAnswers[index] = e.target.value;
                          setAnswers(updatedAnswers);
                        }}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 min-h-[100px]"
                      />
                    )}
                  </div>
                ))}
                <button
                  onClick={() => handleSubmit(aat._id)}
                  className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Submit AAT2
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AAT2;
