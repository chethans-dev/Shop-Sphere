import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Root from "./pages/Root";
// import Products from "./pages/Products";
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
      { path: "account", element: <ProfilePage /> },
      { path: "orders", element: <OrdersPage /> },
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
