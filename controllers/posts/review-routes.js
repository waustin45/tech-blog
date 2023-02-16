const router = require('express').Router();
const { User, Post, Review } = require('../../models');

router.post('/new', async (req, res) => {
    try {
        const newReview = await Review.create({
            body: req.body.body,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        })
        res.status(200).json(newReview)
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router;