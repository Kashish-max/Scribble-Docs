import { User } from "../schema/schema.js";
import passport from "passport";
import passportJwt from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
const StrategyJwt = passportJwt.Strategy;

import {} from 'dotenv/config'

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    function (jwtPayload, done) {
      return User.findOne({ _id: jwtPayload.id })
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);

export default passport;