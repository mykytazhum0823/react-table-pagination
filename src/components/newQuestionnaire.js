import React, { useState, useEffect } from "react";
import {Pagination, Form, Button, Col, Row} from "react-bootstrap";

const NewQuestionnaire = (props)=>{
    const {title, columns} = props;
    const [active, setActive] = useState(0);
    const [info, setInfo] = useState({});
    const [pageNum, setPageNum] = useState(0);
    const cnt = 20;
    const queryCnt = columns.length - 2;

    const initInfo = ()=>{
        var temp = {};
        for(let number = 0; number< queryCnt; number++){
            temp[columns[number].dataField] = '';
        }
        setInfo(temp);
    };
    const range = (start, end) => {
        return Array.apply(0, Array(end - 1))
          .map((element, index) => index + start);
    }
    const saveInfo = ()=>{
        var date = new Date().toLocaleString();
        var saveName = new Date().toLocaleDateString().replace(/[\/]/g, '');
        const response = fetch("http://localhost:3001/save", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            mode: "cors",
            body: JSON.stringify({filename:`${title}-${saveName}`, info:{...info, title:`${title}`, Date:`${date}`}})
          }).then(function(response) {
            response.json().then(function(data) {
              console.log(`Successful ${data}`);
            });
          });
    }
    
    useEffect(()=>{
        initInfo();
    }, []);
    
    return(
        <>
           {columns.slice(pageNum * cnt, Math.min((pageNum + 1) * cnt)).map((item, index) => (
               <Form.Group as={Row} key={pageNum * cnt + index} className="mb-4">
                   {item.dataField.length >30? 
                        <>
                            <Form.Label className="label-sm">{item.dataField}</Form.Label>
                            <Form.Control type="text" value={info[item.dataField]} onChange ={(e)=>{
                                setInfo({...info, [item.dataField]:e.target.value});
                            }}/>
                        </>  
                        :<>
                            <Form.Label column sm="3">
                                {item.dataField}
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" value={info[item.dataField]} onChange ={(e)=>{
                                    setInfo({...info, [item.dataField]:e.target.value});
                                }}/>
                            </Col>   
                        </>             
                    }
                   
                </Form.Group>
           ))
           }
           {pageNum === Math.round(queryCnt/cnt) &&
               <Button variant="primary" size="lg" key="saveinfo" onClick={()=>{saveInfo()}}>
                   SAVE
               </Button>
           }
            <div className="row justify-content-center">
                <Pagination>
                    {range(0, Math.ceil(queryCnt/cnt)+1).map((item, index) => (
                        <Pagination.Item key={index} active={index === active}
                        onClick={(e)=>{setActive(index); setPageNum(index);}}>
                            {index}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>
        </>
    );
}

export default NewQuestionnaire;