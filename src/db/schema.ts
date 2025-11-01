import { pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const todos = pgTable('todos', {
  id: serial().primaryKey(),
  title: text().notNull(),
  description: text(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  isFinished: boolean('is_finished').default(false).notNull(),
});
