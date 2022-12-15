import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSingleSale } from '../../Redux/Action/saleaction.js'
import './invoice.css'
import moment from 'moment'
const Invoice = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const { sale, success } = useSelector(state => state.singleSale)


  useEffect(() => {
    dispatch(getSingleSale(id))
  }, [])

  console.log(sale)

  return (
    <>
      {sale && (
        <>
          <button className='printBtn' onClick={() => window.print()}>Print Invoice</button>
          <div className='invoice'>
            <div className='invoice__page'>
              <div className='invoiceWrapper'>
                <div className='companyTitle'>
                  <h1>Bd Chahida</h1>
                  <p>Address: xxxxxxxxxxxxxxxxx</p>
                  <p>Phone: xxxxxxxxxx</p>
                  <p>Email: xxxxxxxxxx</p>
                </div>
                {/* payment invoice */}
                <div className='payment'>
                  <h2>Payment Invoice</h2>
                  <p>Invoice No: {sale?._id}</p>
                  <p>Date: {moment(sale?.createdAt).format('MM-DD-YYYY')}</p>
                  <p>Payment Method: {sale?.paymentMethod}</p>
                </div>
                {/* customer info */}
                <div className='customerInfo'>
                  <h2>Customer Info</h2>
                  <p>Name: {sale.name}</p>
                </div>
              </div>
              {/* invoice table */}
              <div className='invoiceTable'>
                <h2>Invoice Table</h2>
                <table >
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sale.saleItems.map(item => (
                      <tr key={item.id}>
                        <td>{item?.product?.name}</td>
                        <td>{item?.quantity}</td>
                        <td>{item?.product?.salePrice} Taka</td>
                        <td>{item?.quantity * item?.product?.salePrice} Taka</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* total info */}
              <div className='totalInfo'>
                <p>Sub Total : {sale.priceBreakdown.subtotal} Taka</p>
                <p>Discount : {sale.priceBreakdown.discount} Taka</p>
                <h2>Total: {sale.priceBreakdown.total} Taka</h2>
              </div>
            </div>
          </div></>)}</>
  )
}


export default Invoice