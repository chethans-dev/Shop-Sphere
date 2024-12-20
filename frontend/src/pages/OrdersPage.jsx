import { Card, CardBody, Typography, Button } from "@material-tailwind/react";

const OrdersPage = () => {
  // Mock data for user orders
  const orders = [
    {
      id: "001",
      date: "2024-12-15",
      total: "$120.50",
      status: "Delivered",
    },
    {
      id: "002",
      date: "2024-11-30",
      total: "$85.20",
      status: "Shipped",
    },
    {
      id: "003",
      date: "2024-11-20",
      total: "$45.00",
      status: "Processing",
    },
  ];

  return (
    <div className="container rounded-md bg-white flex flex-col gap-6 justify-center my-[2vmax] mx-auto w-[90vw] p-10 max-w-5xl shadow-lg">
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
                      onClick={() => alert(`Viewing details for Order ${order.id}`)}
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
    </div>
  );
};

export default OrdersPage;
