import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../components/layout/MetaData";
import { useSelector } from "react-redux";

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const { order } = useSelector((state) => state.order); // Get order info from Redux state

  // Redirect to homepage if no order information is available
  useEffect(() => {
    if (!order) {
      navigate("/");
    }
  }, [order, navigate]);

  return (
    <div className="rounded-md bg-white flex flex-col gap-6 justify-center my-[2vmax] mx-auto w-[90vw] p-10 max-w-5xl shadow-lg m-10">
      <MetaData title="Order Success" />
      <h2 className="text-2xl font-semibold text-green-500">
        Payment Successful!
      </h2>

      <div className="flex flex-col gap-4">
        <p className="text-lg">Thank you for your purchase !</p>

        <p>Your order has been successfully placed.</p>
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate("/")}
            className="bg-black text-white px-6 py-2 rounded-md"
          >
            Go to Homepage
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="bg-gray-800 text-white px-6 py-2 rounded-md"
          >
            View Order History
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
