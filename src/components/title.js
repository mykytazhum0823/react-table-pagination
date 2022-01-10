import React, { useState, useEffect } from "react";
import {InputGroup, FormControl, Button} from "react-bootstrap";
import { GiPencil } from "react-icons/gi";
import "../App.css";

const Title = (props)=>{

    const titleStyle = {
        fontSize:"30px",
        fontWeight:"bold"
    };
    return(
        <div className="row justify-content-center">
             <div className="col-6">
                <InputGroup className="lg">
                    <FormControl
                    aria-label="Example text with button addon"
                    aria-describedby="button-title"
                    readOnly={props.readOnly!==undefined?props.readOnly:true}
                    value={props.title}
                    className="text-center"
                    style={titleStyle}
                    onChange={(e)=>{ props.changeTitle(e.target.value);}}
                    />
                    {/* <Button variant="outline-secondary" id="button-title">
                        <GiPencil></GiPencil>
                    </Button> */}
                </InputGroup>
            </div>
        </div>
    );
}
export default Title;