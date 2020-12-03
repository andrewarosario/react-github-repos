import React from "react";

export default function SelectForm(props) {
    
    return (
        <select value={props.valueState} onChange={props.onChangeState}>
            {props.items.map(item => (
                <option key={item.value} value={item.value}>{item.name}</option>
            ))}
      </select>
    );
};