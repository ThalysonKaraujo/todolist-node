import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  integer,
} from 'drizzle-orm/pg-core';

export const todos = pgTable('todos', {
  id: serial().primaryKey(),
  title: text().notNull(),
  description: text(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  isFinished: boolean('is_finished').default(false).notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});

export const users = pgTable('users', {
  id: serial().primaryKey(),
  email: text().notNull().unique(),
  password: text().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
