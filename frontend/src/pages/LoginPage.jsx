import { Form, Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import Input from "../components/@/Input";
import FormButton from "../components/@/FormButton";
import Password from "../components/@/Password";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white shadow-md rounded-lg p-6">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src={Logo}
            alt="logo"
          />
         
        </div>

        <Form className="mt-8 space-y-6" method="post">
          <Input labelName="Email address" type="email" />
          <Password showForgotPassword={false} />
          <FormButton title="Sign in" />
        </Form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?&nbsp;
          <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            Create a new account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
