const fs = require('fs');
const mime = require('mime-types');
const express = require('express');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');


const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// Clerk middleware is assumed applied globally in app.js/server.js
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const userInfo = {
  name: 'Rahul',
  school: 'Pragati High. Sec. School',
  language: 'English',
  explanationStyle: 'short and in points user friendly and with some emojis',
};

router.post('/', async (req, res) => {
  const clerkUserId = req.auth?.userId; // 👈 get Clerk ID
  const { chatId, prompt } = req.body;

  if (!clerkUserId || !chatId || !prompt) {
    return res.status(400).json({ error: 'Missing required fields: clerkUserId, chatId, prompt' });
  }

  try {
    // 🔍 1. Find the user in DB by clerkId
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: clerkUserId },
    });

    if (!dbUser) {
      return res.status(404).json({ error: 'User not found in DB' });
    }

    // 📝 2. Store user's message
    await prisma.message.create({
      data: {
        chatId: parseInt(chatId),
        sender: 'user',
        content: prompt,
      },
    });

    // 🤖 3. Get Gemini response
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });

    const systemPrompt = `Your name is Gemini. You're assisting ${userInfo.name} from ${userInfo.school}.
                          Please always respond in ${userInfo.language} and give explanations that are ${userInfo.explanationStyle}.`;

    const finalPrompt = `${systemPrompt}\n\nUser prompt: ${prompt}`;

    const result = await model.generateContent([{ text: finalPrompt }]);
    const aiResponse = result.response.text();

    // 💾 4. Store AI message
    await prisma.message.create({
      data: {
        chatId: parseInt(chatId),
        sender: 'ai',
        content: aiResponse,
      },
    });

    // ✅ 5. Return AI message
    res.json({ reply: aiResponse });
  } catch (error) {
    console.error('Gemini Error:', error);
    res.status(500).json({ reply: '❌ Failed to get response from Gemini.' });
  }
});

module.exports = router;
