const express = require("express");
const router = new express.Router();
const db = require("../db");
// const { router } = require("../app");
const { SECRET_KEY } = require("../config");
const { register } = require("../models/user");
const { hash } = require("bcrypt");


/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

router.post('/login', async function login(req, res, next){
    try {
        const {username, password} = req.body;
        const result = await db.query(`SELECT password FROM USERS WHERE username = $1`, [username]);
        let user = result.rows[0];

        if(user) {
            if(await bcrypt.compare(password, user.password) === true) {
                let token = jwt.sign({username}, SECRET_KEY);
                return res.json({token});
            }
            throw new ExpressError("Invalid user/password", 400);
        }
    }
    catch(err) {
        return next(err);
    }
});


/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */


 router.post('/register', async function register(req, res, next) {
    try {
        const {username, password, first_name, last_name, phone} = req.body;
        let user = await User.register(username, password, first_name, last_name,phone);
        //assign token
        const token = jwt.sign({username: user.username}, SECRET_KEY);
        return res.json({message: "You have successfully logged in", token: token});
    }
    catch(err){
        return next(err);
    }
 });



module.exports = router;