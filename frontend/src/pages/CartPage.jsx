import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {removeFromCart, updateQuantity} from "../store/reducers/cartSlice.js";
import MetaData from "../components/layout/MetaData.jsx";

const ShoppingCart = () => {
  const { cartItems, subTotalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdateQuantity = (id, change) => {
    const existingItem = cartItems.find((item) => item.id === id);
    if (existingItem) {
      const newQuantity = existingItem.quantity + change;
      if(newQuantity > existingItem.stock) return;
      if (newQuantity <= 0) {
        dispatch(removeFromCart(id));
      } else {
        dispatch(updateQuantity({id, quantity: newQuantity}));
      }
    }
  };

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    navigate("/login?redirect=/shipping");
  }

  return (
    <div className="rounded-md bg-white flex flex-col gap-6 justify-center my-40 mx-auto w-[90vw] p-10 max-w-5xl shadow-lg">
      <MetaData title="Cart" />
      <div className="p-6 space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-200 last:border-0 last:pb-0"
          >
            <div className="w-full sm:w-24 h-24 overflow-hidden rounded-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                ${item.price.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdateQuantity(item.id, -1)}
                  className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-black rounded"
                  aria-label="Decrease quantity"
                >
                  <FiMinus />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(item.id, 1)}
                  className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-black rounded"
                  aria-label="Increase quantity"
                >
                  <FiPlus />
                </button>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="p-2 text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                aria-label="Remove item"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
        {cartItems && cartItems.length === 0 && <h2 className="text-lg font-medium text-gray-900">No items</h2>}
      </div>
      <div className="bg-gray-50 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-gray-900">
            <span className="text-lg">Total:</span>
            <span className="text-2xl font-bold ml-2">
              ${subTotalPrice?.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {cartItems && cartItems.length > 0 && <button
                className="w-full sm:w-auto bg-black text-white px-6 py-3 rounded-md font-medium focus:ring-black focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
                aria-label="Proceed to checkout"
                onClick={handleCheckout}
            >
              Checkout
            </button>}
            <Link
              className="w-full sm:w-auto bg-gray-200 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              aria-label="Continue shopping"
              to="/products"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
