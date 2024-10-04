import React, { useState } from 'react';

const Questionnaire = () => {
  const [answers, setAnswers] = useState({});

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(answers);
    // Handle form submission (e.g., send data to backend)
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {questions.map((q) => (
        <div key={q.id} className="mb-6">
          <p className="mb-4 text-lg font-medium text-gray-700">{q.question}</p>
          <div className="space-y-2">
            {q.options.map((option, index) => (
              <label
                key={index}
                className="flex items-center space-x-2 text-gray-600"
              >
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={option}
                  checked={answers[q.id] === option}
                  onChange={() => handleOptionChange(q.id, option)}
                  className="form-radio h-5 w-5 text-orange-500"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
      >
        Submit
      </button>
    </form>
  );
};

export default Questionnaire;
