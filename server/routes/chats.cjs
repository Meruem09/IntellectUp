// routes/chats.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new chat for a user
router.post('/', async (req, res) => {
  const { userId } = req.body;
  try {
    const newChat = await prisma.chat.create({
      data: {
        userId: userId,
      },
    });
    res.status(201).json(newChat);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to create chat' });
  }
});

module.exports = router;
