import { Autocomplete, TextField } from '@mui/material';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import * as yup from "yup";
import client from '../../API/client.js';
import { addExpense } from '../../Redux/Action/expenseaction.js';
import './form.css'

const schema = yup.object().shape({
  supplier: yup.string().required("Field is required"),
  discount: yup.number('Enter Number Only'),
  subtotal: yup.number('Enter Number Only').required("Field is required"),
  total: yup.number('Enter Number Only').required("Field is required"),
});

const Form = ({ selectedProducts, setselectedProducts }) => {
  const [supplier, setSupplier] = useState([]);
  const [labelSupplier, setlabelSupplier] = useState([]);
  const dispatch = useDispatch();


  // calculating totals
  const subtotal = selectedProducts?.reduce((acc, item) => acc + item.purchasePrice * parseInt(item.quantity), 0);
  let total = subtotal
  const [fieldValues, setFieldValues] = React.useState({
    supplier: '',
    localBrand: '',
    discount: 0,
    transportCost: 0,
    subtotal,
    total,
  });
  total = total - fieldValues.discount;


  useEffect(() => {
    getSuppliers()
  }, [])
  const getSuppliers = () => {
    client.get("/supplier").then((res) => {
      setSupplier(res.data.suppliers)
    });
  };


  const labels = []
  supplier?.forEach((sup) => {
    sup.label = sup.supplierName
    labels.push(sup)
  })

  console.log(labels, 'label')



  // handle qunatity
  const handleQuantityChange = (e, item) => {
    const newProducts = selectedProducts.map(product => {
      if (product._id === item._id) {
        product.quantity = e.target.value
      }
      return product
    })
    setselectedProducts(newProducts)
  }



  const handleChange = (e) => {
    setFieldValues({ ...fieldValues, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedProducts.length <= 0) {
      alert('Please select products')
      return
    }
    for (const property in fieldValues) {
      if (fieldValues[property] === '') {
        alert(`Please Fill The Field ${property}`)
        return
      }
    }

    const expenseItems = []
    selectedProducts?.forEach(item => {
      expenseItems.push({
        product: item._id,
        quantity: item.quantity,
      })
    });

    const expense = {
      supplier: fieldValues.supplier,
      discount: fieldValues.discount,
      transportCost: fieldValues.transportCost,
      localBrand: fieldValues.localBrand,
      subtotal,
      totalAmount: total,
      recivedItems: expenseItems
    }
    console.log(expense, 'expense')
    dispatch(addExpense(expense))
  }

  const handleChangePrice = (e, item) => {
    console.log(item, 'item')
    const newProducts = selectedProducts.map(product => {
      if (product._id === item._id) {
        product.purchasePrice = e.target.value
      }
      return product
    })
    setselectedProducts(newProducts)
  }
  return (

    <>
      <h2>Purchase</h2>
      <div className='purchase__product-section purchase-form_header'>
        <p>Name</p>
        <p>Quantity</p>
        <p>Unit Price</p>
        <p>Total Price</p>
        <p>Lot</p>
      </div>
      {selectedProducts?.map((item, index) => (
        <div className='purchase__product-section' key={index}>
          <p>{item.name}</p>
          <input type="number" defaultValue={item.quantity} onChange={(e) => handleQuantityChange(e, item)} />
          <input type="number" defaultValue={item.purchasePrice} onChange={(e) => handleChangePrice(e, item)} />
          <p>{item.purchasePrice * item.quantity}</p>
          <p>{item.lotNumber}</p>
        </div>
      ))
      }

      <form action="" onSubmit={handleSubmit} className='purchaseForm'>
        <div className="form-group">
          <label htmlFor="supplier">Supplier</label>
          <Autocomplete
            onChange={(e, value) => setFieldValues({ ...fieldValues, supplier: value._id })}
            disablePortal
            id="combo-box-demo"
            options={labels}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Supplier" />}
          />

        </div>
        <div className="form-group">
          <label htmlFor="totalAmount">Local Brand</label>
          <input
            type="text"
            name="localBrand"
            id="localBrand"
            className="form-control"
            placeholder="Local Brand"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="totalAmount">Subtotal</label>
          <input
            disabled
            type="text"
            name="subtotal"
            id="totalAmount"
            className="form-control"
            placeholder="Total Amount"
            onChange={handleChange}
            value={subtotal}
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="discount">Discount</label>
          <input
            type="text"
            name="discount"
            id="discount"
            className="form-control"
            placeholder="Discount"
            onChange={handleChange}
          /> */}

        {/* </div> */}

        <div className="form-group">
          <label htmlFor="totalAmount">Total</label>
          <input
            disabled
            type="text"
            name="total"
            id="totalAmount"
            className="form-control"
            placeholder="Total Amount"
            value={total}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="totalAmount">Transport Cost</label>
          <input
            // disabled
            type="number"
            name="transportCost"
            id="transportCost"
            className="form-control"
            placeholder="Transport Cost"
            // value={total}
            onChange={handleChange}
          />
        </div>
        <input type="submit" value="Submit" onClick={handleSubmit} />

      </form>
    </>
  )
}

export default Form