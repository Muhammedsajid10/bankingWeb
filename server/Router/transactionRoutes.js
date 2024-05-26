// const express = require('express');

// const protect = require('../Middleware/authMiddleware')
// const { makeTransaction, getTransactions } = require('../Controller/transactionController');
// const tranRouter = express.Router();

// tranRouter.route('/').post(protect, makeTransaction).get(protect, getTransactions);

// module.exports = tranRouter;




// const express = require('express');
// const { authenticateToken } = require('../Middleware/authMiddleware'); 
// const { makeTransaction, getTransactions } = require('../Controller/transactionController');
// const tranRouter = express.Router();

// tranRouter.route('/').post(authenticateToken, makeTransaction).get(authenticateToken, getTransactions);

// module.exports = tranRouter;






const express = require('express');
const { authenticateToken } = require('../Middleware/authMiddleware');
const { makeTransaction, getTransactions } = require('../Controller/transactionController');
const tranRouter = express.Router();

tranRouter.route('/').post(authenticateToken, makeTransaction).get(authenticateToken, getTransactions);

module.exports = tranRouter;
