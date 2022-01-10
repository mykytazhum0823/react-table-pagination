import React, { useState, useEffect } from "react";
import {ToggleButton} from "react-bootstrap";

const PartButtons = (props)=>{
    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: 'PART A', value: '1' },
        { name: 'PART B', value: '2' },
        { name: 'PART C', value: '3' },
        { name: 'OTHER', value: '4' },
    ];
    return(
        <div className="row">
            {radios.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant="outline-secondary"
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => {setRadioValue(e.currentTarget.value);}}
                    style={{marginRight:'1em'}}
                >
                    {radio.name}
                </ToggleButton>
               
            ))}
        </div>
    );
}

export default PartButtons;