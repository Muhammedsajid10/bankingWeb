// const jwt = require('jsonwebtoken');
// const User = require('../Models/User');

// const protect = async (req, res, next) => {
//   let token;
//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       token = req.headers.authorization.split(' ')[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select('-password');
//       next();
//     } catch (error) {
//       res.status(401).json({ message: 'Not authorized, token failed' });
//     }
//   }
//   if (!token) {
//     res.status(401).json({ message: 'Not authorized, no token' });
//   }
// };

// module.exports = { protect };







// const jwt = require('jsonwebtoken');

// const authenticateToken = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization').split(' ')[1];
//     console.log('Token in authRequire:', token);

//     const decode = await jwt.verify(token, process.env.JWT_SECRET);
//     console.log('Decoded Data in authRequire:', decode);

//     req.user = decode;
//     next();
//   } catch (err) {
//     res.status(403).send('Invalid token');
//   }
// };


// const admin = (req, res, next) => {
//   if (req.user && req.user.isAdmin) {
//     next();
//   } else {
//     res.status(401).json({ message: 'Not authorized as an admin' });
//   }
// };

// module.exports = {authenticateToken, admin}








const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization').split(' ')[1];
    console.log('Token in authRequire:', token);

    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Data in authRequire:', decode);

    req.user = decode;
    next();
  } catch (err) {
    res.status(403).send('Invalid token');
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { authenticateToken, admin };
