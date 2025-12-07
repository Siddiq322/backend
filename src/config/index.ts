import dotenv from 'dotenv';

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = Number(process.env.PORT || 4000);
export const JWT_SECRET = process.env.JWT_SECRET || 'replace_me';
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mockbank';
export const IS_MOCK = NODE_ENV === 'development' || process.env.MOCK_MODE === 'true';
