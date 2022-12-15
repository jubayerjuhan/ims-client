import Form from '../../Components/PurchaseForm/Form.js'
import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar.js'
import './purchase.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories, getallProducts } from '../../Redux/Action/productaction.js'
import client from '../../API/client.js'
import { DataGrid } from '@mui/x-data-grid'
import Addproduct from '../../Components/AddProduct/Addproduct.js'
import { Button } from '@mui/material'

const Purchase = () => {
  const [suppliers, setSuppliers] = useState([])
  const [productOpen, setProductOpen] = useState(false)
  const dispatch = useDispatch();
  const { success } = useSelector(state => state.addExpense)

  const { categories } = useSelector(state => state.categories);
  const { products } = useSelector(state => state.products);
  const [selectedCategory, setSelectedCategory] = useState(categories ? categories[0] : '')
  const [selectedProducts, setselectedProducts] = useState([])


  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getallProducts());
  }, [])


  console.log(suppliers, 'sssp')
  // handle products to show
  let productsToShow = []
  if (products) {
    productsToShow = []
    products?.forEach(item => {
      if (item.category._id === selectedCategory._id) {
        productsToShow.push(item)
      }
    })
  }

  // handle click of product
  const handleProductClick = (product) => {
    if (selectedProducts.find(item => item._id === product._id)) {
      setselectedProducts(selectedProducts.filter(item => item._id !== product._id))
    } else {
      setselectedProducts([...selectedProducts, { ...product, quantity: 1 }])
    }
  }

  // success handle
  if (success) {
    alert('Expense Success')
    dispatch({ type: 'RESET_SUCCESS' })
  }

  // colums
  const columns = [
    // { field: 'id', headerName: 'Sale Id', flex: 1 },
    {
      field: 'no',
      headerName: 'Serial No',
      width: 100,
    },
    {
      field: 'name',
      headerName: 'Product Name',
      flex: 1,
    },
    {
      field: 'action',
      headerName: 'Action',
      renderCell: (params) => {
        return (

          <p style={{ cursor: 'pointer' }} onClick={() => handleProductClick(params.getValue(params.id, "item"))}>Select</p>
        );
      },
    }
  ]

  // rows
  const row = []
  products?.forEach((item, index) => {
    row.push({
      id: item._id,
      name: item.name,
      no: index + 1,
      item: item,
    })
  })
  return (
    <div className='separator'>
      <div>
        <Sidebar />
      </div>

      <div className='purchase__Wrapper'>
        <Addproduct open={productOpen} setProductOpen={setProductOpen} />
        <div className='smallPadding'>
          {/* products */}
          <div className='productList'>
            <div className='addProductButton'>
              <Button variant="outlined" sx={{ marginBottom: "10px" }}
                onClick={() => setProductOpen(true)}>Add Product</Button>
            </div>
            <DataGrid
              sx={{
                minHeight: '100vh',
                borderRadius: '5px',
                overflow: 'hidden',
              }}
              rows={row}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              disableSelectionOnClick
            />
          </div>
          {/*  */}
        </div>
        <div className='smallPadding purchase_wrapper'>

          <Form selectedProducts={selectedProducts} setselectedProducts={setselectedProducts} />
        </div>
      </div>
    </div>
  )
}

export default Purchase