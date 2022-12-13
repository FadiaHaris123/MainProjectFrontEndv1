import Navbar from '../../Navbar'
import DataTable from 'react-data-table-component';
import React, { Fragment, useEffect, useState } from 'react';
import Chit from '../../Chit';

const StartChit = (props) => {

    const [chits, setChits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    const columns = [
        {
            name: 'Chit Number',
            selector: 'chitNumber',
            sortable: true,
        },
        {
            name: 'Status',
            selector: 'status',
            sortable: true,
        }
    ];

    useEffect(() => {
        const fetchAssignedChits = async () => {
            const response = await fetch(
                'http://localhost:8080/api/managers/1002/chits'
                // 'http://localhost:8080/api/managers/' + id + '/chits'
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            const loadedChitties = [];
            const newItemList = [...responseData._embedded.chitty]

            for (const key in newItemList) {
                if (newItemList[key].status.includes("not")) {
                    loadedChitties.push({
                        id: key,
                        chitNumber: newItemList[key].chitNumber,
                        installment: newItemList[key].installment,
                        duration: newItemList[key].duration,
                        numberOfChittal: newItemList[key].numberOfChittal,
                        currentNumberOfChittal: newItemList[key].currentNumberOfChittal,
                        totalAmount: newItemList[key].totalAmount,
                        launchDate: newItemList[key].launchDate,
                        status: (newItemList[key].currentNumberOfChittal < newItemList[key].numberOfChittal) ? 'Not Ready to start' : 'Ready to start',
                        // start: setisReady(newItemList[key].currentNumberOfChittal === newItemList[key].numberOfChittal),
                    });
                }
            }
            setChits(loadedChitties);
            setIsLoading(false);
        };

        fetchAssignedChits().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);
    const conditionalRowStyles = [
        {
            when: row => row,
            style: row => ({
                color: row.status.includes('Not') ? 'red' : 'green',
            }),
        },
    ];
    return (
        <Fragment>
            <Navbar />
            <DataTable
                scrollY
                maxHeight="200px"
                title="Assigned Chits"
                columns={columns}
                data={chits}
                paginationTotalRows={5}
                paginationRowsPerPageOptions={[1, 5, 10, 15, 20, 50]}
                pagination
                expandableRows
                highlightOnHover
                conditionalRowStyles={conditionalRowStyles}
            />
        </Fragment>
    )
}
export default StartChit;