const router = require('express').Router();
const user = require('./user-routes');

//  url/user/
router.use('/', user);


module.exports = router;