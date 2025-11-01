import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL!;

console.log('🔌 Conectando ao banco:', connectionString); // LOG

export const client = postgres(connectionString);
export const db = drizzle(client);

console.log('✅ Conexão estabelecida!'); // LOG
