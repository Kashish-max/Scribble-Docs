import express from "express";
import passport from "passport";
import {} from 'dotenv/config'

const router = express.Router();

const successLoginUrl = `${process.env.FRONTEND_URL}/login/success`;
const errorLoginUrl = `${process.env.FRONTEND_URL}/login/error`;


router.get(
  "/login/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt : "select_account"
  })
);

router.get(
  "/autologin/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureMessage: "Cannot login to Google, please try again later!",
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,
  }),
  (req, res) => {
    console.log("User: ", req.user);
    res.send("Thank you for signing in");
  }
);

export {router as loginWithGoogleRouter};
