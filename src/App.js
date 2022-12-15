import Dashboard from "./Screens/Dashboard/Dashboard.js";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from "./Screens/Products/Products.js";
import Purchase from "./Screens/Purchase/Purchase.js";
import SaleScreen from "./Screens/SaleScreen/SaleScreen.js";
import SignIn from "./Screens/Login/Login.js";
import SignUp from "./Screens/SignUp/SignUp.js";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute.js";
import { useEffect } from "react";
import { loadUser } from "./Redux/Action/useraction.js";
import { useDispatch } from 'react-redux'
import Expense from "./Screens/Expense/Expense.js";
import AllSales from "./Screens/Sales/AllSales.js";
import Calculation from "./Calculation/Calculation.js";
import Invoice from "./Screens/Invoice Screen/Invoice.js";
import ChahidaHome from "./Screens/ChahidaHome/ChahidaHome.js";
import Supplier from "./Screens/Supplier/Supplier.jsx";
import Investment from "./Screens/Investment/Investment.jsx";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token?.token) {
      dispatch(loadUser());
    }
  }, [])
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ChahidaHome />} />
          <Route element={<PrivateRoute />} >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/sale" element={<SaleScreen />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/sale%20list" element={<AllSales />} />
            <Route path="/sale/invoice/:id" element={<Invoice />} />
            <Route path="/supplier" element={<Supplier />} />
            <Route path="/investment" element={<Investment />} />
          </Route>
          {/* general routes */}
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
