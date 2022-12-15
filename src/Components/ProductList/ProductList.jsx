import { Button, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallProducts } from "../../Redux/Action/productaction.js";
import Checkbox from "@mui/material/Checkbox";

import "./productlist.css";

const ProductList = ({ open, setList }) => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getallProducts());
  }, []);

  const row = [];
  products?.reverse()?.forEach((product) => {
    row.push({
      id: product._id,
      name: product.name,
      category: product.category.name,
      purchasePrice: product.purchasePrice,
      salePrice: product.salePrice,
      stock: product.stock,
    });
  });

  console.log(products);
  const columns = [
    // { field: 'id', headerName: 'Sale Id', flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "purchasePrice",
      headerName: "Purchase Price",
      flex: 1,
    },
    {
      field: "salePrice",
      headerName: "Sale Price",
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      flex: 1,
    },
    {
      field: "reorderLevel",
      headerName: "Reorder Level",
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            <Checkbox checked={params.row.stock <= 2 ? true : false} />
          </div>
        );
      },
    },
  ];
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        backgroundColor: "white",
      }}
    >
      <div className="productList__modal">
        <div className="title">
          <h2>Product List</h2>
          <div className="btn">
            <Button onClick={() => setList(false)} varient="contained">
              Exit
            </Button>
          </div>
        </div>
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
        />
      </div>
    </Modal>
  );
};

export default ProductList;
