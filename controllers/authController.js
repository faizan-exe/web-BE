const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const payload = { id: user.id, role: user.role };
        const token = jwt.sign(payload, "somesecret123", { expiresIn: '1h' });


        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) return res.status(404).json({ message: 'User not found' });
        
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getSpecificUser = async (req, res) => {
  try {
    const {id} = req.params;

      const user = await User.findById(id).select('-password');

      if (!user) return res.status(404).json({ message: 'User not found' });
      
      res.status(200).json({ user });
  }
  catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
}


exports.updateUserProfile = async (req, res) => {
    try {
      const { name, email, role, image } = req.body;  // Get user data from request body
      const userId = req.user.id;
  
      // Validate inputs
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
  
      // Find the user by ID and update their profile
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.name = name || user.name;
      user.email = email || user.email;
      user.role = role || user.role;
      user.image = image || user.image;  // If no new image, retain the old image
  
      // Save updated user profile
      await user.save();
  
      res.status(200).json({
        message: 'Profile updated successfully',
        user: user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };