import React from "react";

export default function InputForm(props) {
    
    return (
        <div>
            <label htmlFor={props.name}>{props.label}</label>
            <input 
                id={props.name}
                type="text" 
                value={props.valueState}
                onChange={props.onChangeState}
            />
        </div>
    );
};