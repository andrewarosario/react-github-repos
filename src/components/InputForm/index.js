import React from "react";
import { Input } from "./styles";

export default function InputForm(props) {
    
    return (
        <Input>
            <label htmlFor={props.name}>{props.label}</label>
            <input 
                id={props.name}
                type="text" 
                value={props.valueState}
                onChange={props.onChangeState}
            />
        </Input>
    );
};