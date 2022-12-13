import React, { Fragment, useEffect, useState } from 'react';
import Navbar from '../../Navbar'
import Axios from 'axios'
import DataTable from 'react-data-table-component';

const StartedChits = () => {

    const [chits, setChits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

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
                if (newItemList[key].status == "started") {
                    loadedChitties.push({
                        id: key,
                        chitNumber: newItemList[key].chitNumber,
                        installment: newItemList[key].installment,
                        duration: newItemList[key].duration,
                        totalAmount: newItemList[key].totalAmount,
                        startDate: limit(newItemList[key].startDate, 10),
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

    function limit(string = '', limit = 0) {
        return string.substring(0, limit)
    }
    const ExpandedComponent = ({ data }) => <pre>
        Installment : ₹{JSON.stringify(data.installment)} <br />
        Duration : {JSON.stringify(data.duration)} days<br />
        Started Date : {(limit(data.startDate, 10))} <br /> <br />
    </pre>;

    return (
        <Fragment>
            <Navbar />
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
        </Fragment>
    )
}
export default StartedChits;