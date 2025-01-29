// const express = require('express');
// const router = express.Router();
// const { body, validationResult } = require('express-validator');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// // Register user
// router.post('/register', [
//   body('email').isEmail().normalizeEmail(),
//   body('password').isLength({ min: 6 })
// ], async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const userExists = await User.findOne({ email: req.body.email });
//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const user = new User(req.body);
//     await user.save();

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
//     res.status(201).json({ token });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Login user
// router.post('/login', async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await user.comparePassword(req.body.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router; 