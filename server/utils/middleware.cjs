const { PrismaClient } = require('@prisma/client');
const { users } = require('@clerk/clerk-sdk-node');

const prisma = new PrismaClient();

async function findOrCreateUser(clerkUserId, extraData = {}) {
  try {
    let user = await prisma.user.findUnique({ where: { clerkId: clerkUserId } });

    if (!user) {
      const clerkUser = await users.getUser(clerkUserId);

      user = await prisma.user.create({
        data: {
          clerkId: clerkUserId,
          name: extraData.username || clerkUser.username || 'Anonymous',
          email: extraData.email || clerkUser.emailAddresses?.[0]?.emailAddress || '',
        },
      });
    }

    return user;
  } catch (error) {
    console.error('findOrCreateUser error:', error);
    throw error;
  }
}

module.exports = findOrCreateUser;
