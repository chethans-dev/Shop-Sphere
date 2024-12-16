/* eslint-disable react/prop-types */
import {
  Card,
  CardBody,
  Typography,
  CardHeader,
} from "@material-tailwind/react";
import ReactStars from "react-rating-stars-component";

function TestimonialCard({ name, comment, rating }) {
  const options = {
    edit: false,
    activeColor: "gold",
    value: rating,
    isHalf: true,
  };
  return (
    <Card shadow={false} className="bg-gray-100/50 rounded-2xl p-6">
      <CardHeader color="transparent" floated={false} shadow={false}>
        <Typography
          color="blue-gray"
          className="lg:mb-20 mb-4 text-2xl font-bold"
        >
          &quot;{comment}&quot;
        </Typography>
      </CardHeader>
      <CardBody className="px-4 py-0 flex flex-wrap-reverse gap-x-6 justify-between items-center">
        <div>
          <Typography variant="h6" color="blue-gray">
            {name}
          </Typography>
          <Typography
            variant="paragraph"
            className="font-normal !text-gray-500"
          >
            <ReactStars {...options} />
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
}


function Testimonials({ testimonials = [] }) {
  return (
    <section className="px-8 py-10 lg:py-28">
      <div className="container mx-auto">
        {testimonials && testimonials.length > 0 ? (
          <>
            <Typography
              variant="h2"
              color="blue-gray"
              className="mb-4 !text-2xl lg:!text-4xl"
            >
              The heartfelt testimonials of our customers
            </Typography>
            <Typography
              variant="lead"
              className="max-w-3xl !text-gray-500 mb-10 lg:mb-20"
            >
              From life-enhancing gadgets to unparalleled customer support, and
              transformative learning opportunities.
            </Typography>
            <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
              {testimonials.map((props) => (
                <TestimonialCard key={props?._id} {...props} />
              ))}
            </div>{" "}
          </>
        ) : (
          <Typography
            variant="h2"
            color="blue-gray"
            className="mb-4 !text-2xl lg:!text-4xl flex items-center justify-center"
          >
            No reviews yet!!
          </Typography>
        )}
      </div>
    </section>
  );
}

export default Testimonials;
