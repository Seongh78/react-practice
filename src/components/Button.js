import React from 'react';

const Button = ({text, color, size}) => {
    return (
        <button
            type="button" 
            className="btn btn-primary btn-md btn-block"
        >
            {text} 
        </button>
    )
}


export default Button;