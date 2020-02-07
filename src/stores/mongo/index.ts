import { Db, ObjectID } from 'mongodb';
export { Db } from 'mongodb';
export { default as connect } from './connect';

export const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
export const mongoDbName = process.env.MONGO_DB_NAME || 'test';

export function makeMongoStore(db: Db) {
  return {
    withIdFilter,
    withIdsFilter,
    coinDrops: db.collection('coin_drops'),
    coinDropsAdvanced: db.collection('coin_drops_advanced'),
    coinDropsAdvancedOptIn: db.collection('coin_drops_advanced_opt_in'),
    trackerImplementations: db.collection('tracker_implementations'),
  };
}

export function withIdFilter(id: string) {
  return { _id: new ObjectID(id) };
}

export function withIdsFilter(ids: string[]) {
  return {
    _id: { $in: ids.map(id => new ObjectID(id)) },
  };
}
