// index.js
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();



const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/users.cjs');
app.use('/users', userRoutes);

const chatRoutes = require('./routes/chats.cjs');
app.use('/chats', chatRoutes);

const messageRoutes = require('./routes/messages.cjs');
app.use('/messages', messageRoutes);




// Start server
app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
