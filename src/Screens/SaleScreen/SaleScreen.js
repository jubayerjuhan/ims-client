import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Form from '../../Components/PurchaseForm/Form.js'
import SaleForm from '../../Components/SaleForm/SaleForm.js'
import Sidebar from '../../Components/Sidebar/Sidebar.js'

import { getAllCategories, getallProducts, getProductsWithCategory } from '../../Redux/Action/productaction.js'
import { DataGrid } from '@mui/x-data-grid';


const SaleScreen = () => {
  const dispatch = useDispatch();
  const { success } = useSelector(state => state.addSale)
  const { categories } = useSelector(state => state.categories);
  const { products } = useSelector(state => state.products);
  const [selectedCategory, setSelectedCategory] = useState(categories ? categories[0] : '')
  const [selectedProducts, setselectedProducts] = useState([])
  const [printBtn, setPrintBtn] = useState(false)


  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getallProducts());
  }, [])

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

  const row = []
  products?.forEach((item, index) => {
    row.push({
      id: item._id,
      name: item.name,
      no: index + 1,
      item: item,
    })
  })
  // show products after category click
  let productsToShow = []
  if (products) {
    productsToShow = []
    products?.forEach((item) => {
      if (item.category._id === selectedCategory._id) {
        productsToShow.push(item)
      }
    })
  }

  console.log(productsToShow, 'sssp')

  // handle click of product
  const handleProductClick = (product) => {
    if (selectedProducts.find(item => item._id === product._id)) {
      setselectedProducts(selectedProducts.filter(item => item._id !== product._id))
    } else {
      setselectedProducts([...selectedProducts, { ...product, quantity: 1 }])
    }
  }

  // handle sale success
  if (success) {
    alert('Sale Success')
    setPrintBtn(true)
    dispatch({ type: 'RESET_SUCCESS' })
  }

  return (
    <div className='separator'>
      <div>
        <Sidebar />
      </div>
      <div className='purchase__Wrapper'>
        <div className='smallPadding'>
          {/* <div className='card__container'>
            <h1>Categories</h1>
            <div className='cards_wrapper'>
              {categories?.map(item => (
                <div className='product_card_wrapper' key={item.name} onClick={() => setSelectedCategory(item)}>
                  <img src={item.image} alt="" />
                  <h3>{item.name}</h3>
                </div>
              ))}
            </div>
          </div> */}

          {/* products */}
          {/* <div className='card__container'>
            <h1>Products</h1>
            <div className='cards_wrapper'>
              {productsToShow.map(item => (
                <div className='product_card_wrapper' key={item.name} onClick={() => handleProductClick(item)}>
                  <img src={item.image} alt="" />
                  <h3>{item.name}</h3>
                </div>
              ))}
            </div>
          </div> */}
          <div className='productList'>
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

        </div>
        <div className='smallPadding purchase_wrapper'>
          <SaleForm selectedProducts={selectedProducts} setselectedProducts={setselectedProducts} printBtn={printBtn} />
        </div>
      </div>
    </div>
  )
}

export default SaleScreen