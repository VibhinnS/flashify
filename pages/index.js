import React from 'react';
import { useState } from 'react';
import {msgValue} from '../../whatsapp/index.js'

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      callGenerateEndpoint();
    }
  };

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    console.log(msgValue)
  
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
  
    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)
  
    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  

  const onUserChangedText = (event) => {
    setUserInput(event.target.value)
  }

  const downloadJson = () => {
    try{
      const outputObj = JSON.parse(apiOutput)
      const jsonStr = JSON.stringify(outputObj, null, 2)
      const blob = new Blob([jsonStr], {type: "application/json"})
      const a = document.createElement('a')
      a.href = window.URL.createObjectURL(blob)
      a.download = "output.json"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
    catch(err){
      console.log(err)
  }
}
  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>OpenAI API Test</h1>
          </div>
          <div className="header-subtitle">
            <h2>check the API working or not</h2>
          </div>
        </div>
        {/* Add this code here*/}
        <div className="prompt-container">
          <textarea 
          placeholder="start typing here" 
          className="prompt-box" 
          value={userInput}
          onChange={onUserChangedText}
          onKeyDown={onKeyDown}
          />
          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
                  <div className="generate">
                  {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
                  </div>
            </a>
          </div>
          {apiOutput && (
            <>
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
              <button onClick={downloadJson}>Download JSON</button>
            </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

