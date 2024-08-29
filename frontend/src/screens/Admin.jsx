import React, { useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [subject, setSubject] = useState('');
  const [year, setYear] = useState('');
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [successMessage, setSuccessMessage] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 

  const handleSubmit = async () => {
    if (!subject || !year || !pdf) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    setLoading(true); 
    setErrorMessage('');
    setSuccessMessage('');

    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('year', year);
    formData.append('pdf', pdf);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response);
      setSuccessMessage('File uploaded successfully!'); 
    } catch (error) {
      console.error(error);
      setErrorMessage('Error uploading file');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Upload Question Paper</h1>

      <div className="w-full max-w-lg space-y-4">
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a subject</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
          <option value="English">English</option>
        </select>

        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="file"
          onChange={(e) => setPdf(e.target.files[0])}
          className="w-full p-3 border border-gray-300 rounded-full focus:outline-none"
        />

        <button
          onClick={handleSubmit}
          className="w-full p-3 text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded-full hover:from-blue-600 hover:to-blue-400 transition duration-300"
          disabled={loading} 
        >
          {loading ? 'Uploading...' : 'Submit'}
        </button>

        {successMessage && (
          <div className="text-green-600 font-semibold">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="text-red-600 font-semibold">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default Admin;
