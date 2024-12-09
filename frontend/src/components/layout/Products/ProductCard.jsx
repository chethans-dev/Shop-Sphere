/* eslint-disable react/prop-types */
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";


export default function ProductCard({ product, ...rest }) {
  const options = {
    edit: false,
    activeColor: "gold",
    value: product?.ratings,
    isHalf: true,
  };
  return (
    <Link to={`/product/${product._id}`}>
      <Card className="w-96" {...rest}>
        <CardHeader shadow={false} floated={false} className="h-96">
          <img
            src={product?.images[0]?.url}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
              {product?.name}
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              ${product?.price}
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >
            {product.description}
          </Typography>
          <div className="flex items-start gap-2">
            <ReactStars {...options} />{" "}
            <Typography
              variant="small"
              color="black"
              className="font-normal opacity-75"
            >
              ({product?.numOfReviews} reviews)
            </Typography>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            ripple={false}
            fullWidth={true}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
