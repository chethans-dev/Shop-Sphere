import {
  Card,
  CardBody,
  Avatar,
  Button,
  Input,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../components/layout/MetaData";
import { updateUser } from "../store/actions/userActions";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
  });

  useEffect(() => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);
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

  // Update user
  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile) {
      toast.error("Please fill in all required fields.", {
        position: "top-right",
      });
      return;
    }
    dispatch(updateUser(formData));
    toast.success("User updated succcessfully.", {
      position: "top-right",
    });
  };

  return (
    <div className="container rounded-md bg-white flex flex-col gap-6 justify-center my-[2vmax] mx-auto w-[90vw] p-10 max-w-5xl shadow-lg">
      <MetaData title="Account" />
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
            <form className="flex flex-col gap-4" onSubmit={handleUpdateUser}>
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                name="email"
              />
              <Input
                label="Phone Number"
                type="tel"
                value={formData.mobile}
                onChange={handleInputChange}
                name="mobile"
              />
              <Button type="submit" color="black">
                Save Changes
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* Change password */}
        <Card className="w-full md:w-[48%] shadow-md">
          <CardBody>
            <h3 className="text-xl font-semibold mb-4">Change Password</h3>
            <form className="flex flex-col gap-4">
              <Input
                label="Current Password"
                type="password"
                name="currentPassword"
                required
              />
              <Input
                label="New Password"
                type="password"
                name="newPassword"
                required
              />
              <Input
                label="Confirm New Password"
                type="password"
                name="confirmPassword"
                required
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
