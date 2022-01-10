import React, { useState, useEffect } from "react";
import "./App.css";
import * as ReactBootStrap from "react-bootstrap";
import Axios from "axios";
import BootStrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Title  from "./components/title";
import PartButtons from "./components/partButtons";
import ListTable from "./components/listTable";
import SelectedPanel from "./components/selectPanel";

const App = () => {
    const [title, setTitle] = useState("Questionnaires");
    const [readOnly, setReadOnly] = useState(true);
    const isChangable = (val)=>{
      setReadOnly(!val);
    }
    const changeTitle = (val)=>{
      setTitle(val);
    }

    return (
      <div className="App">
        <Title title={title} readOnly={readOnly} changeTitle = {changeTitle}/>
        <PartButtons/>
        <SelectedPanel isChangable={isChangable} title={title} changeTitle = {changeTitle}/>
      </div>
    );
};

export default App;
