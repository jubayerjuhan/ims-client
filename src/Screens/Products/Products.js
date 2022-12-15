import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddCategory from '../../Components/AddCategory/AddCategory.js'
import Addproduct from '../../Components/AddProduct/Addproduct.js'
import Showcards from '../../Components/ShowCards/Showcards.js'
import Sidebar from '../../Components/Sidebar/Sidebar.js'
import { FaTimesCircle } from 'react-icons/fa'
import { getallProducts, getAllCategories, deleteProduct } from '../../Redux/Action/productaction.js'
import './products.css'
import { Button } from '@mui/material'
import ProductList from '../../Components/ProductList/ProductList.jsx'

const Products = () => {
  const [list, setList] = useState(false)
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.products);
  const { success: productDeleted, error } = useSelector(state => state.deleteElement);
  const { categories } = useSelector(state => state.categories);
  const { success: catSuccess } = useSelector(state => state.addCategory);
  const { success } = useSelector(state => state.addProduct);

  const [productOpen, setProductOpen] = useState(false);
  const [categoryOpen, setcategoryOpen] = useState(false);

  // useEffect On load
  useEffect(() => {
    dispatch(getallProducts());
    dispatch(getAllCategories());
  }, [dispatch, success, catSuccess, productDeleted])


  const handleDeleteProduct = (item) => {
    const sure = window.confirm('Are you sure you want to delete this product?')
    if (sure) {
      dispatch(deleteProduct(item._id))
    }
  }

  // handle success
  if (productDeleted) {
    alert('Product Deleted Successfully')
    dispatch({ type: "RESET_SUCCESS" })
  }

  // handle error
  if (error) {
    alert('Something went wrong')
    dispatch({ type: "CLEAR_ERROR" })
  }
  return (
    <div className='separator'>
      <ProductList open={list} setList={setList} />
      <Addproduct open={productOpen} setProductOpen={setProductOpen} />
      <AddCategory open={categoryOpen} setcategoryOpen={setcategoryOpen} />
      <div>
        <Sidebar />
      </div>
      <div className='smallPadding'>
        <div className='card__container'>
          <h1>Categories</h1>
          <div className='cards_wrapper'>
            <div className='product_card_wrapper' onClick={() => setcategoryOpen(true)}>
              <img src="https://media.istockphoto.com/vectors/black-plus-sign-positive-symbol-vector-id688550958?k=20&m=688550958&s=612x612&w=0&h=wvzUqT3u3feYygOXg3GB9pYBbqIsyu_xpvfTX-6HOd0=" alt="" />
              <h3>Add Category</h3>
            </div>
            {categories?.map(item => (
              <div className='product_card_wrapper'>
                <img src={item.image} alt="" />
                <h3>{item.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* products */}
        <div className='card__container'>
          <div style={{ display: "flex", justifyContent: 'space-between' }}>
            <h1>Products</h1>
            <Button onClick={() => setList(true)} varient='outlined' color='primary'>Product List</Button>
          </div>
          <div className='cards_wrapper'>
            <div className='product_card_wrapper' onClick={() => setProductOpen(true)}>
              <img src="https://media.istockphoto.com/vectors/black-plus-sign-positive-symbol-vector-id688550958?k=20&m=688550958&s=612x612&w=0&h=wvzUqT3u3feYygOXg3GB9pYBbqIsyu_xpvfTX-6HOd0=" alt="" />
              <h3>Add Products</h3>
            </div>
            {products?.map(item => (
              <div className='product_card_wrapper'>
                <div className='pc__imageWrapper'>
                  <img src={item.image ? item.image : ''} alt="" />
                  <FaTimesCircle onClick={() => handleDeleteProduct(item)} />
                </div>
                <h3>{item.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  )
}

export default Products