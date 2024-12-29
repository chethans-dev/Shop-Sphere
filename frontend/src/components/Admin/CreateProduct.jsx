import { useState } from "react";
import {
  Input,
  Textarea,
  Button,
  Select,
  Option,
  Avatar,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../store/actions/adminActions";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";

const CreateProduct = () => {
  const { loading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    // Preview the uploaded images
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("category", productData.category);
    formData.append("stock", productData.stock);

    images.forEach((image) => {
      formData.append("images", image);
    });
    
    await dispatch(createProduct(formData));
    navigate("/admin/dashboard");
  };

  return (
    <div className="rounded-md bg-white text-black flex flex-col gap-6 justify-center my-[2vmax] w-[50vw] max-w-5xl shadow-lg p-10 custom-scrollbar overflow-y-auto">
      <MetaData title="Create Product - Admin" />
      <h1 className="text-2xl font-bold">New Product</h1>

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
        <Input
          type="file"
          label="Upload Product Images"
          multiple
          onChange={handleImageUpload}
          accept="image/*"
          required
        />

        {imagePreviews.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-4">
            {imagePreviews.map((preview, index) => (
              <Avatar
                key={index}
                src={preview}
                alt="User Avatar"
                size="xl"
                className="border-2 border-gray-300"
              />
            ))}
          </div>
        )}

        {/* Submit Button */}
        <Button type="submit" ripple>
          {loading ? "Creating Product..." : "Create Product"}
        </Button>
      </form>
    </div>
  );
};

export default CreateProduct;
