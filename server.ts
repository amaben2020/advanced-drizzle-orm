// import { BatchResponse } from 'drizzle-orm/batch';
import { db } from './db.ts';
import { eventEmitter } from './emitter.ts';
import { locationData } from './file-sys.ts';
import { userReportView, usersTable, userView } from './schema.ts';
import {
  aggregatePostsByUser,
  createPostsForUsers,
} from './script/group-by.ts';
import { sendMoney } from './script/simulate-trans.ts';
import express from 'express';

//const res = await db.select().from(usersTable);

// const res = await sendMoney();
// const res = await aggregatePostsByUser();

// console.log(res);

// const batchResponse: BatchResponse = await db.batch([
//   db
//     .insert(usersTable)
//     .values({ id: 1, name: 'John' })
//     .returning({ id: usersTable.id }),
//   db.update(usersTable).set({ name: 'Dan' }).where(eq(usersTable.id, 1)),
//   db.query.usersTable.findMany({}),
//   db.select().from(usersTable).where(eq(usersTable.id, 1)),
//   db
//     .select({ id: usersTable.id, invitedBy: usersTable.invitedBy })
//     .from(usersTable),
// ]);

// const app = express();

// eventEmitter.emit('start', 1, 100);

// console.log(locationData);

const user = await db.select().from(userReportView);
console.log(user);
