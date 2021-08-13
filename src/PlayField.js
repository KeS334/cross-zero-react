import React, { Component } from 'react';
import './styles/PlayField.css';

class PlayField extends Component {
    constructor(props){
        super(props);

        let array = new Array(9).fill('');
        this.state = {
        field: array,
        player1Score: 0,
        player2Score: 0,
        role: true,
        line: 'none',
        block: false,
        isDraw: false
        }
    }
    
    squareClick = (id) => {
        
        let stateTemp = this.state;
        
        if(stateTemp.field[id] || stateTemp.block){
            return false
        } else {
            stateTemp.field = this.makeMove(stateTemp, id); 
            stateTemp.role = !stateTemp.role;
        }
      
        let checkResult = this.check(stateTemp.field);
        if (checkResult){
            stateTemp.line = checkResult;
            stateTemp.block = true;
            if (!stateTemp.role){
                stateTemp.player1Score++
            }else{
                stateTemp.player2Score++
            } 
        } else{
            if(this.fieldIsFilled(stateTemp.field) || !this.winIsPossible(stateTemp.field)){
                stateTemp.block = true;
                stateTemp.isDraw = true;
            }
        }
        
        this.setState({stateTemp});
    }

    makeMove(stateTemp, id){
        if (stateTemp.role){
            stateTemp.field[id] = 'X';
        }
        if (!stateTemp.role){
            stateTemp.field[id] = '0';
        }
        return stateTemp.field
    }

    check(field){
        if ((field[0]) && (field[0] === field[1]) && (field[0] === field[2])) return 'line-row-1';
        if ((field[3]) && (field[3] === field[4]) && (field[3] === field[5])) return 'line-row-2';
        if ((field[6]) && (field[6] === field[7]) && (field[6] === field[8])) return 'line-row-3';

        if ((field[0]) && (field[0] === field[3]) && (field[0] === field[6])) return 'line-col-1';
        if ((field[1]) && (field[1] === field[4]) && (field[1] === field[7])) return 'line-col-2';
        if ((field[2]) && (field[2] === field[5]) && (field[2] === field[8])) return 'line-col-3';

        if ((field[0]) && (field[0] === field[4]) && (field[0] === field[8])) return 'line-diagonal-1';
        if ((field[2]) && (field[2] === field[4]) && (field[2] === field[6])) return 'line-diagonal-2';

        return false;
    }

    fieldIsFilled(currentField){  
        if(!currentField.some(item => item==='')){
            return true
        } 
        return false;
    }
    winIsPossible(currentField){
        
        let potentialFieldX = currentField.slice();
        let potentialField0 = currentField.slice();

        currentField.forEach((item, key) =>{
            if(item===''){
                potentialFieldX[key] = 'X';
                potentialField0[key] = '0';
            }
        })
        if(this.check(potentialFieldX) || this.check(potentialField0)){
            return true;
        }
        return false;
    }

    reset = () => {
        let emptyArr = this.state.field.fill('');
        this.setState({field: emptyArr, line: 'none', block: false, isDraw: false});
    }

    render() {
        const {field, line, block, isDraw} = this.state;
        return (
            <div className="game">
                <h1>Tic Tac Toe</h1>

                <div className="playing-field">
                    {
                        field.map((item, index) => 
                        <div key={index} onClick={(e) => this.squareClick(index)} className={`square ${(field[index] ==='X') && 'cross'} ${(field[index] ==='0') && 'circle'}`}></div>
                        )
                    }
                    <hr className={line}/>                
                </div>
                <div className="info-block">
                    <h3>Score</h3>
                    <p>{this.props.player1}: {this.state.player1Score}</p>
                    <p>{this.props.player2}: {this.state.player2Score}</p>
                    {isDraw && <h3>Draw!</h3>}
                    {block && <button onClick={this.reset}>Reset</button>}
                </div>
            </div>
        );
    }
}

export default PlayField;