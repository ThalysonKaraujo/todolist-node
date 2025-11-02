import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';

export const authRepository = {
  findByEmail: async (email: string) => {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  },

  createUser: async (data: { email: string; password: string }) => {
    const result = await db.insert(users).values(data).returning();
    return result[0];
  },
};
