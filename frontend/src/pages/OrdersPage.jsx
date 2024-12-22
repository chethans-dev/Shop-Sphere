import { useState } from "react";
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

const OrdersPage = () => {
  const [open, setOpen] = useState(false); // State to manage modal visibility
  const [selectedOrder, setSelectedOrder] = useState(null); // State to store selected order details

  // Mock data for user orders
  const orders = [
    {
      id: "001",
      date: "2024-12-15",
      total: "$120.50",
      status: "Delivered",
      items: [
        { name: "Wireless Headphones", quantity: 1, price: "$60.00" },
        { name: "Phone Case", quantity: 2, price: "$30.50" },
      ],
    },
    {
      id: "002",
      date: "2024-11-30",
      total: "$85.20",
      status: "Shipped",
      items: [{ name: "Smartwatch", quantity: 1, price: "$85.20" }],
    },
    {
      id: "003",
      date: "2024-11-20",
      total: "$45.00",
      status: "Processing",
      items: [
        { name: "Notebook", quantity: 3, price: "$15.00" },
      ],
    },
  ];

  // Function to open the modal and set the selected order
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  // Function to close the modal
  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="container rounded-md bg-white flex flex-col gap-6 justify-center my-[2vmax] mx-auto w-[90vw] p-10 max-w-5xl shadow-lg">
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
                  key={order.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-3 px-4">{order.id}</td>
                  <td className="py-3 px-4">{order.date}</td>
                  <td className="py-3 px-4">{order.total}</td>
                  <td
                    className={`py-3 px-4 font-semibold ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : order.status === "Shipped"
                        ? "text-blue-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="py-3 px-4">
                    <Button
                      color="blue"
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
              <strong>Order ID:</strong> {selectedOrder.id}
            </Typography>
            <Typography variant="paragraph" color="blue-gray" className="mb-2">
              <strong>Date:</strong> {selectedOrder.date}
            </Typography>
            <Typography variant="paragraph" color="blue-gray" className="mb-2">
              <strong>Total:</strong> {selectedOrder.total}
            </Typography>
            <Typography variant="paragraph" color="blue-gray" className="mb-2">
              <strong>Status:</strong> {selectedOrder.status}
            </Typography>
            <Typography variant="paragraph" color="blue-gray" className="mb-4">
              <strong>Items:</strong>
            </Typography>
            <ul className="list-disc list-inside">
              {selectedOrder.items.map((item, index) => (
                <li key={index}>
                  {item.name} - {item.quantity} x {item.price}
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
