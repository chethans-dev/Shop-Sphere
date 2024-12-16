import { motion } from "framer-motion";
import "./Home.css";
import ProductCard from "../../Products/ProductCard";
import MetaData from "../MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllProducts } from "../../../store/actions/productActions";
import Loader from "../../Loader/Loader";
import toast from "react-hot-toast";
import { clearErrors } from "../../../store/reducers/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (error) {
      toast.error("Some error occured", { position: "top-right" });
      dispatch(clearErrors());
    }
    dispatch(fetchAllProducts());
  }, [dispatch, error]);
  return (
    <div className="bg-white">
      <MetaData title="Shop Sphere" />
      <div className="banner">
        <p className="font-semibold text-[5vw] md:text-[2.5vmax] mb-20 md:mb-56">
          Welcome to Shop Sphere
        </p>
        <a href="#container" className="mt-20 md:mt-52">
          <button className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="bg-white w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </button>
        </a>
      </div>
      <div className="w-full flex items-center justify-center">
        <h2
          id="container"
          className="inline-block text-center font-roboto text-[1.4vmax] border-b border-[rgba(21,21,21,0.5)] px-[1vmax] mx-auto text-[rgba(0,0,0,0.7)]"
        >
          Featured Products
        </h2>
      </div>

      <div className="container bg-white flex flex-wrap gap-4 justify-center my-[2vmax] mx-auto w-[90vw] pb-5 max-w-full">
        {loading
          ? Array.from({ length: 8 }, (_, index) => <Loader key={index} />)
          : products &&
            products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
      </div>
    </div>
  );
};

export default Home;
