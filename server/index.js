const express = require('express');
const cors = require('cors');
const connection = require('./MongoDb/Mongoose');
const router = require('./Router/Router');
const userRouter = require('./Router/userRoutes');
const tranRouter = require('./Router/transactionRoutes');
const dotenv = require('dotenv');

dotenv.config(); 

const app = express();
connection();

app.use(cors());
app.use(express.json());
app.use('/', router);
app.use('/userRoute', userRouter);
app.use('/transaction', tranRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
