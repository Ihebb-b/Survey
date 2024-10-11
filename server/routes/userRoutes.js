const express = require('express');
const router = express.Router();
const { protect } = require('../middelware/authMiddelware');

const {
    authUser,
    register,
    logoutUser,
    getUserProfile,
    UpdateUserProfile,
  } = require('../controllers/userController');
  

router.post('/auth', authUser);
router.post('/register', register);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile)
                        .put(protect, UpdateUserProfile);

module.exports = router;
