import React, { useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar.js";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getExpenses } from "../../Redux/Action/expenseaction.js";
import { Button, Modal } from "@mui/material";
import "./supplier.css";
import { FaTimesCircle } from "react-icons/fa";
import client from "../../API/client.js";

const Supplier = () => {
  const [modOpen, setModOpen] = React.useState(false);
  const [suppliers, setSuppliers] = React.useState([]);

  const { expense } = useSelector((state) => state.expense);
  const dispatch = useDispatch();
  useEffect(() => {
    getSuppliers();
  }, []);

  const getSuppliers = () => {
    client.get("/supplier").then((res) => {
      setSuppliers(res.data.suppliers);
    });
  };

  console.log(suppliers);

  const row = [];

  suppliers?.forEach((supplier) => {
    row.push({
      id: supplier._id,
      supplierName: supplier.supplierName,
      address: supplier.address,
      phone: supplier.phone,
      focalName: supplier.focalName,
      focalPersonDesignation: supplier.focalPersonDesignation,
    });
  });

  const columns = [
    // { field: "id", headerName: "Expense ID", flex: 0 },
    {
      field: "supplierName",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
    },
    {
      field: "focalName",
      headerName: "Focal Name",
      flex: 1,
    },
    {
      field: "focalPersonDesignation",
      headerName: "Focal Person Dsg.",
      flex: 1,
    },
  ];

  return (
    <div className="separator">
      <div>
        <Sidebar />
      </div>
      <div className="smallPadding">
        <div className="section__wrapper">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h1>Supplier</h1>
            <Button onClick={() => setModOpen(true)} varient="">
              Add Supplier
            </Button>
          </div>
          <SupplierModal
            suppliers={suppliers}
            open={modOpen}
            setModOpen={setModOpen}
          />
          <div className="section__container">
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              disableSelectionOnClick
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Supplier;

const SupplierModal = ({ open, setModOpen, suppliers }) => {
  const fieldName = [
    { fieldName: "supplierName", label: "Supplier Name" },
    { fieldName: "address", label: "Address" },
    { fieldName: "phone", label: "Phone" },
    { fieldName: "focalName", label: "Focal Name" },
    { fieldName: "focalPersonDesignation", label: "Focal P. Des." },
  ];

  const [fieldValues, setfieldValues] = React.useState({
    supplierName: "",
    address: "",
    phone: "",
    focalName: "",
    focalPersonDesignation: "",
  });

  const handleChange = (e) => {
    setfieldValues({ ...fieldValues, [e.target.name]: e.target.value });
    console.log(fieldValues);
  };
  console.log(suppliers, "spp");
  const handleSubmit = (e) => {
    e.preventDefault();

    const exist = suppliers.find((supplier) => {
      return supplier.supplierName === fieldValues.supplierName;
    });
    if (exist) return alert("Supplier already exist");
    client
      .post("/supplier", fieldValues)
      .then((res) => {
        if (res.data.success) {
          alert("Supplier Created");
        } else {
          alert("Error! Please try again");
        }
      })
      .catch((err) => {
        alert("Error! Please try again");
      });
  };
  return (
    <Modal
      open={open}
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <div className="modal__container">
        <div className="header">
          <h1>Supplier</h1>
          <FaTimesCircle onClick={() => setModOpen(false)} />
        </div>

        <form action="" onSubmit={handleSubmit}>
          {fieldName.map((field) => (
            <div className="appTextInput">
              <input
                type="text"
                // value={values[field.name]}
                onChange={handleChange}
                name={field.fieldName}
                placeholder={field.label}
              />
            </div>
          ))}
          <input type="submit" value="Submit" onClick={handleSubmit} />
        </form>
      </div>
    </Modal>
  );
};
