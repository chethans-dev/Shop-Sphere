import { Button, Card, CardBody, Input } from "@material-tailwind/react";
import MetaData from "../components/layout/MetaData";
import { useState } from "react";
import Logo from "../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../store/actions/userActions";
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };
  return (
    <div>
      <div className="h-auto min-h-[70vh] rounded-md bg-white flex flex-col gap-6 justify-center my-[2vmax] mx-auto w-[90vw] p-10 max-w-5xl shadow-lg">
        <MetaData title="Forgot Password" />
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Personal Information */}
          <img className="mx-auto h-12 w-auto " src={Logo} alt="Logo" />
          <Card className="w-full md:w-[48%] sm:w-[60%] shadow-md">
            <CardBody>
              <h3 className="text-xl font-semibold mb-4">Enter your mail</h3>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <Input
                  label="Email"
                  name="name"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" color="black">
                  {loading ? "Sending..." : "Send reset link"}
                </Button>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
