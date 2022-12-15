import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import client from "../API/client.js";
import moment from "moment";

export const calculateTopProducts = (sales) => {
  const { categories } = useSelector(state => state.categories)

  let topProducts = [];
  sales?.forEach(sale => {
    sale.saleItems.forEach(item => {
      topProducts.push(item)
    })
  })

  let dashboardTop = [];
  topProducts.forEach(item => {
    const isexist = dashboardTop.find(product => product.product?._id === item.product?._id)
    if (!isexist) {
      dashboardTop.push(item)
    } else {
      const index = dashboardTop.findIndex(product => product.product?._id === item.product?._id)
      dashboardTop[index].quantity += item.quantity
    }
  })
  dashboardTop.sort((a, b) => b.quantity - a.quantity)

  const topptoductsData = {
    labels: dashboardTop.slice(0, 5).map(item => (item?.product?.name)),
    datasets: [
      {
        data: dashboardTop.slice(0, 5).map(item => item?.quantity),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
      }
    ]
  }

  // top category
  const topCategory = []
  dashboardTop.forEach(item => {
    const isexist = topCategory.find(category => category?.category === item?.product?.category)
    if (!isexist) {
      topCategory.push({ category: item?.product?.category, quantity: item?.quantity })
    } else {
      const index = topCategory.findIndex(category => category?.category === item?.product?.category)
      topCategory[index].quantity += item?.quantity
    }
  })

  const topCat = []

  topCategory.forEach(cat => {
    const servercat = categories?.find(category => category._id === cat.category)
    topCat?.push({ category: servercat?.name, quantity: cat?.quantity })
  })



  const topCategoryData = {
    labels: topCat.slice(0, 5).map(item => (item?.category)),
    datasets: [
      {
        data: topCat.slice(0, 5).map(item => item?.quantity),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
      }
    ]
  }



  const todaySell = []
  const days1 = []
  const days2 = []
  const days3 = []
  const days4 = []
  const days5 = []
  const days6 = []


  sales?.forEach(sale => {
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

  const weeklyData = {
    days6: days6.length,
    days5: days5.length,
    days4: days4.length,
    days3: days3.length,
    days2: days2.length,
    days1: days1.length,
    todaySell: todaySell.length,
  }


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
        ]
      }
    ]
  }


  return {
    topptoductsData,
    topCategoryData,
    lineChartData
  }

}

export const calculateRevenue = (sales) => {
  let revenue = 0;
  sales?.forEach(sale => {
    revenue += sale.priceBreakdown.total;
  })
  return revenue
}
export const salePurchasePrice = (sales) => {
  let purchase = 0
  sales?.forEach(sale => {
    purchase += sale.purchasePrice
  })
  return purchase
}
export const calculatePaymentMethod = (sales) => {
  let bkash = 0;
  let cash = 0;
  let card = 0;
  sales?.forEach(sale => {
    if (sale.paymentMethod === 'Cash') {
      cash += 1
    }
    if (sale.paymentMethod === 'Card' || sale.paymentMethod === 'Debit Card') {
      card += 1
    }
    if (sale.paymentMethod === 'bKash') {
      bkash += 1
    }
  })
  return {
    bkash,
    cash,
    card
  }
}
