import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { Country, State } from "country-state-city";
import { saveShippingInfo } from "../store/reducers/cartSlice.js";
import toast from "react-hot-toast";
import MetaData from "../components/layout/MetaData.jsx";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/Cart/CheckoutSteps.jsx";

const ShippingPage = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo?.address);
  const [city, setCity] = useState(shippingInfo?.city);
  const [state, setState] = useState(shippingInfo?.state);
  const [zip, setZip] = useState(shippingInfo?.zip);
  const [country, setCountry] = useState(shippingInfo?.country);
  const [phone, setPhone] = useState(shippingInfo?.phone);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const shippingData = {
      address,
      city,
      state,
      zip,
      country,
      phone,
    };
    dispatch(saveShippingInfo(shippingData));
    navigate("/order/confirm");
  };

  useEffect(() => {
    if (cartItems && cartItems.length === 0) {
      navigate("/products");
    }
  }, [cartItems]);

  return (
    <div className="rounded-md bg-white flex flex-col gap-6 justify-center my-[2vmax] mx-auto w-[90vw] p-10 max-w-5xl shadow-lg">
      <MetaData title="Shipping Details" />
      <CheckoutSteps activeStep={0} />
      <div className="flex items-center justify-center">
        <Card className="w-full md:w-[48%] shadow-md">
          <CardBody>
            <h3 className="text-xl font-semibold mb-4">Shipping Details</h3>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <Input
                label="Address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <Input
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                name="city"
                required
              />
              <Input
                label="Zip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                name="zip"
                required
                type="number"
              />
              <Select
                label="Country"
                value={country}
                onChange={(value) => setCountry(value)}
              >
                {Country.getAllCountries().map((country) => (
                  <Option key={country.isoCode} value={country.isoCode}>
                    {country?.name}
                  </Option>
                ))}
              </Select>
              <Select
                required
                label="State"
                value={state}
                onChange={(value) => setState(value)}
              >
                {State.getStatesOfCountry(country).map((state) => (
                  <Option key={state.isoCode} value={state.isoCode}>
                    {state?.name}
                  </Option>
                ))}
              </Select>
              <Input
                label="Phone Number"
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                name="phone"
                required
              />
              <Button
                type="submit"
                color="black"
                disabled={
                  !state || !country || !zip || !city || !phone || !address
                }
              >
                {!state || !country || !zip || !city || !phone || !address
                  ? "Please enter all details"
                  : "Continue"}
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
  ƒ;
};

export default ShippingPage;
