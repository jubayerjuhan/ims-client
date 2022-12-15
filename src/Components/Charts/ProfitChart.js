import React, { useEffect, useState } from 'react'
import moment from 'moment'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import client from '../../API/client.js';
import { getSales } from '../../Redux/Action/saleaction.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProfitChart = () => {
  const [salesData, setSales] = useState([]);

  // client
  useEffect(() => {
    fetchData();
  }, [])
  const fetchData = async () => {
    const { data } = await client.post(`/sale/all?week=true`);
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
        label: 'Sale Price',
        data: [
          days6.map(sale => sale.priceBreakdown.total).reduce((a, b) => a + b, 0),
          days5.map(sale => sale.priceBreakdown.total).reduce((a, b) => a + b, 0),
          days4.map(sale => sale.priceBreakdown.total).reduce((a, b) => a + b, 0),
          days3.map(sale => sale.priceBreakdown.total).reduce((a, b) => a + b, 0),
          days2.map(sale => sale.priceBreakdown.total).reduce((a, b) => a + b, 0),
          days1.map(sale => sale.priceBreakdown.total).reduce((a, b) => a + b, 0),
          todaySell.map(sale => sale.priceBreakdown.total).reduce((a, b) => a + b, 0),
        ],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Product Purchase Price',
        data: [
          days6.map(sale => sale.purchasePrice).reduce((a, b) => a + b, 0),
          days5.map(sale => sale.purchasePrice).reduce((a, b) => a + b, 0),
          days4.map(sale => sale.purchasePrice).reduce((a, b) => a + b, 0),
          days3.map(sale => sale.purchasePrice).reduce((a, b) => a + b, 0),
          days2.map(sale => sale.purchasePrice).reduce((a, b) => a + b, 0),
          days1.map(sale => sale.purchasePrice).reduce((a, b) => a + b, 0),
          todaySell.map(sale => sale.purchasePrice).reduce((a, b) => a + b, 0),
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  }



  return (
    <div>
      <div className='chart' style={{ width: '450px' }}>
        <h2>Sales Strength - This Week</h2>
        <Bar data={lineChartData} />
      </div>
    </div>
  )
}

export default ProfitChart