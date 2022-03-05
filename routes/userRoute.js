const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const {
  loginRules,
  registerRules,
  validate,
} = require('../middaleware/Valitator');
const carModel = require('../models/carModel');

router.post('/register', registerRules(), validate, async (req, res) => {
  const { firstName, lastName, email, password, mobile } = req.body;

  //simple validation:
  if (!firstName || !lastName || !password || !email || !mobile) {
    return res.status(400).json({ msg: 'please put all fields' });
  }
  //check user exist:
  let user = await User.findOne({ email });
  if (user) {
    res.status(400).send({ msg: 'user already exist' });
  }
  user = new User({ firstName, lastName, email, password, mobile });

  try {
    await user.save();
    res.send('User Registered successfully');
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post('/login', loginRules(), validate, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.find({ email, password });

    if (user.length > 0) {
      const currentUser = {
        firstName: user[0].firstName,
        lastName: user[0].lastName,
        email: user[0].email,
        mobile: user[0].mobile,
        isAdmin: user[0].isAdmin,
        _id: user[0]._id,
      };
      res.send(currentUser);
    } else {
      return res.status(400).json({ message: 'User Login Failed' });
    }
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong' });
  }
});

router.get('/getallusers', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
