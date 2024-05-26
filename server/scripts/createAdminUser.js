const mongoose = require('mongoose');
const argon2 = require('argon2');
const User = require('../Models/User'); // Assuming you have a User model defined
const uri = "mongodb+srv://MuhammadSajid:soft@cluster0.ga04rak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Define admin user details
const adminUserData = {
  name: 'Admin',
  email: 'admin@gmail.com',
  password: 'adminpassword',
  isAdmin: true,
};

// Hash the admin user's password using argon2
const createAdminUser = async () => {
  try {
    // Hash the password
    const hashedPassword = await argon2.hash(adminUserData.password);
    // Replace the plain-text password with the hashed password
    adminUserData.password = hashedPassword;

    // Create an admin user instance
    const adminUser = new User(adminUserData);

    // Save the admin user to the database
    await adminUser.save();

    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    mongoose.connection.close(); // Close the connection
  }
};

// Call the function to create the admin user
createAdminUser();
