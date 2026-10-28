import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Delete existing data (useful for dev resets)
  await prisma.design.deleteMany();
  await prisma.garment.deleteMany();
  await prisma.user.deleteMany();

  // Create two garment templates
  await prisma.garment.createMany({
    data: [
      {
        name: 'Jacket',
        description: 'Classic bomber style jacket',
        colors: JSON.stringify(['#000000', '#FFFFFF', '#1E40AF']), // black, white, blue
        sizeChart: JSON.stringify({
          xs: { chest: 38, length: 24 },
          s: { chest: 40, length: 25 },
          m: { chest: 42, length: 26 },
          l: { chest: 44, length: 27 },
          xl: { chest: 46, length: 28 },
        }),
        printAreas: JSON.stringify({
          front: { x: 50, y: 100, width: 300, height: 400 },
          back: { x: 50, y: 100, width: 300, height: 400 },
          sleeves: { x: 10, y: 20, width: 100, height: 150 },
        }),
      },
      {
        name: 'T‑shirt',
        description: 'Soft cotton crew‑neck tee',
        colors: JSON.stringify(['#FFFFFF', '#FF0000', '#00FF00', '#0000FF']),
        sizeChart: JSON.stringify({
          xs: { chest: 32, length: 24 },
          s: { chest: 34, length: 25 },
          m: { chest: 36, length: 26 },
          l: { chest: 38, length: 27 },
          xl: { chest: 40, length: 28 },
        }),
        printAreas: JSON.stringify({
          front: { x: 40, y: 80, width: 280, height: 360 },
          back: { x: 40, y: 80, width: 280, height: 360 },
          sleeves: { x: 5, y: 10, width: 80, height: 120 },
        }),
      },
    ],
  });

  console.log('✅ Seed data inserted');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
