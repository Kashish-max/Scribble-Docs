import express from "express";
import { isUserAuthenticated } from "../middlewares.js";

const router = express.Router();

router.get("/auth/user", isUserAuthenticated, (req, res) => {
  res.json(req.user);
});

export { router as userRouter };
