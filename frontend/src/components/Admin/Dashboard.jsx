import { Card, Typography } from "@material-tailwind/react";
import { Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import MetaData from "../layout/MetaData";
import { useEffect } from "react";
import {
  fetchAllProducts,
  getAllOrders,
} from "../../store/actions/adminActions";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.admin);
  const { orders } = useSelector((state) => state.admin);

  const totalAmount = orders.reduce((acc, item) => acc + item.totalPrice, 0);

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(getAllOrders());
  }, [dispatch]);

  let outOfStock = 0;
  products &&
    products.forEach((product) => {
      if (product.stock === 0) {
        outOfStock += 1;
      }
    });
  const doughnutData = {
    labels: ["In Stock", "Out of Stock"],
    datasets: [
      {
        label: "Products",
        data: [products.length - outOfStock, outOfStock],
        backgroundColor: ["black", "grey"],
      },
    ],
  };

  const lineData = {
    labels: ["Initial Amount", "Revenue Generated"],
    datasets: [
      {
        label: "Total Amount",
        data: [1200, 1900, 3200, 2400, 3100, 4500],
        fill: true,
        backgroundColor: "black",
        borderColor: "black",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="rounded-md bg-white flex flex-col gap-6 justify-center my-[2vmax] w-[50vw] max-w-5xl shadow-lg p-10 custom-scrollbar overflow-y-auto">
      <MetaData title="Admin Dashboard" />
      <Typography variant="h4" color="blue-gray" className="mb-4 text-center">
        Dashboard
      </Typography>
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6 text-center shadow">
          <Typography variant="h6" className="mb-2">
            Total Amount
          </Typography>
          <Typography variant="h5" color="black">
            ${totalAmount}
          </Typography>
        </Card>
        <Card className="p-6 text-center shadow">
          <Typography variant="h6" className="mb-2">
            Total Products
          </Typography>
          <Typography variant="h5" color="black">
            {products?.length}
          </Typography>
        </Card>
        <Card className="p-6 text-center shadow">
          <Typography variant="h6" className="mb-2">
            Total Orders
          </Typography>
          <Typography variant="h5" color="black">
            {orders.length}
          </Typography>
        </Card>
        <Card className="p-6 text-center shadow">
          <Typography variant="h6" className="mb-2">
            Total Users
          </Typography>
          <Typography variant="h5" color="black">
            450
          </Typography>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-6 mt-6">
        <Card className="p-8 shadow h-[400px] flex items-center justify-center">
          <Typography
            variant="h6"
            color="blue-gray"
            className="mb-4 text-center"
          >
            Product Stock Overview
          </Typography>
          <Doughnut data={doughnutData} />
        </Card>
        <Card className="p-6 shadow">
          <Typography
            variant="h6"
            color="blue-gray"
            className="mb-4 text-center"
          >
            Revenue Over Time
          </Typography>
          <Line data={lineData} />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
