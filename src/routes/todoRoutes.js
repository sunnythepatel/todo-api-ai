const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Todo = require('../models/Todo');
// const auth = require('../middleware/auth');

const { v4: uuidv4, validate: uuidValidate } = require('uuid');

// ... existing imports and code ...

// Middleware to validate UUID
const validateUUID = (req, res, next) => {
  const id = req.params.id;
  if (!uuidValidate(id)) {
    return res.status(400).json({ message: 'Invalid todo ID format' });
  }
  next();
};

router.get('/:id',  validateUUID, async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.userId });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all todos with pagination and search
router.get('/',  async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    
    const query = {
      user: req.userId,
      ...(search && { $text: { $search: search } })
    };

    const todos = await Todo.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Todo.countDocuments(query);

    res.json({
      todos,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create todo with validation
router.post('/', [
  body('title').trim().isLength({ min: 1, max: 100 }),
  body('description').optional().trim().isLength({ max: 500 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const todo = new Todo({
      ...req.body,
      user: req.userId
    });

    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ... existing code ...

// Update todo
router.patch('/:id', [
  body('title').optional().trim().isLength({ min: 1, max: 100 }),
  body('description').optional().trim().isLength({ max: 500 }),
  body('completed').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const todo = await Todo.findOne({ _id: req.params.id, user: req.userId });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Only update fields that were actually passed
    const updates = {};
    if (req.body.title !== undefined) updates.title = req.body.title;
    if (req.body.description !== undefined) updates.description = req.body.description;
    if (req.body.completed !== undefined) updates.completed = req.body.completed;

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.json(updatedTodo);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid todo ID' });
    }
    res.status(400).json({ message: error.message });
  }
});

// Delete todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.userId });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await Todo.findOneAndDelete({ _id: req.params.id, user: req.userId });
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid todo ID' });
    }
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;