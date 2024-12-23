import { Button, Card, CardBody, Input } from "@material-tailwind/react";
import MetaData from "../components/layout/MetaData";
import Logo from "../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../store/actions/userActions";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
const ResetPasswordPage = () => {
  const { token } = useParams();

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/account");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());
    const resultAction = dispatch(resetPassword({ token, payload }));
    if (resetPassword.fulfilled.match(resultAction)) {
      navigate("/login");
    }
  };
  return (
    <div>
      <div className="h-auto min-h-[70vh] rounded-md bg-white flex flex-col gap-6 justify-center my-[2vmax] mx-auto w-[90vw] p-10 max-w-5xl shadow-lg">
        <MetaData title="Reset Password" />
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Personal Information */}
          <img className="mx-auto h-12 w-auto " src={Logo} alt="Logo" />
          <Card className="w-full md:w-[48%] sm:w-[60%] shadow-md">
            <CardBody>
              <h3 className="text-xl font-semibold mb-4">Enter password</h3>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <Input
                  label="New Password"
                  name="password"
                  type="password"
                  required
                />
                <Input
                  label="Consirm Password"
                  name="confirmPassword"
                  type="password"
                  required
                />
                <Button type="submit" color="black">
                  {loading ? "Resetting..." : "Reset"}
                </Button>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
