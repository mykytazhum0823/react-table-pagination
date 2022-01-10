import React, { useState, useEffect } from "react";
import {Pagination, Form, Button} from "react-bootstrap";

const NewQuestionnaire = (props)=>{
    const {title} = props;
    const [data, setData] = useState([]);
    const [active, setActive] = useState(0);
    const [pageData, setPageData] = useState("");
    const [info, setInfo] = useState({});
    const [newTitle, setNewTitle] = useState('')

    const [pageNum, setPageNum] = useState(0);

    const labels = props.columns;
    let pageItems = [];
    const cnt = 20;
    const initInfo = ()=>{
        var state = {};
        for(let number = 0; number< labels.length; number++){
            state[labels[number].dataField] = '';
        }
        setInfo(state);
    };
    useEffect(()=>{
        console.log(title)
        setNewTitle(title)
    },[title]);
    const makePage = (num)=>{
        var page = [];
        setPageNum(num);
        for(let number = num * cnt; number< Math.min((num+1) *cnt, labels.length); number++){
            page.push(
                <Form.Group key={number} className="mb-3">
                    <Form.Label>{labels[number].dataField}</Form.Label>
                    <Form.Control type="text" value={info[labels[number].dataField]} onChange ={(e)=>{
                        var oldState = info;
                        oldState[labels[number].dataField] = e.target.value;
                        setInfo(oldState);
                    }}/>
                </Form.Group>
            );
        }
        if(num == Math.round(props.columns.length /cnt))
        {
            page.push(
                 <Button variant="primary" size="lg" key="saveinfo" onClick={()=>{saveInfo()}}>
                    SAVE
                </Button>
            );
        }
        setPageData(page);
    }

    const saveInfo = ()=>{
        alert(title);
        const response = fetch("http://localhost:3001/save", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            mode: "cors",
            body: JSON.stringify({title:title, info:{...info, title:`${title}`}})
          }).then(function(response) {
            response.json().then(function(data) {
              console.log(`Successful ${data}`);
            });
          });
    }

    const makePaginations = ()=>{
        for(let number = 0; number< props.columns.length /cnt ; number++)
        {
            pageItems.push(
                <Pagination.Item key={number} active={number === active}
                onClick={(e)=>{setActive(number); makePage(number);}}>
                    {number}
                </Pagination.Item>
            );
        }
        setData(pageItems);
    }
    useEffect(()=>{
        initInfo();
        makePage(0);
    }, []);
    useEffect(()=>{
        makePaginations();
    }, [active, title]);
    
    return(
        <>
            <div>{title}</div>
           {pageData}
            <div className="row justify-content-center">
                <Pagination>
                    { data }
                </Pagination>
            </div>
        </>
    );
}

export default NewQuestionnaire;