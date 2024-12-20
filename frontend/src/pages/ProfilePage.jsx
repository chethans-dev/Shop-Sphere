import {
  Card,
  CardBody,
  Avatar,
  Button,
  Input,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.user);
  // Function to get the year
  function getYear(isoDate) {
    const date = new Date(isoDate);
    return date.getFullYear();
  }

  // Function to get the month name
  function getMonthName(isoDate) {
    const date = new Date(isoDate);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[date.getMonth()];
  }
  return (
    <div className="container rounded-md bg-white flex flex-col gap-6 justify-center my-[2vmax] mx-auto w-[90vw] p-10 max-w-5xl shadow-lg">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center">
          <Avatar
            src={user?.avatar?.url}
            alt="User Avatar"
            size="xl"
            className="border-2 border-gray-300"
          />
          <Button color="black" size="sm" className="mt-3">
            Change Avatar
          </Button>
        </div>

        {/* User Info */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">
            {user?.name || ""}
          </h2>
          <p className="text-gray-600">{user?.email || ""}</p>
          <p className="text-gray-600 mt-1">
            Member since {getMonthName(user?.createdAt || "")}{" "}
            {getYear(user?.createdAt || "")}
          </p>
        </div>
      </div>

      {/* Account Sections */}
      <div className="flex flex-wrap gap-6">
        {/* Personal Information */}
        <Card className="w-full md:w-[48%] shadow-md">
          <CardBody>
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
            <form className="flex flex-col gap-4">
              <Input
                label="Full Name"
                defaultValue="John Doe"
                value={user?.name || ""}
              />
              <Input
                label="Email Address"
                type="email"
                defaultValue="johndoe@example.com"
                value={user?.email || ""}
              />
              <Input
                label="Phone Number"
                type="tel"
                defaultValue="+1234567890"
                value={user?.mobile || ""}
              />
              <Button color="black">Save Changes</Button>
            </form>
          </CardBody>
        </Card>

        {/* Manage Orders */}
        <Card className="w-full md:w-[48%] shadow-md">
          <CardBody>
            <h3 className="text-xl font-semibold mb-4">Manage Orders</h3>
            <p className="text-gray-700">View and manage your order history.</p>
            <Link to="/orders">
              <Button color="black" className="mt-4">
                View Orders
              </Button>
            </Link>
          </CardBody>
        </Card>

        {/* Address Section */}
        <Card className="w-full md:w-[48%] shadow-md">
          <CardBody>
            <h3 className="text-xl font-semibold mb-4">Saved Addresses</h3>
            <p className="text-gray-700">
              Manage your shipping and billing addresses.
            </p>
            <Button color="black" className="mt-4">
              Manage Addresses
            </Button>
          </CardBody>
        </Card>

        {/* Payment Methods */}
        <Card className="w-full md:w-[48%] shadow-md">
          <CardBody>
            <h3 className="text-xl font-semibold mb-4">Payment Methods</h3>
            <p className="text-gray-700">Update your saved payment methods.</p>
            <Button color="black" className="mt-4">
              Manage Payments
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
