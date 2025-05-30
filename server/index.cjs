// index.js
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');
const findOrCreateUser = require('./utils/middleware.cjs');

require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // or use '*' for all origins (not recommended for production)
  credentials: true // if you're using cookies or sessions
}));


// Apply middleware globally
app.use(ClerkExpressWithAuth());



// Routes
const userRoutes = require('./routes/users.cjs');
app.use('/users', userRoutes);

const chatRoutes = require('./routes/chats.cjs');
app.use('/chats', chatRoutes);

const messageRoutes = require('./routes/messages.cjs');
app.use('/messages', messageRoutes);


const geminiRoutes = require('./routes/gemini.cjs');
app.use('/gemini', geminiRoutes);




// Start server
app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
