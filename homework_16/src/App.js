import React, { Component } from 'react';
import logo from './logo.svg';
import GuessMessage from './Guess/Guess'
import './App.css';
import ImageCard from './Image/Image';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Clicky Game</h1>
          {GuessMessage}
          
        </header>

        <body className="App-body">

          <div className="Title-body">
            <h1>Clicky Game!</h1>
            <h2>Click on an image to earn points, but don't click on any more than once!</h2>
          </div>

          <div className="Image-body">
            {ImageCard}
          </div>

        </body>
      </div>
    );
  };
};

export default App;
