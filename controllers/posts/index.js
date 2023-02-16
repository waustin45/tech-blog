const router = require('express').Router();
const reviews = require('./review-routes');
const post = require('./post-routes');
//  url/post/reviews
router.use('/reviews', reviews);
// url/post/posts
router.use('/posts', post);

module.exports = router;