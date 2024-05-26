// const express = require('express');

// const protect = require('../Middleware/authMiddleware')
// const { getUserProfile, updateUserProfile } = require('../Controller/userController');
// const userRouter = express.Router();

// userRouter.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

// module.exports = userRouter;



// const express = require('express');
// const { authenticateToken, admin } = require('../Middleware/authMiddleware');
// const { getUserProfile, updateUserProfile, disableUser, getUsers } = require('../Controller/userController');
// const userRouter = express.Router();

// userRouter.route('/profile').get(authenticateToken, getUserProfile).put(authenticateToken, updateUserProfile);
// userRouter.route('/').get(authenticateToken, admin, getUsers); // Assuming this is the intended usage
// userRouter.route('/:id/disable').put(authenticateToken, admin, disableUser);

// module.exports = userRouter;







const express = require('express');
const { getUserProfile, updateUserProfile, getAllUsers, disableUser } = require('../Controller/userController');
const { authenticateToken, admin } = require('../Middleware/authMiddleware'); // Corrected import
const userRouter = express.Router();

userRouter.route('/profile')
  .get(authenticateToken, getUserProfile)
  .put(authenticateToken, updateUserProfile);

userRouter.route('/')
  .get(authenticateToken, admin, getAllUsers); // Route for getting all users

userRouter.route('/:id/disable')
  .put(authenticateToken, admin, disableUser); // Route for disabling a user

module.exports = userRouter;

