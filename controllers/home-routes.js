const router = require('express').Router();
const { User, Post, Review } = require('../models');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [
                {
                  model: User,
                  attributes: ['user_name'],
                },
              ],
        })
        const postData = posts.map((info) => info.get({ plain: true }));
        console.log(postData);
        res.render('homepage', { postData, logged_in: req.session.logged_in})
    } catch (err) {
        res.status(500).json(err)
    } 
    
})
router.get('/dashboard', async (req, res) => {
    try {
        const posts = await Post.findAll({ where : { user_id: req.session.user_id }})
        const postData = posts.map((info) => info.get({ plain: true }));
        console.log(postData);
        res.render('dashboard', { postData, logged_in: req.session.logged_in, name_user: req.session.user_name, id_user: req.session.user_id})
    } catch (err) {
        res.status(500).json(err)
    } 
    
})


module.exports = router;