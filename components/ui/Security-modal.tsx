'use client';

import { useState } from 'react';
const ConsentModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleCloseModal = () => {
    if (isChecked) {
      setIsModalOpen(false);
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Welcome to the Spiritual AI Chatbot</h2>
        <p className="text-gray-600 mb-4">
          This chatbot is designed to provide insights based on the teachings of the holy Bhagavad Gita. The purpose of this application is to offer spiritual knowledge only.
        </p>
        <p className="text-gray-600 mb-4">
          Please be aware that the responses are neutral and meant for reflection and learning. The advice or recommendations given here are not intended to be practical or taken too seriously.
        </p>
        <p className="text-gray-600 mb-6">
          We encourage you to refrain from asking questions outside the scope of spiritual knowledge, as this chatbot has been specifically trained on the Bhagavad Gita.
        </p>

        <div className="mb-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-gray-600">I agree to the terms and conditions</span>
          </label>
        </div>

        <button
          onClick={handleCloseModal}
          disabled={!isChecked}
          className={`px-4 py-2 rounded transition ${
            isChecked ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
        >
          I Understand
        </button>
      </div>
    </div>
  );
};

export default ConsentModal;
