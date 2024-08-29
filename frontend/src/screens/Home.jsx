import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    if (!subject) {
      alert('Please select a subject');
      return;
    }
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.get('http://localhost:5000/get_questions', {
        params: { subject }
      });
      setQuestions(response.data.questions);
      if(response.data.questions == null){
        setErrorMessage('no question papers found');
      }

    } catch (error) {
      console.error(error);
      setErrorMessage('Error fetching questions. Please try again later.'); 
    } finally {
      setLoading(false);
    }
  };

  const formatText = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className='flex justify-center'>
      <div className="flex flex-col items-center space-y-4 p-6 lg:w-1/2">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Student Page
        </h1>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a subject</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
          <option value="English">English</option>
        </select>
        
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full p-2 text-white rounded-md ${
            loading ? 'bg-gray-400 cursor-not-allowed' : ' bg-gradient-to-tr from-blue-400 to-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>

        {errorMessage && (
          <div className="mt-4 p-4 text-red-500">
            {errorMessage} 
          </div>
        )}

        {questions && (
          <div className="mt-4 p-4 border border-gray-300 rounded-md w-full">
            {formatText(questions.output_text)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
