const router = require('express').Router();
const { User, Post, Review } = require('../../models');

router.post('/create', async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            body: req.body.body,
            date_created: req.body.date_created,
            author: req.session.user_name,
            user_id: req.session.user_id
        })
        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
      }
})
router.get('/:id', async (req, res) => {
    try {
        const viewPost = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Review,

                },
                
            ],
        })
        const postData = viewPost.get({ plain: true });
        console.log(postData)
        res.render('singlePost', { postData, logged_in: req.session.logged_in, name_user: req.session.user_name, id_user: req.session.user_id })
    } catch (err) {
        res.status(500).json(err);
      }
})

module.exports = router;