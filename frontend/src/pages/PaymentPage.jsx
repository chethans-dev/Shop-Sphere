import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import MetaData from "../components/layout/MetaData.jsx";
import CheckoutSteps from "../components/Cart/CheckoutSteps.jsx";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../store/actions/orderActions.js";
import { clearCart } from "../store/reducers/cartSlice.js";

const PaymentPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [orderInfo, setOrderInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const order = {
    shippingInfo: {
      ...shippingInfo,
      pinCode: shippingInfo?.zip,
      phoneNo: shippingInfo?.phone,
    },
    orderItems: cartItems.map((item) => {
      return { ...item, product: item?.id };
    }),
    itemsPrice: orderInfo?.subTotalPrice,
    taxPrice: orderInfo?.gst,
    shippingPrice: orderInfo?.shippingCharges,
    totalPrice: orderInfo?.totalPrice,
  };

  // Retrieve data from session storage
  useEffect(() => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    setOrderInfo(orderInfo || {});
  }, []);

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const shipping = {
      name: user?.name,
      address: {
        line1: shippingInfo?.address,
        city: shippingInfo?.city,
        state: shippingInfo?.state,
        postal_code: shippingInfo?.zip,
        country: shippingInfo?.country,
      },
    };
    try {
      const { data } = await axios.post(
        "/api/v1/payment/process",
        { amount: Math.round(orderInfo?.totalPrice * 100), shipping },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const clientSecret = data?.data?.client_secret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user?.name,
            email: user?.email,
            address: {
              line1: shippingInfo?.address,
              city: shippingInfo?.city,
              state: shippingInfo?.state,
              postal_code: shippingInfo?.zip,
              country: shippingInfo?.country,
            },
          },
        },
      });

      if (result.error) {
        toast.error(`Payment failed: ${result.error.message}`, {
          position: "top-right",
        });
        setLoading(false);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order["paymentInfo"] = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          dispatch(clearCart());
          navigate("/success");
        } else {
          toast.error("There was an issue with your payment.", {
            position: "top-right",
          });
        }
        setLoading(false);
      }
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.message}`, {
        position: "top-right",
      });
      setLoading(false);
    }
  };

  return (
    <div className="rounded-md bg-white flex flex-col gap-6 justify-center my-[2vmax] mx-auto w-[90vw] p-10 max-w-5xl shadow-lg">
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />

      <form className="flex flex-col gap-6" onSubmit={paymentHandler}>
        <Card className="w-full shadow-md">
          <CardBody>
            <Typography className="text-xl font-semibold mb-4">
              Payment Details
            </Typography>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-gray-600">Card Number</label>
                <CardNumberElement className="p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-600">Expiry Date</label>
                <CardExpiryElement className="p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-600">CVC</label>
                <CardCvcElement className="p-2 border border-gray-300 rounded-md" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Button
          type="submit"
          className="w-full bg-black"
          disabled={loading || !stripe || !elements}
        >
          {loading ? "Processing..." : `Pay $${orderInfo?.totalPrice}`}
        </Button>
      </form>
    </div>
  );
};

export default PaymentPage;
