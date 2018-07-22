import React from 'react';
import Header from './Header';
import Feedback from './Feedback';
import Translator from './Translator';
import './App.css';

const App = () =>
  <div className="App">
    <Header/>

    <div className="App-container">
      <Translator/>

      <Feedback/>
    </div>
  </div>;

export default App;
