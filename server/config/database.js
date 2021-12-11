import Pool from "pg";

export const pool = new Pool.Pool({
  user: "postgres",
  host: "localhost",
  database: "libary_management_system",
  password: "postgres",
  port: 5432,
});
