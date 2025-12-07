import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { seed } from '../src/mock/seedGenerator';
import { connectMongo } from '../src/config/mongoPlaceholder';
import { MONGO_URI } from '../src/config';

dotenv.config();

async function seedCollections() {
  if (!MONGO_URI) {
    throw new Error('MONGO_URI is missing. Add it to your .env before running this script.');
  }

  const dataStore = seed();
  const connection = await connectMongo(MONGO_URI);
  const baseSchema = new mongoose.Schema({}, { strict: false });

  const collections: Array<{ name: string; data: unknown[] }> = [
    { name: 'users', data: dataStore.users },
    { name: 'accounts', data: dataStore.accounts },
    { name: 'transactions', data: dataStore.transactions },
    { name: 'loans', data: dataStore.loans },
    { name: 'creditCards', data: dataStore.creditCards },
    { name: 'fixedDeposits', data: dataStore.fixedDeposits },
    { name: 'recurringDeposits', data: dataStore.recurringDeposits },
    { name: 'stocks', data: dataStore.stocks },
    { name: 'mutualFunds', data: dataStore.mutualFunds },
    { name: 'intradayOrders', data: dataStore.intradayOrders },
    { name: 'notifications', data: dataStore.notifications },
    { name: 'auditLogs', data: dataStore.auditLogs },
    { name: 'fraudAlerts', data: dataStore.fraudAlerts },
    { name: 'systemHealth', data: dataStore.systemHealth }
  ];

  for (const { name, data } of collections) {
    const Model = connection.model(`Seed${name}`, baseSchema, name);
    await Model.deleteMany({});
    if (data.length > 0) {
      await Model.insertMany(data);
      console.log(`Inserted ${data.length} documents into ${name}`);
    } else {
      console.log(`Skipped ${name} (no documents to insert)`);
    }
  }

  await connection.close();
  console.log('Seeding complete.');
}

seedCollections()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Failed to seed MongoDB:', error);
    process.exit(1);
  });
