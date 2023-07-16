import express from "express";
import { registerRouter } from "./register.js";
import { loginRouter } from "./login.js";
import { loginWithGoogleRouter } from "./loginWithGoogle.js";
import { userRouter } from "./user.js";
import { docUsersRouter } from "./doc-users.js";
import { validateDocRouter } from "./doc-validate.js";
import { userDocsRouter } from "./user-docs.js";
import { logoutRouter } from "./logout.js";

const router = express.Router();

router.use(registerRouter);
router.use(loginRouter);
router.use(loginWithGoogleRouter);
router.use(userRouter);
router.use(docUsersRouter);
router.use(validateDocRouter);
router.use(userDocsRouter);
router.use(logoutRouter);

export default router;
