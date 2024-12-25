import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import Home from "./components/layout/Home/Home";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/LoginPage";
import ProductDetails from "./components/Products/ProductDetails";
import SignupPage from "./pages/SignupPage";
import { useEffect } from "react";
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
      {
        path: "orders",
        element: <ProtectedRoute />,
        children: [{ index: true, element: <OrdersPage /> }],
      },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "reset-password/:token", element: <ResetPasswordPage /> },
      { path: "cart", element: <CartPage /> },
      {
        path: "shipping",
        element: <ProtectedRoute/>,
        children:[{index: true, element: <ShippingPage/>}]
      },
      {
        path: "order/confirm",
        element: <ProtectedRoute/>,
        children:[{index: true, element: <ConfirmOrder/>}]
      }
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    dispatch(clearErrors());
  }, [dispatch]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
