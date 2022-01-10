import React, { useState, useEffect } from "react";
import * as ReactBootStrap from "react-bootstrap";
import BootStrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";


const ListTable = (props)=>{
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [columns, setColumns] = useState(props.columns);

    const getTableData = () => {
        try {

            function importAll(r) {
                return r.keys().map(r);
            }
            const questions = importAll(require.context('../questionnaires/', false, /\.(json)$/));
            setTableData(questions);
            console.log(questions);
            setLoading(true);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTableData();
    }, []);

    function onRowSelect(row, isSelected, e) {
        props.changeTitle(row["title"]);
    }
    const selectRowProp = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: onRowSelect,
        hideSelectColumn: true,
    };

    return(
        <div>
        {loading && columns.length > 0? (
            <BootStrapTable
                scrollX
                keyField="Email"
                data={tableData}
                columns={columns}
                pagination={paginationFactory()}
                responsive="sm"
                selectRow={ selectRowProp }
            />
        ) : (
            <ReactBootStrap.Spinner animation="border" />
        )}
        </div>
    );
}

export default ListTable;