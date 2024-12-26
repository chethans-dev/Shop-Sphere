import MetaData from "../components/layout/MetaData.jsx";
import CheckoutSteps from "../components/Cart/CheckoutSteps.jsx";
import { useSelector } from "react-redux";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems, subTotalPrice } = useSelector(
    (state) => state.cart
  );
  const { user } = useSelector((state) => state.user);

  const shippingCharges = subTotalPrice > 500 ? 0 : 50;
  const gst = Number((0.18 * subTotalPrice).toFixed(2));
  const totalPrice = subTotalPrice + shippingCharges + gst;

  const proceedToPayment = () => {
    const data = {
      subTotalPrice,
      shippingCharges,
      gst,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/order/payment");
  };

  return (
    <div className="rounded-md bg-white flex flex-col gap-6 justify-center my-[2vmax] mx-auto w-[90vw] p-10 max-w-5xl shadow-lg">
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />

      <div className="flex flex-wrap gap-6 justify-between">
        {/* Shipping Details */}
        <Card className="w-full md:w-[48%] shadow-md">
          <CardBody>
            <Typography className="text-xl font-semibold mb-4">
              Shipping Details
            </Typography>
            <Typography className="text-gray-600 mb-2">
              <strong>Name:</strong> {user?.name}
            </Typography>
            <Typography className="text-gray-600 mb-2">
              <strong>Phone:</strong> {shippingInfo?.phone}
            </Typography>
            <Typography className="text-gray-600">
              <strong>Address:</strong>{" "}
              {`${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state}, ${shippingInfo?.zip}, ${shippingInfo?.country}`}
            </Typography>
          </CardBody>
        </Card>

        {/* Your Items */}
        <Card className="w-full md:w-[48%] shadow-md">
          <CardBody>
            <Typography className="text-xl font-semibold mb-4">
              Your Items
            </Typography>
            {cartItems.map((item) => (
              <Link
                key={item.id}
                className="flex justify-between items-center mb-4 cursor-pointer"
                to={`/product/${item.id}`}
              >
                <img
                  src={item?.image}
                  alt={item?.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <Typography className="text-gray-600 flex-1">
                  {item.name} (x{item.quantity})
                </Typography>
                <Typography className="text-gray-600">
                  ${(item.quantity * item.price).toFixed(2)}
                </Typography>
              </Link>
            ))}
          </CardBody>
        </Card>

        {/* Order Summary */}
        <Card className="w-full shadow-md">
          <CardBody>
            <Typography className="text-xl font-semibold mb-4">
              Order Summary
            </Typography>
            <div className="flex justify-between mb-2">
              <Typography className="text-gray-600">Subtotal:</Typography>
              <Typography className="text-gray-600">
                ${subTotalPrice.toFixed(2)}
              </Typography>
            </div>
            <div className="flex justify-between mb-2">
              <Typography className="text-gray-600">
                Shipping Charges:
              </Typography>
              <Typography className="text-gray-600">
                ${shippingCharges.toFixed(2)}
              </Typography>
            </div>
            <div className="flex justify-between mb-4">
              <Typography className="text-gray-600">GST (18%):</Typography>
              <Typography className="text-gray-600">${gst.toFixed(2)}</Typography>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <Typography>Total:</Typography>
              <Typography>${totalPrice.toFixed(2)}</Typography>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outlined"
          color="blue-gray"
          onClick={() => navigate("/shipping")}
        >
          Previous
        </Button>
        <Button variant="filled" color="black" onClick={proceedToPayment}>
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};

export default ConfirmOrder;
