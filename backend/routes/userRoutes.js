// routes/userRoutes.js

import express from "express";
import { signupUser } from "../controller/signUpController.js";
import { loginUser } from "../controller/logInController.js";
import {
  manageUsers,
  deleteUser,
  promoteUserToAdmin,
  promoteUserToEmployee,
} from "../controller/adminController.js";

const router = express.Router();

// Define the signup route
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/manage", manageUsers);
router.delete("/manage/:id", deleteUser);
// Route to promote a user to admin by ID
router.patch("/manage/admin/:id", promoteUserToAdmin);

// Route to promote a user to employee by ID
router.patch("/manage/employee/:id", promoteUserToEmployee);

export default router;
