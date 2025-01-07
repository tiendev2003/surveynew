require("dotenv").config(); // Đọc biến môi trường từ file .env
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const sequelize = require("./config/db");
const authRoutes = require("./routes/auth");
 
const app = express();

// Middleware CORS
app.use(
  cors({
    origin: "*", // Chỉ định domain cho client
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware Morgan (log request)
app.use(morgan("dev")); // Sử dụng chế độ log chi tiết

// Middleware để parse JSON body
app.use(express.json());

// Middleware để parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/departments", require("./routes/department"));
app.use("/api/users", require("./routes/user"));
app.use("/api/surveys",  require("./routes/survey"));
app.use("/api/classes", require("./routes/class"));
app.use("/api/questions", require("./routes/question"));
app.use("/api/topics", require("./routes/surveyType"));
app.use((err, req, res, next) => {
  console.error("Internal server error:", err.stack); // Ghi log lỗi
  errorResponse(res, "Internal server error", err.message, 500); // Trả về lỗi chuẩn hóa
});

const PORT = process.env.PORT || 3000;
sequelize
  .sync()
  .then(() => {

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

