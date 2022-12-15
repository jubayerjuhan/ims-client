import React, { useState, useEffect } from 'react'
import Minicard from '../../Components/Minicard/Minicard.js'
import { BiMoney } from 'react-icons/bi'
import {
  Chart as ChartJS,
  ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
);
import { calculateGross, calculatePaymentMethod, calculateRevenue, calculateTopProducts, salePurchasePrice } from '../../Calculation/Calculation.js'
import './dashboard.css'
import Sidebar from '../../Components/Sidebar/Sidebar.js'
import { useDispatch, useSelector } from 'react-redux'
import { getSales } from '../../Redux/Action/saleaction.js'
import { getAllCategories } from '../../Redux/Action/productaction.js';
import Linecharts from '../../Components/Charts/Linecharts.js';
import ProfitChart from '../../Components/Charts/ProfitChart.js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [timeInterval, setTimeInterval] = useState('today');
  const { sales } = useSelector(state => state.sales)
  const { topptoductsData, topCategoryData } = calculateTopProducts(sales)
  const totalRevenue = calculateRevenue(sales)
  const { bkash, card, cash } = calculatePaymentMethod(sales)
  const purchasePrice = salePurchasePrice(sales)

  // 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(getSales(startDate, toDate));
  }, [dispatch, startDate, toDate])


  return (
    <div className='separator'>
      <div>
        <Sidebar />
      </div>
      <div className='smallPadding'>
        <div className='dashboard__card-wrapper'>
          <Minicard icon={<BiMoney size={50} />}
            amount={`৳${totalRevenue}`}
            title={'Total Income'} />
          <Minicard icon={<BiMoney size={50} />}
            amount={`৳${totalRevenue - purchasePrice}`}
            title={'Today Gross'} />
          <Minicard icon={<BiMoney size={50} />}
            amount={'৳1,000'}
            title={'Payment Method'}
            bKash={bkash}
            cash={cash}
            card={card}
            payment />
        </div>
        <div className='date_filter'>

          <div>
            <p>From</p>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          </div>
          <div>
            <p>To</p>
            <DatePicker selected={toDate} onChange={(date) => setToDate(date)} />
          </div>
        </div>
        <div className='dashboard__charts'>
          <Linecharts />
          <ProfitChart />
          <div className='chart'>
            <h2>Top Category {timeInterval === 'today' ? 'Today' : '- This Week'}</h2>
            <Doughnut data={topCategoryData} />
          </div>
          <div className='chart'>
            <h2>Top Products {timeInterval === 'today' ? 'Today' : '- This Week'}</h2>
            <Doughnut data={topptoductsData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard