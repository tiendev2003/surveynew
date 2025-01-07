const { User, Department, Class } = require("../models");
const { errorResponse, successResponse } = require("../utils/response");
const bcrypt = require('bcryptjs');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    successResponse(res, "User all", users);
  } catch (error) {
    errorResponse(res, "Failed to create survey", error.message, 500);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Class,
          as: "class",
 
        },
      ],
    });
    if (!user) {
      return errorResponse(res, "User not found", null, 404);
    }
    successResponse(res, "User detail", user);
  } catch (error) {
    errorResponse(res, "Failed to get user detail", error.message, 500);
  }
};

exports.addMultipleUsers = async (req, res) => {
  try {
    const users = req.body.users;

    // Validate user data
    for (const user of users) {
      console.log(user);

      if (!user.username || !user.email || !user.password) {
        return errorResponse(res, "Invalid user data format", null, 400);
      }
    }

    // Hash passwords before saving users
    for (const user of users) {
      user.password = await bcrypt.hash(user.password.toString(), 10);
    }

    // Check if users already exist and ignore duplicates
    const createdUsers = await User.bulkCreate(users, { ignoreDuplicates: true });
    successResponse(res, "Users added successfully", createdUsers);
  } catch (error) {
    console.log(error);
    errorResponse(res, "Failed to add users", error.message, 500);
  }
};
