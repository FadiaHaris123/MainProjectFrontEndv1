import React, { Fragment, useEffect, useState } from 'react';
import Navbar from '../../Navbar'
import DataTable from 'react-data-table-component';
import classes from './StartedChits.module.css';

const StartedChits = () => {

    const [chits, setChits] = useState([]);
    const id = window.localStorage.getItem('managerId');
    const columns = ([
        {
            name: 'Chit Number',
            selector: 'chitNumber',
            sortable: true,
        },
        {
            name: 'Started Date',
            selector: 'startDate',
            sortable: true,
        },
    ]);

    useEffect(() => {
        const fetchStartedChits = async () => {
            const response = await fetch(
                'http://localhost:8080/api/managers/' + id + '/chits'
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            const loadedChitties = [];
            const newItemList = [...responseData._embedded.chitty]

            for (const key in newItemList) {
                if (newItemList[key].status == "started") {
                    loadedChitties.push({
                        id: key,
                        chitNumber: newItemList[key].chitNumber,
                        installment: newItemList[key].installment,
                        duration: newItemList[key].duration,
                        totalAmount: newItemList[key].totalAmount,
                        startDate: newItemList[key].startDate,
                    });
                }
            }
            setChits(loadedChitties);
        };
        fetchStartedChits();
    }, []);

    const ExpandedComponent = ({ data }) => <pre>
        Installment : ₹{JSON.stringify(data.installment)} <br />
        Duration : {JSON.stringify(data.duration)} months<br />
        Started Date : {data.startDate} <br /> <br />
    </pre>;

    return (
        <Fragment>
            <Navbar />
           <div className={classes.startedChitsTable}>
           <DataTable
                scrollY
                maxHeight="200px"
                title="Started Chits"
                columns={columns}
                data={chits}
                paginationTotalRows={5}
                paginationRowsPerPageOptions={[1, 5, 10, 15, 20, 50]}
                pagination
                expandableRows
                expandableRowsComponent={ExpandedComponent}
                expandOnRowClicked
                highlightOnHover
            />
           </div>
        </Fragment>
    )
}
export default StartedChits;