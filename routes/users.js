const express = require("express");
const { user } = require("../db");
const { ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth");
const router = new express.Router();
// const { router } = require("../app");
const User = require("../models/user")


/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/


router.get('/', ensureLoggedIn, async function getAllUsers(req, res, next){
// router.get('/', async function getAllUsers(req, res, next){
    try{
        const results = await User.all();
        return res.json({results});
    }
    catch(err) {
        return next(err);
    }
});

/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/

router.get('/:username', ensureCorrectUser, async function getUserByUsername(req, res, next){
    try{
        let username = req.params.username;
        const result = await User.get(username);
        return res.json({user});      
    }
    catch(err){
        next(err);
    }
});



/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get('/:username/to', async function getMessagesToUser(req, res, next){
    try{
        let username = req.params.username;
        const messages = await User.messagesTo(username);
        return res.json({messages});
    }
    catch(err){
        next(err)
    }
})



/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get('/:username/from', ensureCorrectUser, async function getMessagesFromUser(req, res, next){
    try{
        let username = req.params.username;
        const messages = await User.messagesFrom(username);
        return res.json({messages});
    }
  
})


module.exports = router;