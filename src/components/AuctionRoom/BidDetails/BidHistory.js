import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import DataTable from 'react-data-table-component';

const BidHistory = (props) => {

 
  const columns = [
    {
      name: 'Chit Number',
      sortable: true,
    },
    {
      name: 'Name',
      sortable: true,
    },
    {
      name: 'Bid Amount(in ₹)',
      sortable: true,
    }];

 const rows = [
    {
      'id': 1,
      'name': 'Fadia Haris',
      'amount': '6500',
    },
    {
        'id': 1,
        'name': 'Fadia Haris',
        'amount': '6500',
    },
    {
        'id': 1,
        'name': 'Fadia Haris',
        'amount': '6500',
    },
    {
        'id': 1,
        'name': 'Fadia Haris',
        'amount': '6500',
    }, {
        'id': 1,
        'name': 'Fadia Haris',
        'amount': '6500',
    }, {
        'id': 1,
        'name': 'Fadia Haris',
        'amount': '6500',
    },
  ];

return (
  <DataTable
        scrollY
        maxHeight="200px"
        title=""
        columns={columns}
        data={rows}
        paginationTotalRows={5}
        paginationRowsPerPageOptions={[2,5,8,12,15,20,50]}
        pagination
        expandableRows 
        highlightOnHover
      />
    //     <MDBTable align='middle' scrollY maxHeight="150px">
    //   <MDBTableHead columns={data.columns} />
    //   <MDBTableBody rows={data.rows}/>
    // </MDBTable>
  );
};

export default BidHistory;