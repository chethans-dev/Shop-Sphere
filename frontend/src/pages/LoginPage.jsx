import { Form, Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import Input from "../components/@/Input";
import FormButton from "../components/@/FormButton";
import Password from "../components/@/Password";
import MetaData from "../components/layout/MetaData";

const LoginPage = () => {
  const handleSubmit = () => {};
  return (
    <div className="flex items-center justify-center h-[80vh] px-4 sm:px-6 lg:px-8">
      <MetaData title="Login" />
      <div className="w-full max-w-md space-y-8 bg-white shadow-md rounded-lg p-6">
        <div>
          <img className="mx-auto h-12 w-auto" src={Logo} alt="logo" />
        </div>

        <Form className="mt-8 space-y-6" method="post" onSubmit={handleSubmit}>
          <Input labelName="Email address" type="email" />
          <Password showForgotPassword={true} />
          <div>
            <img></img>
          </div>
          <FormButton title="Sign in" />
        </Form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?&nbsp;
          <Link to="/signup" className="font-medium text-black">
            Create a new account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
