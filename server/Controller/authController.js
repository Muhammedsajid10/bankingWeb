
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../Models/User');

// const register = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hashedPassword });
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
//     res.status(201).json({ token });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (user && (await bcrypt.compare(password, user.password))) {
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
//       res.json({ token });
//     } else {
//       res.status(401).json({ message: 'Invalid credentials' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// module.exports = { register, login };












const User = require('../Models/User');
const argon2 = require('argon2'); // Fixed require statement
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, Email, and Password are required." });
    }

    const passwordHash = await argon2.hash(password);

    const userDetails = await User.create({
      name: name,
      email: email,
      password: passwordHash,
    });

    res.json(userDetails);
  } catch (error) {
    console.error("Error in createUser:", error);
    res.status(500).json({ error: "An error occurred while creating the user." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Name and Password are required." });
    }

    const foundUser = await User.findOne({ email: email });

    if (!foundUser) {
      return res.status(401).json({ error: "Authentication failed. User not found." });
    }

    const isPasswordValid = await argon2.verify(foundUser.password, password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Authentication failed. Invalid password." });
    }

    const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Token:', token);
    res.header('Authorization', token).json({ message: "Login successful", data: token, email:foundUser.email });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the admin user by email
    const adminUser = await User.findOne({ email: email, isAdmin: true });

    // If admin user not found or password is incorrect, return error
    if (!adminUser || !(await argon2.verify(adminUser.password, password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: adminUser._id, isAdmin: true }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expiration time
    });

    // Send token in response
    res.header('Authorization', token).json({ message: "Login successful", data: token, email: adminUser.email });


  } catch (error) {
    console.error('Error logging in admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { register, login, loginAdmin };
