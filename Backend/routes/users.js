const express = require('express');
const router = express.Router();
const UserData = require('../model/user_data');

// POST: Add user
router.post('/users', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Missing name or email' });
  }

  try {
    await UserData.create({ name, email }); 
    res.status(201).json({ message: 'User added' });
  } catch (err) {
    console.error('Failed to insert user:', err);
    res.status(500).json({ error: 'Database insert failed' });
  }
});


// GET: Fetch all users
router.get('/users', async (req, res) => {
    try {
        const users = await UserData.find({}, { _id: 0, name: 1, email: 1, points: 1 });
        res.json(users);
    } catch (err) {
        console.error('Fetch failed:', err);
        res.status(500).json({ error: 'Fetch failed' });
    }
});

router.patch('/claim', async (req, res) => {
  const { email, points } = req.body;

  try {
    const updated = await UserData.findOneAndUpdate(
      { email },
      { $inc: { points: points } },
      { new: true }
    );
    if (updated) {
      res.json({ message: 'Points claimed', user: updated });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Claim error:', err);
    res.status(500).json({ error: 'Claim failed' });
  }
});


module.exports = router;
