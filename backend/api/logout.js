import express from "express";
import {} from 'dotenv/config'

const router = express.Router();

router.get('/logout', function (req, res, next) {
    res.set({
        'Access-Control-Allow-Origin': `${process.env.FRONTEND_URL}`,
        'Access-Control-Allow-Credentials': true
      });    
    req.logout(req.user, err => {
        if(err) return next(err);
        // res.send("Logged out");
        res.redirect(`${process.env.FRONTEND_URL}`);
    });
    
    // res.redirect(`${process.env.FRONTEND_URL}`);
});

export {router as logoutRouter};
