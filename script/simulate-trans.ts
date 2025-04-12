import { eq, sql } from 'drizzle-orm';
import { db } from '../db.ts';
import { accountsTable, transactionsTable, usersTable } from '../schema.ts';

export async function createUserAccount() {
  try {
    await db.transaction(async (tx) => {
      // create user here
      const [user = undefined] = await tx
        .insert(usersTable)
        .values({
          age: 32,
          name: 'Amala Uzochukwu',
          email: 'amaben201phantom@gmail.com',
        })
        .returning();

      console.log('user', user);

      if (user?.id) {
        //  create account
        await tx.insert(accountsTable).values({
          userId: user.id,
          balance: 1000, // promo
        });
      }

      return user;
    });
  } catch (error) {
    throw new Error('Transaction rolled back due to error');
  }
}

export async function sendMoney() {
  const AMOUNT_TO_SEND = 100;
  const SENDER_ID = 5;
  const RECEIVER_ID = 8;
  try {
    // check if user has enough money
    await db.transaction(async (tx) => {
      const [user = undefined] = await tx
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, SENDER_ID))
        .leftJoin(accountsTable, eq(usersTable.id, accountsTable.userId));

      if (user?.accounts_table?.balance! > AMOUNT_TO_SEND) {
        // deduct from his account
        const [sender = undefined] = await tx
          .update(accountsTable)
          .set({
            balance: sql`${accountsTable.balance}  - ${AMOUNT_TO_SEND}`,
          })
          .where(eq(accountsTable.userId, SENDER_ID))
          .returning();

        // update another user's account
        const [receiver = undefined] = await tx
          .update(accountsTable)
          .set({
            balance: sql`${accountsTable.balance} + 100.00`,
          })
          .where(eq(accountsTable.userId, RECEIVER_ID))
          .returning();

        if (!sender?.id && !receiver?.id)
          throw new Error('Sender and receiver do not exist');

        // create a transaction table and update if available
        const [transaction = undefined] = await tx
          .insert(transactionsTable)
          .values({
            receiverId: receiver?.userId!,
            senderId: sender?.userId!,
            amountSent: AMOUNT_TO_SEND,
          })
          .onConflictDoUpdate({
            target: transactionsTable.id,
            set: {
              receiverId: receiver?.userId!,
              senderId: sender?.userId!,
              amountSent: AMOUNT_TO_SEND,
            },
          });
        // show sender and receiver details/id and amount sent
        return transaction;
      }
    });
  } catch (error) {
    console.log(error);
    throw new Error('Transaction rolled back');
  }
}
