import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Seeder } from '../seed';

export const order = 0;

export const seed: Seeder<User> = async (db) => {
  return db.user.create({
    data: {
      name: process.env.DB_SEED_GOD_USER_NAME ?? 'GOD ROLE',
      email: process.env.DB_SEED_GOD_USER_EMAIL ?? 'god@example.com',
      password: await bcrypt.hash(process.env.DB_SEED_GOD_USER_PASSWORD ?? 'hunter2', 12),
    },
  });
};
