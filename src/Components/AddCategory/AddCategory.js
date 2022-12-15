import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
// import './modal.css'
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../Redux/Action/productaction.js';
import { FaTimesCircle } from 'react-icons/fa'

const validationSchema = yup.object().shape({
  name: yup.string().required('Field Required'),
  image: yup.string(),


});
const AddCategory = ({ open, setcategoryOpen }) => {
  const dispatch = useDispatch();
  const { success } = useSelector(state => state.addCategory);
  const fields = [
    { name: 'name', label: 'Category Name' },
  ]

  const [image, setImage] = useState('');

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
    dispatch(addCategory(values, image));
  }


  // handle success
  if (success) {
    setcategoryOpen(false);
    alert('Category Added Successfully');
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
          <h1>Add Category</h1>
          <FaTimesCircle onClick={() => setcategoryOpen(false)} />
        </div>
        <Formik
          initialValues={{ name: '', }}
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
                <div className='appTextInput' key={field.name}>
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

export default AddCategory