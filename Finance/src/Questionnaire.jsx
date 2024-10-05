import React, { useState } from 'react';
import RiskAssessmentResult from './components/RiskAssessmentResult';
import axios from 'axios';

const Questionnaire = () => {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [riskCategory, setRiskCategory] = useState(null);

  const questions = [
    {
      "id": 1,
      "question": "On a scale of 1 to 10, how comfortable are you with taking financial risks?",
      "responses": [
        { "option": 1, "score": 1 },
        { "option": 2, "score": 2 },
        { "option": 3, "score": 3 },
        { "option": 4, "score": 4 },
        { "option": 5, "score": 5 },
        { "option": 6, "score": 6 },
        { "option": 7, "score": 7 },
        { "option": 8, "score": 8 },
        { "option": 9, "score": 9 },
        { "option": 10, "score": 10 }
      ]
    },
    {
      "id": 2,
      "question": "How would you react if your investment portfolio lost 20% of its value in a short period?",
      "responses": [
        { "option": "Sell everything", "score": 1 },
        { "option": "Sell some, hold the rest", "score": 2 },
        { "option": "Do nothing", "score": 4 },
        { "option": "Buy more while prices are low", "score": 6 }
      ]
    },
    {
      "id": 3,
      "question": "What is your primary financial goal?",
      "responses": [
        { "option": "Retirement", "score": 1 },
        { "option": "Education", "score": 3 },
        { "option": "Wealth Growth", "score": 5 }
      ]
    },
    {
      "id": 4,
      "question": "How long are you planning to keep your investments before needing the funds?",
      "responses": [
        { "option": "Less than 5 years", "score": 1 },
        { "option": "5-10 years", "score": 3 },
        { "option": "10-20 years", "score": 5 },
        { "option": "More than 20 years", "score": 7 }
      ]
    },
    {
      "id": 5,
      "question": "How would you describe your current lifestyle?",
      "responses": [
        { "option": "Frugal", "score": 1 },
        { "option": "Balanced", "score": 3 },
        { "option": "Lavish", "score": 5 }
      ]
    },
    {
      "id": 6,
      "question": "Do you have any large future expenses planned?",
      "responses": [
        { "option": "Buying a home", "score": 2 },
        { "option": "Children's education", "score": 3 },
        { "option": "Medical costs", "score": 4 },
        { "option": "None", "score": 5 }
      ]
    },
    {
      "id": 7,
      "question": "Do you expect your income to increase, decrease, or remain stable in the next 5-10 years?",
      "responses": [
        { "option": "Increase", "score": 5 },
        { "option": "Decrease", "score": 1 },
        { "option": "Remain stable", "score": 3 }
      ]
    },
    {
      "id": 8,
      "question": "How often do you follow market trends and news related to finance and investments?",
      "responses": [
        { "option": "Daily", "score": 5 },
        { "option": "Weekly", "score": 4 },
        { "option": "Monthly", "score": 3 },
        { "option": "Rarely", "score": 1 }
      ]
    },
    {
      "id": 9,
      "question": "Do you have an emergency fund in place to cover unexpected expenses?",
      "responses": [
        { "option": "Yes", "score": 5 },
        { "option": "No", "score": 1 }
      ]
    },
    {
      "id": 10,
      "question": "How would you react to a sudden financial emergency (e.g., job loss, medical emergency)?",
      "responses": [
        { "option": "Use emergency funds", "score": 5 },
        { "option": "Sell investments", "score": 2 },
        { "option": "Take out a loan", "score": 1 },
        { "option": "Unsure", "score": 3 }
      ]
    },
    {
      "id": 11,
      "question": "Do you have any dependents for whom you're planning to provide financially?",
      "responses": [
        { "option": "Yes", "score": 1 },
        { "option": "No", "score": 5 }
      ]
    },
    {
      "id": 12,
      "question": "What percentage of your monthly income do you save or invest?",
      "responses": [
        { "option": "Less than 10%", "score": 1 },
        { "option": "10-20%", "score": 3 },
        { "option": "20-30%", "score": 5 },
        { "option": "More than 30%", "score": 7 }
      ]
    },
    {
      "id": 13,
      "question": "How important is securing your dependents' future to you?",
      "responses": [
        { "option": "Very important", "score": 1 },
        { "option": "Somewhat important", "score": 3 },
        { "option": "Not important", "score": 5 }
      ]
    },
    {
      "id": 14,
      "question": "Have you previously changed your investment strategy due to market predictions or economic forecasts?",
      "responses": [
        { "option": "Yes", "score": 1 },
        { "option": "No", "score": 5 }
      ]
    },
    {
      "id": 15,
      "question": "Are you currently invested in any of the following assets?",
      "responses": [
        { "option": "Stocks", "score": 5 },
        { "option": "Bonds", "score": 3 },
        { "option": "Real Estate", "score": 4 },
        { "option": "Mutual Funds", "score": 3 },
        { "option": "None", "score": 1 }
      ]
    },
    {
      "id": 16,
      "question": "How old are you?",
      "responses": [
        { "option": "18-24", "score": 1 },
        { "option": "25-29", "score": 2 },
        { "option": "30-39", "score": 3 },
        { "option": "40-49", "score": 4 },
        { "option": "50-59", "score": 5 },
        { "option": "60 or older", "score": 6 }
      ]
    }
  ]

  const riskCategories = [
    {
      "veryLow": {
        "minScore": 0,
        "maxScore": 20,
        "investorType": "Very Conservative",
        "description": "You prefer minimal risk and are likely to avoid volatile investments."
      },
      "low": {
        "minScore": 21,
        "maxScore": 45,
        "investorType": "Conservative",
        "description": "You are risk-averse and prefer stable investments."
      },
      "mediumLow": {
        "minScore": 46,
        "maxScore": 60,
        "investorType": "Moderate Conservative",
        "description": "You take some risks but still prefer stability in your investments."
      },
      "medium": {
        "minScore": 61,
        "maxScore": 75,
        "investorType": "Balanced",
        "description": "You balance between risk and reward, with a preference for growth and stability."
      },
      "mediumHigh": {
        "minScore": 76,
        "maxScore": 85,
        "investorType": "Growth-Oriented",
        "description": "You are willing to take calculated risks for higher returns."
      },
      "high": {
        "minScore": 86,
        "maxScore": 100,
        "investorType": "Aggressive",
        "description": "You are comfortable with high levels of risk for maximum potential returns."
      },
      "veryHigh": {
        "minScore": 101,
        "maxScore": 120,
        "investorType": "Very Aggressive",
        "description": "You seek the highest returns and are willing to tolerate significant volatility."
      }
    }
  ];

  const handleOptionChange = (questionId, option) => {
    const previousScore = answers[questionId] ? answers[questionId].score : 0;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
    setTotalScore((prevScore) => prevScore - previousScore + option.score);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(answers).length !== questions.length) {
      setErrorMessage('Please answer all questions before submitting.');
      return;
    }
    const category = riskCategories[0][Object.keys(riskCategories[0]).find(key => 
      totalScore >= riskCategories[0][key].minScore && totalScore <= riskCategories[0][key].maxScore
    )];
    setRiskCategory(category);
    setShowResult(true);

    const backUrl = import.meta.env.VITE_APP_URL;


    try {
      const responses = await axios.put(`${backUrl}/api/v1/auth/setInvestorType`,{
        investorType: category.investorType
      },{
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`, 
        }
      })
  
      console.log(responses.data);
    } catch (error) {
      console.error(error);
      
    }

  };

  const handleNext = () => {
    if (!answers[questions[currentQuestion].id]) {
      setErrorMessage('Please select an answer before proceeding.');
      return;
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setErrorMessage('');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setErrorMessage('');
    }
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      {!showResult && (
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

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div key={questions[currentQuestion].id} className="mb-6">
              <p className="mb-4 text-lg font-medium text-gray-200">{questions[currentQuestion].question}</p>
              <div className="grid grid-cols-2 gap-4">
                {questions[currentQuestion].responses.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-2 p-3 border border-[#753efc] rounded-lg cursor-pointer transition-colors duration-200 ease-in-out hover:bg-gray-700"
                  >
                    <input
                      type="radio"
                      name={`question-${questions[currentQuestion].id}`}
                      value={option.option}
                      checked={answers[questions[currentQuestion].id]?.option === option.option}
                      onChange={() => handleOptionChange(questions[currentQuestion].id, option)}
                      className="form-radio h-5 w-5 text-[#753efc]"
                    />
                    <span className="text-gray-200">{option.option}</span>
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
      ) }
      <RiskAssessmentResult 
        showResult={showResult}
        riskCategory={riskCategory}
        totalScore={totalScore}
      />
    </div>
  );
};

export default Questionnaire;