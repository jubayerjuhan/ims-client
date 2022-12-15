import React, { useEffect } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar.js'
import { DataGrid } from '@mui/x-data-grid';
import './expense.css'
import { useDispatch, useSelector } from 'react-redux';
import { getExpenses } from '../../Redux/Action/expenseaction.js';

const Expense = () => {
  const { expense } = useSelector(state => state.expense);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getExpenses());
  }, [])

  const row = []

  expense?.reverse()?.forEach(item => {
    row.push({
      id: item._id,
      supplier: item?.supplier?.supplierName,
      totalAmount: item.totalAmount,
      discount: item.discount,
      total: item.total,
      localBrand: item.localBrand,
      transportCost: item.transportCost,
    })
  })

  console.log(expense)
  const columns = [
    // { field: 'id', headerName: 'Expense ID', width: 0 },
    {
      field: 'supplier',
      headerName: 'Supplier',
      flex: 1,
    },
    {
      field: 'localBrand',
      headerName: 'Local Brand',
      flex: 1,
    },
    {
      field: 'totalAmount',
      headerName: 'Total Amount',
      flex: 1,
    },
    {
      field: 'discount',
      headerName: 'Discount Received',
      flex: 1,
    },
    {
      field: 'transportCost',
      headerName: 'Transport Cost',
      flex: 1,
    },
  ];


  return (
    <div className='separator'>
      <div>
        <Sidebar />
      </div>
      <div className='smallPadding'>
        <div className='section__wrapper'>
          <h1>All Expenses</h1>
          <div className='section__container' >
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

export default Expense