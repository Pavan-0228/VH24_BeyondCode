import React, { useState } from 'react';

const Questionnaire = () => {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const questions = [
    {
      id: 1,
      question: "On a scale of 1 to 10, how comfortable are you with taking financial risks?",
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    {
      id: 2,
      question: "How would you react if your investment portfolio lost 20% of its value in a short period?",
      options: [
        "Sell everything",
        "Sell some, hold the rest",
        "Do nothing",
        "Buy more while prices are low",
      ],
    },
    {
      id: 3,
      question: "What is your primary financial goal?",
      options: ["Retirement", "Education", "Wealth Growth"],
    },
    {
      id: 4,
      question: "How long are you planning to keep your investments before needing the funds?",
      options: ["Less than 5 years", "5-10 years", "10-20 years", "More than 20 years"],
    },
    {
      id: 5,
      question: "How would you describe your current lifestyle?",
      options: ["Frugal", "Balanced", "Lavish"],
    },
    {
      id: 6,
      question: "Do you have any large future expenses planned?",
      options: ["Buying a home", "Children's education", "Medical costs", "None"],
    },
    {
      id: 7,
      question: "Do you expect your income to increase, decrease, or remain stable in the next 5-10 years?",
      options: ["Increase", "Decrease", "Remain stable"],
    },
    {
      id: 8,
      question: "How often do you follow market trends and news related to finance and investments?",
      options: ["Daily", "Weekly", "Monthly", "Rarely"],
    },
    {
      id: 9,
      question: "Do you have an emergency fund in place to cover unexpected expenses?",
      options: ["Yes", "No"],
    },
    {
      id: 10,
      question: "How would you react to a sudden financial emergency (e.g., job loss, medical emergency)?",
      options: ["Use emergency funds", "Sell investments", "Take out a loan", "Unsure"],
    },
    {
      id: 11,
      question: "Do you have any dependents (e.g., children, elderly family) for whom you're planning to provide financially?",
      options: ["Yes", "No"],
    },
    {
      id: 12,
      question: "What percentage of your monthly income do you save or invest?",
      options: ["Less than 10%", "10-20%", "20-30%", "More than 30%"],
    },
    {
      id: 13,
      question: "How important is securing your dependents' future to you?",
      options: ["Very important", "Somewhat important", "Not important"],
    },
    {
      id: 14,
      question: "Have you previously changed your investment strategy due to market predictions or economic forecasts?",
      options: ["Yes", "No"],
    },
    {
      id: 15,
      question: "Are you currently invested in any of the following assets?",
      options: ["Stocks", "Bonds", "Real Estate", "Mutual Funds", "None"],
    },
  ];

  const handleOptionChange = (questionId, option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
    setErrorMessage(''); // Reset error message when an option is selected
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(answers);
    // Handle form submission (e.g., send data to backend)
  };

  const handleNext = () => {
    if (!answers[questions[currentQuestion].id]) {
      setErrorMessage('Please select an answer before proceeding.');
      return;
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setErrorMessage(''); // Clear error message when moving to the next question
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setErrorMessage(''); // Clear error message when moving to the previous question
    }
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-gray-800 shadow-xl rounded-xl overflow-hidden">
        <div className="bg-[#753efc] text-white p-6">
          <h2 className="text-2xl font-bold">Financial Risk Assessment</h2>
          <p className="text-gray-400">Question {currentQuestion + 1} of {questions.length}</p>
        </div>
        <div className="p-6">
          <div className="mb-6 bg-gray-600 rounded-full h-2.5">
            <div
              className="bg-green-500 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          {/* Error message for missing answers */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div key={questions[currentQuestion].id} className="mb-6">
              <p className="mb-4 text-lg font-medium text-gray-200">{questions[currentQuestion].question}</p>
              <div className="grid grid-cols-2 gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <label
                    key={index}
                  className="flex items-center space-x-2 p-3 border border-[#753efc] rounded-lg cursor-pointer transition-colors duration-200 ease-in-out hover:bg-gray-700"
                  >
                    <input
                      type="radio"
                      name={`question-${questions[currentQuestion].id}`}
                      value={option}
                      checked={answers[questions[currentQuestion].id] === option}
                      onChange={() => handleOptionChange(questions[currentQuestion].id, option)}
                      className="form-radio h-5 w-5 text-[#753efc]"
                    />
                    <span className="text-gray-200">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-500 disabled:opacity-50"
              >
                Previous
              </button>
              {currentQuestion < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-[#753efc] text-white rounded-lg hover:bg-[#753efc] flex items-center"
                >
                  Next
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
