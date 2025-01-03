import fs from "fs";
import express from "express";
import path from "path";
import { serve, setup } from "swagger-ui-express";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import products from "./routes/productsRoutes.js";
import users from "./routes/userRoutes.js";
import orders from "./routes/orderRoutes.js";
import payment from "./routes/paymentRoutes.js";
import { globalErrorHandler } from "./middlewares/error.js";
import { config } from "dotenv";

config({ path: "backend/config/config.env" });

const __dirname = path.resolve();


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(morgan("dev"));

app.use("/api/v1/products", products);
app.use("/api/v1/users", users);
app.use("/api/v1/orders", orders);
app.use("/api/v1/payment", payment);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.use(globalErrorHandler);

export default app;
