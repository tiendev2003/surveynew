const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Class, Department } = require("../models");
const { errorResponse, successResponse } = require("../utils/response");

exports.register = async (req, res) => {
  const { username, email, password, role, class_id } = req.body;

  try {
    // Kiểm tra trùng username
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return errorResponse(
        res,
        "Registration failed",
        "Username is already taken",
        409
      );
    }

    // Kiểm tra trùng email
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return errorResponse(
        res,
        "Registration failed",
        "Email is already registered",
        409
      );
    }

    // Tạo người dùng mới
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      username,
      email,
      password: hashedPassword,
      role,
    };

    if (role === "student") {
      userData.class_id = class_id;
    }

    const user = await User.create(userData);

    successResponse(res, "User registered successfully", {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    errorResponse(res, "Registration failed", err.message, 500);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Tìm người dùng qua email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return errorResponse(res, "Login failed", "Email does not exist", 404);
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, "Login failed", "Incorrect password", 401);
    }

    // Tạo JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    successResponse(res, "Login successful", { token: token, user: user });
  } catch (err) {
    errorResponse(res, "Login failed", err.message, 500);
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Class,
          as: "class",
          include: { model: Department, as: "department" },
        },
      ],
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    const userInfo = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      class: user.class,
    };

    successResponse(res, "User found", userInfo);
  } catch (err) {
    errorResponse(res, "Get user failed", err.message, 500);
  }
};

exports.updateUserProfile = async (req, res) => {
  const { username, email, phone, password } = req.body;

  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return errorResponse(res, "Update failed", "User not found", 404);
    }

    // Kiểm tra trùng username
    if (username && username !== user.username) {
      const existingUsername = await User.findOne({ where: { username } });
      if (existingUsername) {
        return errorResponse(
          res,
          "Update failed",
          "Username is already taken",
          409
        );
      }
    }

    // Kiểm tra trùng email
    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        return errorResponse(
          res,
          "Update failed",
          "Email is already registered",
          409
        );
      }
    }

    // Cập nhật thông tin
    if (username) user.username = username;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    successResponse(res, "User updated successfully", {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      phone,
    });
  } catch (err) {
    errorResponse(res, "Update failed", err.message, 500);
  }
};
