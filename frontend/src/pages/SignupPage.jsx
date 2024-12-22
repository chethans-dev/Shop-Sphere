import { Form, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../assets/images/logo.png";
import Input from "../components/@/Input";
import FormButton from "../components/@/FormButton";
import Password from "../components/@/Password";
import MetaData from "../components/layout/MetaData";
import { useEffect, useState } from "react";
import { signupUser } from "../store/actions/userActions";
import toast from "react-hot-toast";

const SignupPage = () => {
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ! PENDING_
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-right" });
    }

    if (isAuthenticated) {
      navigate("/account");
    }
  }, [error, dispatch, isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    dispatch(signupUser(data));
  };

  const handleAvatarChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) setAvatarPreview(reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const [avatarPreview, setAvatarPreview] = useState("/images/Profile.png");

  return (
    <div className="flex items-center justify-center h-auto min-h-[90vh] px-4 sm:px-6 lg:px-8 ">
      <MetaData title="Register" />
      <div className="w-full max-w-md space-y-8 bg-white shadow-md rounded-lg p-6 sm:p-8">
        <div>
          <img className="mx-auto h-12 w-auto" src={Logo} alt="logo" />
        </div>

        <Form
          className="mt-8 space-y-6"
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <Input labelName="Name" type="text" />
          <Input labelName="Mobile number" type="tel" />
          <Input labelName="Email address" type="email" />
          <Password showForgotPassword={false} />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your avatar
              </label>
              <div className="mt-2">
                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleAvatarChange}
                />
              </div>
            </div>
            <img
              src={avatarPreview}
              className="w-16 h-16 mx-auto sm:mx-0 rounded-full border border-gray-300"
              alt="Avatar Preview"
            />
          </div>
          <FormButton
            title={loading ? "Registering..." : "Register"}
            disabled={loading}
          />
        </Form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?&nbsp;
          <Link to="/login" className="font-medium text-black hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
