import express from "express";

const router = express.Router();

router.get('/logout', function (req, res, next) {
    res.set({
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': true
      });    
    req.logout(req.user, err => {
        if(err) return next(err);
        // res.send("Logged out");
        res.redirect("http://localhost:3000/");
    });
    
    // res.redirect('http://localhost:3000/');
});

export {router as logoutRouter};
