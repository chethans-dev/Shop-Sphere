import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import MetaData from "../components/layout/MetaData";
import { myOrders } from "../store/actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const [open, setOpen] = useState(false); // State to manage modal visibility
  const [selectedOrder, setSelectedOrder] = useState(null); // State to store selected order details
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="container rounded-md bg-white flex flex-col gap-6 justify-center mx-auto w-[90vw] p-10 max-w-5xl shadow-lg my-40">
      <MetaData title="Orders" />

      {/* Header */}
      <Typography variant="h4" color="blue-gray" className="text-center mb-6">
        My Orders
      </Typography>

      {/* Orders Table */}
      <Card className="overflow-hidden">
        <CardBody className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 font-medium">Order ID</th>
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium">Total</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order._id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-3 px-4">{order._id}</td>
                  <td className="py-3 px-4">{order?.paidAt.slice(0, 10)}</td>
                  <td className="py-3 px-4">{order?.totalPrice.toFixed(2)}</td>
                  <td
                    className={`py-3 px-4 font-semibold ${
                      order.orderStatus === "Delivered"
                        ? "text-green-600"
                        : order.orderStatus === "Shipped"
                        ? "text-blue-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.orderStatus}
                  </td>
                  <td className="py-3 px-4">
                    <Button
                      color="black"
                      size="sm"
                      className="mr-2"
                      onClick={() => handleViewDetails(order)}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* Modal */}
      {selectedOrder && (
        <Dialog open={open} handler={handleClose}>
          <DialogHeader>Order Details</DialogHeader>
          <DialogBody divider>
            <Typography variant="paragraph" color="blue-gray" className="mb-2">
              <strong style={{ fontWeight: "bold" }}>Order ID:</strong>{" "}
              {selectedOrder._id}
            </Typography>
            <Typography variant="paragraph" color="blue-gray" className="mb-2">
              <strong style={{ fontWeight: "bold" }}>Date:</strong>{" "}
              {selectedOrder?.paidAt.slice(0, 10)}
            </Typography>
            <Typography variant="paragraph" color="blue-gray" className="mb-2">
              <strong style={{ fontWeight: "bold" }}>Total:</strong> $
              {selectedOrder?.totalPrice.toFixed(2)}
            </Typography>
            <Typography variant="paragraph" color="blue-gray" className="mb-2">
              <strong style={{ fontWeight: "bold" }}>Status:</strong>{" "}
              {selectedOrder?.orderStatus}
            </Typography>
            <Typography variant="paragraph" color="blue-gray" className="mb-2">
              <strong style={{ fontWeight: "bold" }}>Shipping Address:</strong>{" "}
              {`${selectedOrder.shippingInfo.address}, ${selectedOrder.shippingInfo.city}, ${selectedOrder.shippingInfo.state}, ${selectedOrder.shippingInfo.pinCode}, ${selectedOrder.shippingInfo.country}`}
            </Typography>
            <Typography variant="paragraph" color="blue-gray" className="mb-2">
              <strong style={{ fontWeight: "bold" }}>Contact:</strong>{" "}
              {selectedOrder.shippingInfo.phoneNo}
            </Typography>
            <Typography variant="paragraph" color="blue-gray" className="mb-4">
              <strong style={{ fontWeight: "bold" }}>Items:</strong>
            </Typography>
            <ul className="list-disc list-inside">
              {selectedOrder.orderItems.map((item, index) => (
                <li key={index}>
                  <Link to={`/product/${item.product}`}>
                    <img
                      src={item?.image}
                      alt={item?.name}
                      className="w-10 h-10 inline-block mr-2"
                    />
                    {item?.name} - {item?.quantity} x ${item?.price.toFixed(2)}
                  </Link>
                </li>
              ))}
            </ul>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleClose}
              className="mr-2"
            >
              Close
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  );
};

export default OrdersPage;
