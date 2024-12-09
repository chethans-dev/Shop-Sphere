import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Header/Navbar";
import Footer from "../components/layout/Footer/Footer";

const Root = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Root;
