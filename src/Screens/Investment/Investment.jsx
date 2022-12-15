import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import "./investment.css";
import client from "../../API/client.js";
import { DataGrid } from "@mui/x-data-grid";
const Investment = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [investments, setInvestments] = useState([]);
  const [investment, setInvestment] = useState({
    name: "",
    paymentAmount: "",
    paymentDate: startDate,
    paymentType: "",
    cashCarriedPerson: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvestment({ ...investment, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(investment);
    for (let key in investment) {
      if (investment[key] === "") {
        alert(`Please fill all the ${key}`);
        return;
      }
    }
    //
    const res = await client.post("/investment", investment);
    if (res.data.success) {
      alert("Investment added successfully");
      setInvestments([res.data.investment, ...investments]);
    }
  };

  useEffect(() => {
    fetchInvestment();
  }, []);

  const rows = [];
  investments.reverse().forEach((investment) => {
    rows.push({
      id: investment._id,
      name: investment.name,
      paymentAmount: investment.paymentAmount,
      paymentDate: moment(investment.paymentDate).format("DD-MM-YYYY"),
      paymentType: investment.paymentType,
      cashCarriedPerson: investment.cashCarriedPerson,
    });
  });
  const fetchInvestment = async () => {
    const res = await client.get("/investment");
    setInvestments(res.data.investments);
  };
  // data grid for investment
  const columns = [
    // { field: 'id', headerName: 'Sale Id', flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "paymentAmount",
      headerName: "Payment Amount",
      flex: 1,
    },
    {
      field: "paymentType",
      headerName: "Payment Type",
      flex: 1,
    },
    {
      field: "paymentDate",
      headerName: "Payment Date",
      flex: 1,
    },
    {
      field: "cashCarriedPerson",
      headerName: "Cash Carried Person",
      flex: 1,
    },
  ];

  return (
    <div className="separator">
      <div>
        <Sidebar />
      </div>
      <div className="smallPadding investment">
        <div className="datagridSide">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
          />
        </div>
        <div className="inputSide">
          <h2>Investment Entry</h2>
          <form className="form" onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              id=""
              placeholder="Name"
            />
            <select onChange={handleChange} name="paymentType" id="">
              <option value={null}>Select Payment Type</option>
              <option value="Cash">Cash</option>
              <option value="Cheque">Cheque</option>
            </select>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <input
              onChange={handleChange}
              type="text"
              name="paymentAmount"
              id=""
              placeholder="Amount"
            />
            <input
              onChange={handleChange}
              type="text"
              name="cashCarriedPerson"
              id=""
              placeholder="Cash Carried Person"
            />
            <input type={"submit"} title="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Investment;
