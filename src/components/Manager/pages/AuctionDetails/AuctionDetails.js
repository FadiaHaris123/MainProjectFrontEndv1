import React, { Fragment, useEffect, useState } from 'react';
import Navbar from '../../Navbar'
import DataTable from 'react-data-table-component';
import Axios from 'axios'
import { useHistory } from "react-router-dom"
import AuctionRoom from '../AuctionRoom/AuctionRoom';

const AuctionDetails = () => {

    const [chits, setChits] = useState([]);
    // const id = window.localStorage.getItem('managerId');
    const [auctionChit , setAuctionChit] = useState([]);
    const history = useHistory();
    let token = `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`;
    let id = JSON.parse(sessionStorage.getItem('userId'));

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
            cell: ({ id }) =>  (<button value={id}
                style={{ borderRadius: '10px', backgroundColor: '#103c61', color: '#fff' }}
                onClick={(e) => submit(e.target.value)}>Start</button>),
            ignoreRowClick: true,
            allowOverflow: true,
        },
    ]);

    useEffect(() => {
        const fetchAuctionDetails = async () => {
            const response = await fetch(
                `http://localhost:8080/managers/${id}/chits`,{
                    headers:{
                      'Authorization':token
                      
                    }}
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
        Axios.post('http://localhost:8080/auction/add',
        {
            headers:{
              'Authorization':token
              
            }}, {
            chittyId: chits[key].chitNumber,
            userId: id,
            currentBid: chits[key].installment,
        })
            .then(() => {
                alert("Auction started")
            })
            return (history.push("/manager/auction/auctionroom"));

    }

    return (
        <Fragment>
            <Navbar />
            <DataTable
                scrollY
                maxHeight="200px"
                title=""
                columns={columns}
                data={chits}
                paginationTotalRows={5}
                paginationRowsPerPageOptions={[1, 5, 10, 15, 20, 50]}
                pagination
                highlightOnHover
            />
            {/* <AuctionRoom userId={id}/> */}
        </Fragment>
    )
}

export default AuctionDetails;