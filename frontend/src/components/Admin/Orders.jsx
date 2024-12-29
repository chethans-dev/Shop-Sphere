import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrder,
  getAllOrders,
  updateOrder,
} from "../../store/actions/adminActions";
import { Button, Typography } from "@material-tailwind/react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import MetaData from "../layout/MetaData";

const Orders = () => {
  const { orders } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [orderIdToDelete, setOrderIdToDelete] = useState(null);

  const handleDeleteDialogOpen = (productId) => {
    setOrderIdToDelete(productId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
    setOrderIdToDelete(null);
  };

  const handleDeleteConfirm = () => {
    if (orderIdToDelete) {
      dispatch(deleteOrder(orderIdToDelete));
      setOpenDeleteDialog(false);
      setOrderIdToDelete(null);
    }
  };

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [status, setStatus] = useState("");

  const handleEditDialogOpen = (order) => {
    setSelectedOrder(order);
    setStatus(order?.orderStatus);
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setSelectedOrder(null);
  };

  const handleEditConfirm = () => {
    if (selectedOrder && status) {
      const payload = { id: selectedOrder._id, status: { status } };
      dispatch(updateOrder(payload));
      setOpenEditDialog(false);
      setSelectedOrder(null);
    }
  };

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);
  return (
    <div className="rounded-md bg-white flex flex-col gap-6 justify-center my-[2vmax] w-auto max-w-5xl shadow-lg p-10 custom-scrollbar overflow-y-auto">
      <MetaData title="Orders - Admin" />
      <Typography variant="h4" component="h1" fontWeight="bold" mb={6}>
        Manage Orders
      </Typography>

      <TableContainer>
        <Table className="min-w-full" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Id</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Quantity</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order?._id}</TableCell>
                <TableCell>
                  <div
                    className={`${
                      order.orderStatus === "Delivered"
                        ? "text-green-600"
                        : order.orderStatus === "Shipped"
                        ? "text-blue-600"
                        : "text-yellow-900"
                    }`}
                  >
                    {order?.orderStatus}
                  </div>
                </TableCell>
                <TableCell>{order?.orderItems.length}</TableCell>
                <TableCell>${order?.totalPrice.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex flex-row gap-2">
                    <Button
                      variant="outlined"
                      color="black"
                      onClick={() => handleEditDialogOpen(order)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="filled"
                      color="black"
                      onClick={() => handleDeleteDialogOpen(order._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit order */}
      <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Order</DialogTitle>
        <DialogContent className="flex flex-col gap-4">
          {selectedOrder && (
            <>
              <Typography>
                <span style={{ fontWeight: "bold" }}>Order ID:</span>{" "}
                {selectedOrder._id}
              </Typography>
              <Typography>
                <span style={{ fontWeight: "bold" }}>Items:</span>{" "}
                {selectedOrder.orderItems.map((item) => item.name).join(", ")}
              </Typography>
              <Typography>
                <span style={{ fontWeight: "bold" }}>Total Price:</span> $
                {selectedOrder.totalPrice.toFixed(2)}
              </Typography>
              <hr />
              <Typography>
                <strong style={{ fontWeight: "bold" }}>Name:</strong>{" "}
                {selectedOrder.user.name}
              </Typography>
              <Typography>
                <span style={{ fontWeight: "bold" }}>Shipping Address:</span>{" "}
                {`${selectedOrder.shippingInfo.address}, ${selectedOrder.shippingInfo.city}, ${selectedOrder.shippingInfo.state}, ${selectedOrder.shippingInfo.pinCode}, ${selectedOrder.shippingInfo.country}`}
              </Typography>
              <Typography>
                <strong style={{ fontWeight: "bold" }}>Contact:</strong>{" "}
                {selectedOrder.shippingInfo.phoneNo}
              </Typography>
              <hr />
              <Typography>
                <strong style={{ fontWeight: "bold" }}>Payment Id:</strong>{" "}
                {selectedOrder.paymentInfo.id}
              </Typography>
              <Typography
                className={`${
                  selectedOrder.paymentInfo.status === "succeeded"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                <strong style={{ fontWeight: "bold" }}>Payment Status:</strong>{" "}
                {selectedOrder.paymentInfo.status === "succeeded"
                  ? "Success"
                  : "Failed"}
              </Typography>
              <hr />
              <TextField
                select
                label="Order Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                fullWidth
              >
                <MenuItem value="Processing">Processing</MenuItem>
                <MenuItem value="Shipped">Shipped</MenuItem>
                <MenuItem value="Delivered">Delivered</MenuItem>
              </TextField>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleEditConfirm}
            variant="filled"
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
            }}
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this order?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} variant="outlined">
            Cancel
          </Button>

          <Button
            onClick={handleDeleteConfirm}
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
            }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Orders;
