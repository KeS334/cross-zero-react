import React, { Component } from 'react';
import './styles/Players.css';

class Players extends Component {
    constructor(props){
        super(props);
        this.state = {
            player1: 'Player 1',
            player2: 'Player 2',
        }
    }
    setPlayersName = () =>{
        const {player1, player2} = this.state;
        if (player1==='' || player2 === ''){
            alert("Please enter Player Name");
        } else{
            this.props.setPlayersName(this.state.player1, this.state.player2);
        }
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (
            <div className="modal-background">
                <div className="modal">
                    <input value={this.state.player1} onChange={this.handleChange} name="player1"/>
                    <input value={this.state.player2} onChange={this.handleChange} name="player2"/>
                    <button onClick={this.setPlayersName}>Start</button>
                </div>
            </div>
        );
    }
}

export default Players;