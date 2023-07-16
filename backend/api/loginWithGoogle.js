import express from "express";
import passport from "passport";

const router = express.Router();

const successLoginUrl = "http://localhost:3000/login/success";
const errorLoginUrl = "http://localhost:3000/login/error";


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
