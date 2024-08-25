
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const res = await axios.post('https://bajaj-task-ebcv.onrender.com/bfhl', parsedJson);
      setResponse(res.data);
    } catch (error) {
      alert('Invalid JSON input or server error.');
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter(option => option !== value));
    }
  };

  const renderResponse = () => {
    if (!response) return null;
    const filteredResponse = selectedOptions.reduce((acc, option) => {
      acc[option] = response[option];
      return acc;
    }, {});
    return <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>BFHL Challenge</h1>
      <textarea
        rows="5"
        cols="50"
        value={jsonInput}
        onChange={handleInputChange}
        placeholder='Enter JSON input'
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>

      <div style={{ marginTop: '20px' }}>
        <h2>Select Options:</h2>
        <label>
          <input
            type="checkbox"
            value="numbers"
            onChange={handleOptionChange}
          />
          Numbers
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="alphabets"
            onChange={handleOptionChange}
          />
          Alphabets
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="highest_lowercase_alphabet"
            onChange={handleOptionChange}
          />
          Highest Lowercase Alphabet
        </label>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Response:</h2>
        {renderResponse()}
      </div>
    </div>
  );
}

export default App;
