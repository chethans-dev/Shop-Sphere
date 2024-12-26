import axios from "axios";

export const getSPK = async () => {
  const { data } = await axios.get("/api/v1/payment/pub");
  return data
};
