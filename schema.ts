import { eq, sql } from 'drizzle-orm';
import cron from 'node-cron';
import {
  check,
  index,
  integer,
  pgTable,
  pgView,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  email: text('email').notNull().unique(),
});

export const accountsTable = pgTable('accounts_table', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  balance: integer('balance').default(0),
});

export const transactionsTable = pgTable(
  'transactions_table',
  {
    id: serial('id').primaryKey(),
    senderId: integer('sender_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    receiverId: integer('receiver_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    amountSent: integer('amount_sent').default(0),
  },
  (table) => [
    check('min_amount_sent', sql`${table.amountSent} > 20`),

    index('name_idx').on(table.amountSent),
    uniqueIndex('email_idx').on(table.id),
  ]
);

export const postsTable = pgTable('posts_table', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertPost = typeof postsTable.$inferInsert;
export type SelectPost = typeof postsTable.$inferSelect;

// Materialized views
export const userView = pgView('user_view').as((qb) =>
  qb.select().from(usersTable).where(eq(usersTable.id, 5))
);

export const userReportView = pgView('user_report_view').as((qb) =>
  qb
    .select({
      userId: usersTable.id,
      // totalTransactions: sql<number>`count(t.id)`,
      // totalSpent: sql<number>`sum(t.amount)`,
    })
    .from(usersTable)
    .leftJoin(transactionsTable, eq(usersTable.id, transactionsTable.senderId))
    .groupBy(usersTable.id)
);

let counter = 1;
cron.schedule('*/1 * * * *', async () => {
  console.log('Refreshing materialized view...', counter++, counter);
  await sql`REFRESH MATERIALIZED VIEW CONCURRENTLY user_report_view`;
});
