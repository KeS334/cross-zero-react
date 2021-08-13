import React, { Component } from 'react';
import Players from './Players';
import PlayField from './PlayField';
import './styles/App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalIsShow: true,
      player1: '',
      player2: ''
    }
  }

  setPlayersName = (player1, player2) =>{
    this.setState({ player1, player2, modalIsShow: false })  
  }


  render() {
    return (
      <div className="container">
      
        {(this.state.modalIsShow) && <Players setPlayersName={this.setPlayersName} />}
        <PlayField player1={this.state.player1} player2={this.state.player2}/>
        
      </div>
    );
  }
}

export default App;