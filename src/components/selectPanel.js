import React, { useState, useEffect } from "react";
import {Tabs, Tab} from "react-bootstrap";
import ListTable from "./listTable";
import NewQuestionnaire from "./newQuestionnaire";

const SelectedPanel = (props)=>{
    const [columns, setColumns] = useState([]);

    const getColumnsData = ()=>{
        try{
            fetch('../fields.txt')
            .then((r) => r.text())
            .then(text  => {
                var lines = text.split('\n');
                var cols = [];
                for(var line = 0; line < lines.length; line++){
                    if(lines[line].trim() === '')
                        continue;
                var header = lines[line].trim();
                var length = 20;
                var trimmedString = header.length > length ? 
                                    header.substring(0, length - 3) + "..." : 
                                    header;
                    cols.push({dataField:header, text:trimmedString});
                }
                cols.push({dataField:'Date', text:'Date'});
                cols.push({dataField:'Uploaded', text:'Uploaded'})
                setColumns(cols);
            })  
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getColumnsData();
    }, []);

    const changeTitle = (val)=>{
        props.changeTitle(val);
    }

    return(
        <Tabs
        defaultActiveKey="list"
        id="noanim-tab-example"
        className="mb-3"
        onSelect={(eKey, e)=>{
            eKey == "new"?props.isChangable(true):props.isChangable(false);}}
        >
            <Tab eventKey="list" title="List">
                {columns.length > 0? 
                    <ListTable columns={columns} changeTitle = {changeTitle}/> : <></>}
            </Tab>
            <Tab eventKey="new" title="New" >
                {columns.length > 0? 
                    <NewQuestionnaire columns={columns} title = {props.title}/> : <></>}
            </Tab>
            <Tab eventKey="edit" title="Edit" disabled/>
            <Tab eventKey="blank1" title="" disabled/>
            <Tab eventKey="blank2" title="" disabled/>
            
            <Tab eventKey="help" title="Help" disabled/>
        </Tabs>
   );
}
 

export default SelectedPanel;