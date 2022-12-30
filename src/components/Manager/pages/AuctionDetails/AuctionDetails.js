import React, { Fragment, useEffect, useState } from 'react';
import Navbar from '../../Navbar'
import { NavLink } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Axios from 'axios'
import { Redirect } from "react-router-dom"
import classes from "./AuctionDetails.module.css"

const AuctionDetails = () => {

    const [chits, setChits] = useState([]);
    // const id = window.localStorage.getItem('managerId');
    // const [auctionChit , setAuctionChit] = useState([]);
    let token = `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`;
    let id = JSON.parse(sessionStorage.getItem('userId'));
    // const id = window.localStorage.getItem('managerId');
    const [auctionChit, setAuctionChit] = useState(false);

    // function refresh() {
    //     window.location.reload(false);
    // }
  
    const [amount, setChitAmount] = useState(null);
    const [chittyId, setChittyId] = useState(null);




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
            let key2 = 0;
            for (const key in newItemList) {
                if (newItemList[key].status == "started") {
                    loadedChitties.push({
                        id: key2,
                        chitNumber: newItemList[key].chitNumber,
                        installment: newItemList[key].installment,
                        duration: newItemList[key].duration,
                        totalAmount: newItemList[key].totalAmount,
                        startDate: newItemList[key].startDate,
                    });
                    key2++;
                }
            }
            setChits(loadedChitties);
            // console.log("chits",chits);
        };
        fetchAuctionDetails();
        
    }, []);

    function submit(value) {
        console.log("chits",chits);
        const key = value;
        // console.log("key" + key)
        Axios.post(`http://localhost:8080/auction/add`, {
            chittyId: chits[key].chitNumber,
            userId: id,
            currentBid: chits[key].totalAmount * 0.05
        },
        {
            headers:{
              'Authorization':token 
            }})
       
            .then(() => {
                alert("Auction started");
                setAuctionChit(true);
                setChittyId(chits[key].chitNumber);
                setChitAmount(chits[key].totalAmount);
            })
        
    }

    return (
        <Fragment>
            <Navbar />
            <h3 className={classes.heading}>Auction Details</h3>
            <div className={classes.auctionDetails}>
            <DataTable
                scrollY
                maxHeight="200px"
                title=""
                columns={columns}
                data={chits}
            />
            </div>
            {auctionChit &&
                <Redirect to={{
                    pathname: '/manager/auction/auctionroom',
                    state: { userId: id, chittyId: chittyId, amount: amount }
                }} />
            }
        </Fragment>
    )
    
}

export default AuctionDetails;