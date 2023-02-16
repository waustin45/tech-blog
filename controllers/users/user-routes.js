const router = require('express').Router();
const { User, Post, Review } = require('../../models');

router.get('/',  async (req, res) => {
    try {
        res.render('login')
    }catch (err) {
        res.status(400).json(err);
      }
})
// create user
router.post('/create', async (req, res) => {
  try {
    const userData = await User.create({
        user_name: req.body.user_name,
        password: req.body.password
    });
    console.log(userData)
    req.session.save(() => {
      req.session.user_name = userData.user_name
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
// login user
// url/user/login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { user_name: req.body.user_name } });

    if (!userData) {
      res
        .status(401)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(402)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_name = userData.user_name
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;