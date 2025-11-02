import { db } from '../db/index.js';
import { todos } from '../db/schema.js';
import { and, eq } from 'drizzle-orm';

export const todosRepository = {
  findAll: async (userId: number) => {
    const result = await db
      .select()
      .from(todos)
      .where(eq(todos.userId, userId));
    return result;
  },

  findById: async (todoId: number, userId: number) => {
    const result = await db
      .select()
      .from(todos)
      .where(and(eq(todos.id, todoId), eq(todos.userId, userId)))
      .limit(1);
    return result[0];
  },

  create: async (data: {
    title: string;
    description?: string;
    userId: number;
  }) => {
    const result = await db.insert(todos).values(data).returning();
    return result[0];
  },

  update: async (
    todoId: number,
    userId: number,
    data: { title?: string; description?: string; isFinished?: boolean }
  ) => {
    const result = await db
      .update(todos)
      .set(data)
      .where(and(eq(todos.id, todoId), eq(todos.userId, userId)))
      .returning();
    return result[0];
  },

  delete: async (todoId: number, userId: number) => {
    const result = await db
      .delete(todos)
      .where(and(eq(todos.id, todoId), eq(todos.userId, userId)))
      .returning();
    return result;
  },
};
