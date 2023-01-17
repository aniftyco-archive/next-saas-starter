import { db } from 'next-saas';
import { PrismaClient } from '@prisma/client';
import { readdir } from 'fs/promises';
import { basename, join } from 'path';

export type Seeder<Model extends Record<string, any> = any> = (db: PrismaClient) => Promise<void> | Promise<Model>;

type SeedFile = {
  name: string;
  seed: Seeder<any>;
  order?: number;
};

const seedsDir = join(__dirname, 'seeds');

const seeder = async () => {
  const files = await readdir(seedsDir);
  console.log('Seeding database...\n');

  const seedFiles = await Promise.all(
    files.map(async (file) => {
      const seedFile = (await import(join(seedsDir, file))) as SeedFile;

      seedFile.order = seedFile.order ?? 1;
      seedFile.name = basename(file, '.ts');

      return seedFile;
    })
  );

  return seedFiles
    .sort((a, b) => a.order - b.order)
    .map(async ({ name, seed }) => {
      return seed(db).then(() => {
        console.log(` ✔ Seeded \x1b[32m${name}\x1b[89m\x1b[0m successfully`);
      });
    });
};

seeder()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
