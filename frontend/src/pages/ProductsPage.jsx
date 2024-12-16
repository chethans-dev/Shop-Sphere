import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { fetchAllProducts } from "../store/actions/productActions";
import Loader from "../components/Loader/Loader";
import { clearErrors } from "../store/reducers/productSlice";
import ProductCard from "../components/Products/ProductCard";
import Filters from "../components/Products/Filters";
import MetaData from "../components/layout/MetaData";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { products, loading, error, productsCount } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    // Extract the search query from the URL
    const searchQuery = new URLSearchParams(location.search);
    if (error) {
      toast.error("Some error occurred", { position: "top-right" });
      dispatch(clearErrors());
    }

    // Fetch products based on search query
    const keyword = searchQuery.get("keyword") || "";
    const page = searchQuery.get("page") || currentPage;
    const category = searchQuery.get("category") || "";
    const min = searchQuery.get("min") || 0;
    const max = searchQuery.get("max") || 30000;
    const ratings = searchQuery.get("ratings") || 0;

    const query = { page };
    if (keyword) query["keyword"] = keyword;
    if (category) query["category"] = category;
    if (min) query["price[gt]"] = min;
    if (max) query["price[lt]"] = max;
    if (ratings) query["ratings[gte]"] = ratings;
    dispatch(fetchAllProducts(query));
  }, [dispatch, error, location.search, currentPage]);

  // Page size 10
  const totalPages = Math.ceil(productsCount / 10);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
    let path = `?page=${selected + 1}`;
    const keyword = new URLSearchParams(location.search).get("keyword");
    if (keyword) path += `&keyword=${keyword}`;
    navigate(path);
  };

  return (
    <div>
      <MetaData title="Products" />
      <Filters />
      <div className="container rounded-md bg-white flex flex-wrap gap-4 justify-center my-[2vmax] mx-auto w-[90vw] p-10 max-w-full">
        {loading
          ? Array.from({ length: 8 }, (_, index) => <Loader key={index} />)
          : products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
        {products.length === 0 && <>No products found!!</>}
      </div>
      <div className="bottom-0 py-4 flex justify-center items-center shadow-md">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={totalPages}
          onPageChange={handlePageChange}
          containerClassName={"flex gap-2 items-center text-sm font-medium"}
          pageClassName={
            "w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 cursor-pointer hover:bg-gray-100"
          }
          pageLinkClassName={"text-gray-700"}
          previousClassName={
            "w-20 h-8 flex items-center justify-center rounded-md border border-gray-300 cursor-pointer hover:bg-gray-100"
          }
          previousLinkClassName={"text-gray-700"}
          nextClassName={
            "w-20 h-8 flex items-center justify-center rounded-md border border-gray-300 cursor-pointer hover:bg-gray-100"
          }
          nextLinkClassName={"text-gray-700"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
          activeClassName={"bg-white text-white border-blue-500"}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
