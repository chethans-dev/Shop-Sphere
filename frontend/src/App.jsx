import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Root from "./pages/Root";
// import Products from "./pages/Products";
import ErrorPage from "./pages/ErrorPage";
import Home from "./components/layout/Home/Home";
import ProductDetails from "./components/layout/Products/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      //   { path: "products", element: <Products /> },
      { path: "product/:id", element: <ProductDetails /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
