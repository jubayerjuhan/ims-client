import React, { useEffect, useState } from 'react'
import moment from 'moment'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { calculateTopProducts } from '../../Calculation/Calculation.js';
import { useSelector } from 'react-redux';
import client from '../../API/client.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Linecharts = () => {
  const [salesData, setSales] = useState([]);
  const { sales } = useSelector(state => state.sales)

  // client
  useEffect(() => {
    fetchData();
  }, [])
  const fetchData = async () => {
    const { data } = await client.post('/sale/all?week=true');
    setSales(data.sale);
  }


  // calculate line chart logic
  const todaySell = []
  const days1 = []
  const days2 = []
  const days3 = []
  const days4 = []
  const days5 = []
  const days6 = []

  salesData?.forEach(sale => {
    if (moment(sale.createdAt).isAfter(moment().startOf('day'))) {
      todaySell.push(sale)
    } else if (moment(sale.createdAt).isAfter(moment().startOf('day').subtract(1, 'days'))) {
      days1.push(sale)
    }
    else if (moment(sale.createdAt).isAfter(moment().startOf('day').subtract(2, 'days'))) {
      days2.push(sale)
    }
    else if (moment(sale.createdAt).isAfter(moment().startOf('day').subtract(3, 'days'))) {
      days3.push(sale)
    }
    else if (moment(sale.createdAt).isAfter(moment().startOf('day').subtract(4, 'days'))) {
      days4.push(sale)
    }
    else if (moment(sale.createdAt).isAfter(moment().startOf('day').subtract(5, 'days'))) {
      days5.push(sale)
    }
    else if (moment(sale.createdAt).isAfter(moment().startOf('day').subtract(6, 'days'))) {
      days6.push(sale)
    }
  })

  // linechart
  const lineChartData = {
    labels: [
      moment().startOf('day').subtract(6, 'days').format('dddd'),
      moment().startOf('day').subtract(5, 'days').format('dddd'),
      moment().startOf('day').subtract(4, 'days').format('dddd'),
      moment().startOf('day').subtract(3, 'days').format('dddd'),
      moment().startOf('day').subtract(2, 'days').format('dddd'),
      moment().startOf('day').subtract(1, 'days').format('dddd'),
      moment().startOf('day').format('dddd'),
    ],
    datasets: [
      {
        label: 'Sales',
        data: [
          days6.length,
          days5.length,
          days4.length,
          days3.length,
          days2.length,
          days1.length,
          todaySell.length,
        ],
        backgroundColor: 'red',
        borderColor: 'red',
      }
    ]
  }

  return (
    <div>
      <div className='chart' style={{ width: '450px' }}>
        <h2>Sales Improvement - This Week</h2>
        <Line data={lineChartData} />
      </div>
    </div>
  )
}

export default Linecharts