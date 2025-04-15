import { count, eq, sql } from 'drizzle-orm';
import { db } from '../db.ts';
import { postsTable, usersTable } from '../schema.ts';

export const createPostsForUsers = async () => {
  try {
    const data = [
      {
        title: 'Catcher in the Rye',
        content:
          'lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum JD Salinger',
        userId: 5,
      },
      {
        title: 'To kill a mockingbird',
        content: 'lorem ipsum',
        userId: 8,
      },
      {
        title: '48 laws of power',
        content: 'lorem ipsum',
        userId: 10,
      },
    ];

    for (let item of data) {
      await db.insert(postsTable).values({
        ...item,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const aggregatePostQuery = async () => {
  return await db
    .select({
      count: sql<number>`count(${postsTable.userId})`.mapWith(Number),
      userId: postsTable.userId,
      userName: sql`upper(${usersTable.name})`,
    })
    .from(postsTable)
    .groupBy(sql`${postsTable.userId},${usersTable.name}`)
    .leftJoin(usersTable, eq(postsTable.userId, usersTable.id))
    .having(sql`count(${postsTable.userId}) > 2`);
};

export const aggregatePostsByUser = async () => {
  try {
    const data = await aggregatePostQuery();

    return data;
  } catch (error) {
    console.log(error);
  }
};
