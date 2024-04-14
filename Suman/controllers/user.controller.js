import asyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError.js";

import User from "../models/user.model.js";

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  return res.status(200).json({
    users,
    message: "All Users data fetched successfully!!!",
    success: true,
  });
});

export const getSingleUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) return next(new ApiError(400, "UserId is required!!!"));

  const user = await User.findById(userId);

  if (!user) return next(new ApiError(404, "No User found with given UserId"));

  return res.status(200).json({
    user,
    message: "Requested User data fetched successfully!!!",
    success: true,
  });
});

export const updateUser = asyncHandler(async (req, res, next) => {
  const { userName, age, hobbies } = req.body;
  const { userId } = req.params;

  if (!userName && !age && !hobbies)
    return next(new ApiError(400, "Please enter some details to update!!!"));

  if (!userId) return next(new ApiError(400, "UserId is required!!!"));

  const user = await User.findById(userId);

  if (!user) return next(new ApiError(404, "No User found with given UserId"));

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      userName,
      age,
      hobbies,
    },
    { new: true }
  );

  if (!updateUser)
    return next(
      new ApiError(500, "Something went wrong while calling to the DataBase!!!")
    );

  return res.status(200).json({
    updatedUser,
    message: "Requested User data updated successfully!!!",
    success: true,
  });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) return next(new ApiError(400, "UserId is required!!!"));

  const user = await User.findById(userId);

  if (!user) return next(new ApiError(404, "No User found with given UserId"));

  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser)
    return next(
      new ApiError(500, "Something went wrong while calling to the DataBase!!!")
    );

  return res.status(200).json({
    deletedUser,
    message: "Requested User data deleted successfully!!!",
    success: true,
  });
});

export const createUser = asyncHandler(async (req, res, next) => {
  const { userName, age, hobbies } = req.body;

  if (!userName || !age)
    return next(
      new ApiError(400, "Please enter User-Name and Age before proceeding!!!")
    );

  const newUser = await User.create({
    userName,
    age,
    hobbies,
  });

  if (!newUser)
    return next(
      new ApiError(500, "Something went wrong while calling to the DataBase!!!")
    );

  return res.status(200).json({
    newUser,
    message: "New User created successfully!!!",
    success: true,
  });
});
