import { ConvexHttpClient } from 'convex/browser';

const client = new ConvexHttpClient('https://artful-lynx-271.convex.cloud');

async function runSeed() {
  try {
    console.log('Seeding Convex cloud deployment artful-lynx-271...');
    const result = await client.mutation('seed:seedInitialData');
    console.log('Seed result:', result);
  } catch (err) {
    console.error('Seed error:', err);
  }
}

runSeed();
