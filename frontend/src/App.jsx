import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
// import Products from "./pages/Products";
// import ProductDetailPage from "./pages/ProductDetailPage";
import ErrorPage from "./pages/ErrorPage";
import Home from "./components/layout/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
    //   { path: "products", element: <Products /> },
    //   { path: "products/:id", element: <ProductDetailPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
