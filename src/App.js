import React, { Component } from 'react';
import characters from "./characters.json";
import PictureCard from "./components/PictureCard";
import './App.css';


class App extends Component {
  state = {
    characters,
    score: 0,
    message: ""
  };

  componentWillMount() {
    this.setState({message: "Game Start!"});
  };

  correctAnswer = id => {
    // Map characters array
    const characters = this.state.characters.map(friend => {
      if (friend.id === id ) {
        // Updates the clicked friend clicked status
        let clickedfriend = friend;
        clickedfriend.clicked = true;

        return clickedfriend;
      }
      else return friend;
    });
    // Randomizes the array
    characters.sort(function(a, b){return 0.5 - Math.random()});
    // Increments score, sends correct message
    this.setState({
        score: this.state.score +1,
        characters,
        message: "Correct!"
      });
  }

  wrongAnswer = () => {
    let characters = this.state.characters.map(friend => {
      let characters = friend; 
      characters.clicked = false;
      return characters;
    })

    // Randomizes the array
    characters.sort(function(a, b){return 0.5 - Math.random()});

    // Resets score, changes message to 
    this.setState({
      score: 0,
      characters,
      message: "Uh-oh! You clicked someone twice. Try again!"
    });
  };

  clickMemory = id => {
    // Grabs the clicked image
    const image= this.state.characters.filter(friend => friend.id  === id)

    // If the image has already been clicked
    if (image[0].clicked === true){
      this.wrongAnswer();
    }

    // If the Image hasn't already been clicked
    else {
      this.correctAnswer(id);
    }
  };


  render() {
    return (
      <div className="App">
        <header className="App-header sticky-top">
          <h1>{this.state.message}</h1>
          <h2>Score: {this.state.score}</h2>
        </header>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4 title">Parks and Recreation Memory Game</h1>
            <p className="lead">Click on one of the characters to earn a point. Don't click on the same character twice or you will lose!</p>
          </div>
        </div>
        <div className="container">
          <div className="form-row">
            {this.state.characters.map(friend => (
            <PictureCard
              removeFriend={this.clickMemory}
              id={friend.id}
              key={friend.id}
              name={friend.name}
              image={friend.image}
            />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
