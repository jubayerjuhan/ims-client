import React from 'react'
import { BsFillHouseFill } from 'react-icons/bs'
import { FaGifts, FaClipboardList } from 'react-icons/fa'
import { FcSalesPerformance } from 'react-icons/fc'
import { GoDashboard } from 'react-icons/go'
import { BiPurchaseTag } from 'react-icons/bi'
import { GiExpense, GiPayMoney } from 'react-icons/gi'

import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ImSwitch } from 'react-icons/im'
import './sidebar.css'
import chahidaLogo from '../../assets/chahidaLogo.png'


const Sidebar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user)
  const sidebarItems = [
    { name: 'Dashboard', icon: <GoDashboard size={30} />, },
    { name: 'Products', icon: <FaGifts size={30} /> },
    { name: 'Sale', icon: <FcSalesPerformance size={30} /> },
    { name: 'Purchase', icon: <BiPurchaseTag size={30} /> },
    { name: 'Sale List', icon: <FaClipboardList size={30} /> },
    { name: 'Investment', icon: <GiPayMoney size={30} /> },
    { name: 'Expense', icon: <GiExpense size={30} /> },
    { name: 'Supplier', icon: <FaClipboardList size={30} /> },
  ]

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch({ type: 'LOGOUT_USER' })
    navigate('/login')
    alert('Logout Successfully')
  }
  return (
    <div className='mainSideWrapper'>
      <div className='sidebar__wrapper'>
        <div className='sidebar__header'>
          <div className='sidebar__header-logo'>
            <img src={chahidaLogo} alt="" />
          </div>
        </div>
        {sidebarItems.map((item, index) => (
          <Link to={`/${item.name.toLowerCase()}`}>
            <div className='sidebar__nav' key={item.name} >
              {item.icon}
              <p>{item.name}</p>
            </div>
          </Link>
        ))}
        <div className='sidebar__userSection'>
          <div className='user'>
            <img src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'} alt="" />
            <p>Logged In As {user?.user?.name}</p>
            <ImSwitch onClick={handleLogout} />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default Sidebar