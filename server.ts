import { db } from './db.ts';
import { usersTable } from './schema.ts';
import {
  createUserAccount,
  sendMoney,
  // simulateTransaction,
} from './script/simulate-trans.ts';

// master joins
// master transactions
// master views
// master subqueries
// indexing

// const result = await db.select().from(usersTable); // if you've defined a 'users' table schema
// console.log(result);

// simulateTransaction()
//   .then((result) => {
//     console.log('Transaction succeeded, result:', result);
//   })
//   .catch((error) => {
//     console.log('Transaction failed:', error);
//   });

// const res = await createUserAccount();

// console.log('res', res);

const res = await sendMoney();

console.log(res);
