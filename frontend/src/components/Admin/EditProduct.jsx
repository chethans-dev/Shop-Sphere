import { useEffect, useState } from "react";
import {
  Input,
  Textarea,
  Button,
  Select,
  Option,
  Avatar,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { editProduct } from "../../store/actions/adminActions";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails } from "../../store/actions/productActions";

const EditProduct = () => {
  const { id } = useParams();

  const { loading } = useSelector((state) => state.admin);
  const { product } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(product);

  useEffect(() => {
    setProductData(product);
  }, [product]);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  const categories = [
    "Shoes",
    "Clothing",
    "Accessories",
    "Electronics",
    "Furniture",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(editProduct({ id, product: productData }));
    navigate("/admin/products");
  };

  return (
    <div className="rounded-md bg-white text-black flex flex-col gap-6 justify-center my-[2vmax] w-[90vw] max-w-5xl shadow-lg p-10 custom-scrollbar overflow-y-auto">
      <h1 className="text-2xl font-bold">Edit Product</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Product Name */}
        <Input
          type="text"
          label="Product Name"
          name="name"
          value={productData.name}
          onChange={handleChange}
          required
        />

        {/* Product Description */}
        <Textarea
          label="Product Description"
          name="description"
          value={productData.description}
          onChange={handleChange}
          required
        />

        {/* Product Price */}
        <Input
          type="number"
          label="Product Price"
          name="price"
          value={productData.price}
          onChange={handleChange}
          required
        />

        {/* Product Category */}
        <Select
          label="Category"
          onChange={(value) =>
            setProductData((prev) => ({ ...prev, category: value }))
          }
          value={productData?.category}
        >
          {categories.map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>

        {/* Stock */}
        <Input
          type="number"
          label="Stock Quantity"
          name="stock"
          value={productData.stock}
          onChange={handleChange}
          required
        />

        {/* Product Images */}
        {productData?.images && productData.images.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-4">
            {productData.images.map((image, index) => (
              <Avatar
                key={index}
                src={image.url}
                alt="User Avatar"
                size="xl"
                className="border-2 border-gray-300"
              />
            ))}
          </div>
        )}

        {/* Submit Button */}
        <Button type="submit" ripple>
          {loading ? "Updating Product..." : "Update Product"}
        </Button>
      </form>
    </div>
  );
};

export default EditProduct;
