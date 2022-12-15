import React, { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal';
import './modal.css'
import { Formik, useFormikContext } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addproduct } from '../../Redux/Action/productaction.js';
import { FaTimesCircle } from 'react-icons/fa'
import { getAllCategories } from '../../Redux/Action/productaction.js'

const validationSchema = yup.object().shape({
  name: yup.string().required('Field Required'),
  purchasePrice: yup.number()
    .typeError('you must specify a number').required('Field Required'),
  salePrice: yup.number()
    .typeError('you must specify a number').required('Field Required'),
  category: yup.string().required('Field Required').required(),
  image: yup.string(),
  discount: yup.number().typeError('you must specify a number')

});
const Addproduct = ({ open, setProductOpen }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.categories);
  const { success } = useSelector(state => state.addProduct);
  const [image, setImage] = useState('');
  const [selectedCat, setSelectedCat] = useState(null);
  const fields = [
    { name: 'name', label: 'Product Name' },
    { name: 'purchasePrice', label: 'Purchase Price' },
    { name: 'salePrice', label: 'Sale Price' },
    { name: 'discount', label: 'Discount' },
  ]



  useEffect(() => {
    dispatch(getAllCategories());
  }, [])


  const handleImageChange = (e) => {
    const file = e.target.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.onerror = function (error) {

    };
    reader.readAsDataURL(e.target.files);
  }


  // handle submit
  const handleFormSubmit = (values, image) => {
    dispatch(addproduct(values, image));
  }


  // handle success
  if (success) {
    setProductOpen(false);
    alert('Product Added Successfully');
    dispatch({ type: 'RESET_SUCCESS', });
  }
  return (
    <Modal
      open={open}
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <div className='modal__container'>
        <div className='header'>
          <h1>Add Product</h1>
          <FaTimesCircle onClick={() => setProductOpen(false)} />
        </div>
        <Formik
          initialValues={{ name: '', purchasePrice: '', salePrice: '', }}
          onSubmit={(values) => {
            handleFormSubmit(values, image)
          }}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit
          }) => (
            <form action="" onSubmit={handleSubmit}>
              {fields.map(field => (
                <div className='appTextInput'>
                  <input
                    type="text"
                    value={values[field.name]}
                    onChange={handleChange}
                    name={field.name}
                    type="text"
                    placeholder={field.label} />
                  {(errors[field.name] && touched[field.name]) && <p className='error'>{errors[field.name]}</p>}
                </div>
              ))}
              <div className='appTextInput'>
                <select name="category" id="" onChange={handleChange}>
                  <option value={null}>Select Category</option>
                  {categories.map(category => (
                    <option value={category._id} >{category.name}</option>
                  ))}
                </select>
                {(errors.category && touched.category) && <p className='error'>{errors.category}</p>}
              </div>
              <div className='appTextInput'>
                <input
                  onChange={handleImageChange}
                  type="file" multiple />
                {/* {(errors[field.name] && touched[field.name]) && <p className='error'>{errors[field.name]}</p>} */}
              </div>
              <div >
                {image && <img src={image} alt="" srcset="" className='form__image' />}
              </div>
              <input type="submit" value="Submit" onClick={handleSubmit} />
            </form>
          )}
        </Formik>
      </div>
    </Modal >
  )
}

export default Addproduct