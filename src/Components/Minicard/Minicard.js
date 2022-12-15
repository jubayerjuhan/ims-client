import React from 'react'
import './minicard.css'

const Minicard = ({ icon, amount, title, payment, cash, bKash, card }) => {
  return (
    <>
      {!payment && <div className='minicard' >
        <div>
          <h2>{amount}</h2>
          <h4>{title}</h4>
        </div>
        {icon}
      </div>
      }
      {payment &&
        <div className='minicard' >
          <div>
            <p className='header'>Payment Method</p>
            <p>Cash : {cash}</p>
            <p>bKash: {bKash}</p>
            <p>Card: {card}</p>
          </div>
          {icon}
        </div>
      }
    </>
  )
}

export default Minicard