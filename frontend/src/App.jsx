import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import Home from "./components/layout/Home/Home";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/LoginPage";
import ProductDetails from "./components/Products/ProductDetails";
import SignupPage from "./pages/SignupPage";
import { useEffect, useState } from "react";
import { loadUser } from "./store/actions/userActions";
import { useDispatch } from "react-redux";
import { clearErrors } from "./store/reducers/userSlice";
import ProfilePage from "./pages/ProfilePage";
import OrdersPage from "./pages/OrdersPage";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import CartPage from "./pages/CartPage";
import ShippingPage from "./pages/ShippingPage.jsx";
import ConfirmOrder from "./pages/ConfirmOrder.jsx";
import { getSPK } from "./apis/stripe/stripe.js";
import PaymentPage from "./pages/PaymentPage.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccessPage from "./pages/OrderSuccessPage.jsx";
import AllProducts from "./components/Admin/AllProducts.jsx";
import CreateProduct from "./components/Admin/CreateProduct.jsx";
import AdminLayout from "./pages/AdminPage.jsx";
import Dashboard from "./components/Admin/Dashboard.jsx";
import Users from "./components/Admin/Users.jsx";
import Reviews from "./components/Admin/Reviews.jsx";
import Orders from "./components/Admin/Orders.jsx";
import EditProduct from "./components/Admin/EditProduct.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <ProductsPage /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      {
        path: "account",
        element: <ProtectedRoute />,
        children: [{ index: true, element: <ProfilePage /> }],
      },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "reset-password/:token", element: <ResetPasswordPage /> },
      { path: "cart", element: <CartPage /> },
      {
        path: "shipping",
        element: <ProtectedRoute />,
        children: [{ index: true, element: <ShippingPage /> }],
      },
      {
        path: "order",
        element: <ProtectedRoute />,
        children: [
          { path: "confirm", element: <ConfirmOrder /> },
          { path: "payment", element: <PaymentPage /> },
        ],
      },
      {
        path: "success",
        element: <ProtectedRoute />,
        children: [{ index: true, element: <OrderSuccessPage /> }],
      },
      {
        path: "orders",
        element: <ProtectedRoute />,
        children: [{ index: true, element: <OrdersPage /> }],
      },
      {
        path: "admin",
        element: <ProtectedRoute isAdmin={true} />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              { path: "dashboard", element: <Dashboard /> },
              { path: "products", element: <AllProducts /> },
              { path: "product", element: <CreateProduct /> },
              { path: "edit/:id", element: <EditProduct /> },
              { path: "orders", element: <Orders /> },
              { path: "users", element: <Users /> },
              { path: "reviews", element: <Reviews /> },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  const [stripePromise, setStripePromise] = useState(null);

  const getKey = async () => {
    const key = await getSPK();
    setStripePromise(loadStripe(key?.sbk));
  };

  useEffect(() => {
    dispatch(loadUser());
    dispatch(clearErrors());
    getKey();
  }, [dispatch]);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <>
      {stripePromise && (
        <Elements stripe={stripePromise}>
          <RouterProvider router={router} />
        </Elements>
      )}
      <Toaster />
    </>
  );
}

export default App;
