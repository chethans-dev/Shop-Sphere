import { useDispatch, useSelector } from "react-redux";
import {Form, Link, useLocation, useNavigate} from "react-router-dom";
import Logo from "../assets/images/logo.png";
import Input from "../components/@/Input";
import FormButton from "../components/@/FormButton";
import Password from "../components/@/Password";
import MetaData from "../components/layout/MetaData";
import { loginUser } from "../store/actions/userActions";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { clearErrors } from "../store/reducers/userSlice";

const LoginPage = () => {
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location?.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-right" });
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, isAuthenticated, navigate, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    dispatch(loginUser(data));
  };

  return (
    <div className="flex items-center justify-center h-auto min-h-[80vh] px-4 sm:px-6 lg:px-8">
      <MetaData title="Login" />
      <div className="w-full max-w-md space-y-8 bg-white shadow-md rounded-lg p-6 sm:p-8">
        <div>
          <img className="mx-auto h-12 w-auto" src={Logo} alt="Logo" />
        </div>

        <Form className="mt-8 space-y-6" method="post" onSubmit={handleSubmit}>
          <Input labelName="Email address" type="email" />
          <Password showForgotPassword={true} />
          <FormButton
            title={loading ? "Signing in..." : "Sign in"}
            disabled={loading}
          />
        </Form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?&nbsp;
          <Link to="/signup" className="font-medium text-black hover:underline">
            Create a new account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
