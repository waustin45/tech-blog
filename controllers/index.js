const router = require('express').Router();
const users = require('./users');
const posts = require('./posts');
const home = require('./home-routes');
//  url/user
router.use('/user', users);
// url/post
router.use('/post', posts);
//  url/
router.use("/", home)
module.exports = router;