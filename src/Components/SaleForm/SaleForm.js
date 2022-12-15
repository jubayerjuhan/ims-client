import { Formik } from 'formik';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addSale } from '../../Redux/Action/saleaction.js';
import { FaRegTimesCircle } from 'react-icons/fa'



const SaleForm = ({ selectedProducts, setselectedProducts, printBtn }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sale } = useSelector(state => state.recentSale);
  // calculation of total amount
  const subtotal = selectedProducts?.reduce((acc, item) => acc + item.salePrice * parseInt(item.quantity), 0);
  const purchasePrice = selectedProducts?.reduce((acc, item) => acc + item.purchasePrice * parseInt(item.quantity), 0);
  const tax = subtotal * 0;
  let total = subtotal + tax;
  const [startDate, setStartDate] = React.useState(new Date());

  const [fieldValues, setFieldValues] = React.useState({
    name: '',
    discount: 0,
    paymentMethod: '',
    lotNumber: '',
    typeOfSack: '',
    localBrand: '',
    address: '',
    phone: '',
    soldBy: "",
    tax,
    total,
    saleDate: startDate,
    subtotal,
    customerType: '',
    purchasePrice,
  });
  total = total - fieldValues.discount;

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

  // handle change of form field
  const handleChange = (e) => {
    setFieldValues({ ...fieldValues, [e.target.name]: e.target.value });
  }


  // handle submit
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
    const saleItems = []
    selectedProducts?.forEach(item => {
      saleItems.push({
        product: item._id,
        productName: item.name,
        productPrice: item.salePrice,
        quantity: item.quantity,
      })
    });

    const sale = {
      customerType: fieldValues.customerType,
      name: fieldValues.name,
      paymentMethod: fieldValues.paymentMethod,
      saleItems,
      saleDate: fieldValues.saleDate,
      soldBy: fieldValues.soldBy,
      lotNumber: fieldValues.lotNumber,
      typeOfSack: fieldValues.typeOfSack,
      localBrand: fieldValues.localBrand,
      address: fieldValues.address,
      phone: fieldValues.phone,
      priceBreakdown: {
        subtotal,
        tax,
        discount: fieldValues.discount,
        total,
      },
      purchasePrice,
    }
    dispatch(addSale(sale))
  }


  const deleteProductFromList = (item) => {
    const newProducts = selectedProducts.filter(product => product._id !== item._id)
    setselectedProducts(newProducts)
  }

  const handleChangeSalePrice = (e, item) => {
    const newProducts = selectedProducts.map(product => {
      if (product._id === item._id) {
        product.salePrice = e.target.value
      }
      return product
    })
    setselectedProducts(newProducts)
  }
  return (
    <>
      <h2>Sale</h2>
      {sale && <button className='invBtn' >
        <Link to={`/sale/invoice/${sale?._id}`}>
          Recent Sale Invoice
        </Link>
      </button>}
      <div className='purchase__product-section purchase-form_header'>
        <p>Name</p>
        <p>Quantity</p>
        <p>Unit Price</p>
        <p>Total Price</p>
      </div>
      {selectedProducts?.map((item, index) => (
        <div className='purchase__product-section' key={index}>
          <p>{item.name}</p>
          <input type="number" defaultValue={item.quantity} onChange={(e) => handleQuantityChange(e, item)} />
          <input type="number" defaultValue={item.salePrice} onChange={(e) => handleChangeSalePrice(e, item)} />
          {/* <p>{item.salePrice}</p> */}
          <p>{item.salePrice * item.quantity}</p>
          <FaRegTimesCircle onClick={() => deleteProductFromList(item)} />
        </div>
      ))

      }

      <form action="" onSubmit={handleSubmit} className='purchaseForm'>
        <div className="form-group">
          <label htmlFor="totalAmount">Customer Type</label>
          <select name="customerType" id="" onChange={handleChange}>
            <option value={null}>Select Customer Type</option>
            <option value='Walk In'>Walk In</option>
            <option value="Reference">Reference</option>
            <option value="Wholesale">Wholesale</option>
            <option value="Retailer">Retailer</option>
            <option value="Corporate">Corporate</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Customer Name"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Sold By</label>
          <input
            type="text"
            name="soldBy"
            className="form-control"
            placeholder="Sold By"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Customer Phone</label>
          <input
            type="number"
            name="phone"
            className="form-control"
            placeholder="Customer Phone"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Customer Address</label>
          <input
            type="text"
            name="address"
            className="form-control"
            placeholder="Customer Address"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Local Brand</label>
          <input
            type="text"
            name="localBrand"
            className="form-control"
            placeholder="Local Brand"
            onChange={handleChange}
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="discount">Discount</label>
          <input
            type="number"
            name="discount"
            className="form-control"
            placeholder="Discount"
            onChange={handleChange}
          />
        </div> */}
        {/* <div className="form-group">
          <label htmlFor="subtotal">Subtotal</label>
          <input
            disabled
            type="number"
            name="subtotal"
            className="form-control"
            onChange={handleChange}
            value={subtotal}
          />
        </div> */}
        {/* <div className="form-group">
          <label htmlFor="totalAmount">Tax</label>
          <input
            disabled
            type="number"
            name="tax"
            className="form-control"
            placeholder="Total Amount"
            value={tax}
          />
        </div> */}

        <div className="form-group">
          <label htmlFor="totalAmount">Total Price</label>
          <input
            disabled
            type="number"
            name="total"
            className="form-control"
            placeholder="Total Price"
            value={total}
          />
        </div>
        <div className="form-group">
          <label htmlFor="totalAmount">Lot Number</label>
          <input
            type="text"
            name="lotNumber"
            className="form-control"
            placeholder="Lot Number"
            onChange={handleChange}
          />

        </div>
        <div className="form-group">
          <label htmlFor="totalAmount">Type Of Sack</label>
          <input
            type="text"
            name="typeOfSack"
            className="form-control"
            placeholder="Type Of Sack"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="totalAmount">Total</label>
          <select name="paymentMethod" id="" onChange={handleChange}>
            <option value={null}>Select Payment Method</option>
            <option value='Cash'>Cash</option>
            <option value="bKash">bKash</option>
            <option value="Debit Card">Debit Card</option>
          </select>
        </div>
        <input type="submit" value="Submit" onClick={handleSubmit} />
      </form>
    </>
  )
}

export default SaleForm;