import Pool from "pg";

export const localPool = new Pool.Pool({
  user: "postgres",
  host: "localhost",
  database: "libary_management_system",
  password: "postgres",
  port: 5432,
});

const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnathorized: false },
    }
  : localPool;

export const pool = new Pool.Pool(poolConfig);
