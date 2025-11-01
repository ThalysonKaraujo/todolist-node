import { db } from '../db/index.js';
import { todos } from '../db/schema.js';
import { eq } from 'drizzle-orm';

export const todosRepository = {
  findAll: async () => {
    return await db.select().from(todos);
  },

  findById: async (id: number) => {
    const result = await db.select().from(todos).where(eq(todos.id, id));
    return result[0];
  },

  create: async (data: { title: string; description?: string }) => {
    const result = await db.insert(todos).values(data).returning();
    return result[0];
  },

  update: async (
    id: number,
    data: { title?: string; description?: string; isFinished?: boolean }
  ) => {
    const result = await db
      .update(todos)
      .set(data)
      .where(eq(todos.id, id))
      .returning();
    return result[0];
  },

  delete: async (id: number) => {
    const result = await db.delete(todos).where(eq(todos.id, id));
    return result[0];
  },
};
