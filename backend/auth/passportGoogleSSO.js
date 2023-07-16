import https from 'https';
https.globalAgent.options.rejectUnauthorized = false; // To prevent InternalOAuthError

import { User } from "../schema/schema.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import {} from 'dotenv/config'

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      const defaultUser = {
        fullName: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        _id: profile.id,
      };

      const user = await User.findOneAndUpdate(
        { _id: profile.id },
        defaultUser,
        { upsert: true, new: true }
      ).catch((err) => {
        console.log("Error signing up", err);
        cb(err, null);
      });      

      if (user) {
        return cb(null, user);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  // console.log("Serializing user:", user);
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await User.findOne({ _id: id }).catch((err) => {
    // console.log("Error deserializing", err);
    cb(err, null);
  });
  
  console.log("DeSerialized user", user);

  if (user) cb(null, user);
});
