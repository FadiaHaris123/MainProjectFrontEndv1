import React, { Fragment, useEffect, useState } from 'react';
import Navbar from '../../Navbar'
import DataTable from 'react-data-table-component';
import Axios from 'axios'
import { Redirect } from "react-router-dom"

const AuctionDetails = () => {

    const [chits, setChits] = useState([]);
    const id = window.localStorage.getItem('managerId');
    const [auctionChit, setAuctionChit] = useState(false);

    function refresh() {
        window.location.reload(false);
    }

    const columns = ([
        {
            button: 'true'
        },
        {
            name: 'Chit Number',
            selector: 'chitNumber',
            sortable: true,
        },
        {
            name: 'Start Auction',
            selector: 'startAuction',
            cell: ({ id }) => (<button value={id}
                style={{ borderRadius: '10px', backgroundColor: '#103c61', color: '#fff' }}
                onClick={(e) => submit(e.target.value)}>Start</button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
        },
    ]);

    useEffect(() => {
        const fetchAuctionDetails = async () => {
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
            console.log(chits);
        };
        fetchAuctionDetails();
    }, []);

    function submit(value) {
        const key = value;
        Axios.post('http://localhost:8080/api/auction/add', {
            chittyId: chits[key].chitNumber,
            userId: id,
            currentBid: chits[key].installment,
        })
            .then(() => {
                alert("Auction started");
                setAuctionChit(true);
            })
    }

    return (
        <Fragment>
            <Navbar /> {refresh}
            <DataTable
                scrollY
                maxHeight="200px"
                title=""
                columns={columns}
                data={chits}
            />
            {auctionChit &&
                <Redirect to={{
                    pathname: '/manager/auction/auctionroom',
                    state: { userId: id, chittyId: chits[0].chitNumber, amount: chits[0].totalAmount }
                }} />
            }
        </Fragment>
    )
    
}

export default AuctionDetails;