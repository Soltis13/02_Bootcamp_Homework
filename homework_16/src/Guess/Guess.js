import React from 'react';

const GuessMessage = (props) => {
    let GuessMessage = "You guessed incorrectly!!";

    if (props.input){
        GuessMessage = 'You guessed correctly!';
    }
    
    return (
        <div>
            <p>{GuessMessage}</p>      
        </div>        
    );
};

export default GuessMessage;