import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar.js';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getSales } from '../../Redux/Action/saleaction.js';
import { Link } from 'react-router-dom';
import { BiPrinter } from 'react-icons/bi';
import client from '../../API/client.js';


const AllSales = () => {
  const [sales, setSales] = useState([])
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data } = await client.post(`/sale/all`);
    setSales(data.sale);
  }



  const flippedSales = sales?.reverse();
  console.log(flippedSales, 'sales')
  const row = []
  flippedSales?.forEach(item => {
    row.push({
      id: item._id,
      name: item.name,
      paymentMethod: item.paymentMethod,
      total: item.priceBreakdown.total,
      subtotal: item.priceBreakdown.subtotal,
      discount: item.priceBreakdown.discount,
      tax: item.priceBreakdown?.tax,
      saleDate: item.saleDate,
      customerType: item.customerType,
      customerName: item.customerName,
      address: item.address,
      phone: item.phone,
      lotNumber: item.lotNumber,
      typeOfSack: item.typeOfSack,
      localBrand: item.localBrand,
    })
  })

  const columns = [
    // { field: 'id', headerName: 'Sale Id', flex: 1 },
    {
      field: 'name',
      headerName: 'Customer Name',
      flex: 1,
    },
    {
      field: 'paymentMethod',
      headerName: 'Payment Method',
      flex: 1,
    },

    {
      field: 'total',
      headerName: 'Total Price',
      flex: 1,
    },
    {
      field: 'saleDate',
      headerName: 'Sale Date',
      flex: 1,
    },
    {
      field: 'localBrand',
      headerName: 'Local Brand',
      flex: 1,
    },
    {
      field: 'lotNumber',
      headerName: 'Lot Number',
      flex: 1,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      flex: 1,
    },

    {
      field: 'invoice',
      headerName: 'Invoice',
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="actionOfOrders">
            <Link to={`/sale/invoice/${params.getValue(params.id, 'id')}`}>
              <BiPrinter size={20} />
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className='separator'>
      <div>
        <Sidebar />
      </div>
      <div className='smallPadding'>
        <div className='section__wrapper'>
          <h1>All Sales</h1>
          <div className='section__container' style={{ height: "85vh" }}>
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              disableSelectionOnClick
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllSales