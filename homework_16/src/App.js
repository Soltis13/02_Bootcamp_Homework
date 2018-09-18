import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Clicky Game</h1>

          <input type="text" 
          onChange={this.inputChangedHandler} 
          value={this.userInput} />
          <p>{this.state.userInput}</p>
          <Guess input ={this.state.userInput.text}/>

          <input type="text" 
            //onChange from inputChangedHandler
            //change the value of score
            //an h1 of the userinput state
            //component to collect teh score and high score
            //{output}
          />
        </header>

        <body className="App-body">
          <h1>Clicky Game!</h1>
          <h2>Click on an image to earn points, but don't click on any more than once!</h2>
          <div //image div
          />
        </body>

        <footer className="App-footer">
          <p>Clicky Game</p>
          <p //link to bootcamp code
          />
        </footer>
      </div>
    );
  }
}

export default App;
