import { DataSourceOptions } from "typeorm";

const { DB_HOST, DB_PORT = 5432, DB_USER, DB_NAME, DB_PASS} = process.env;

const typeORMConfig: DataSourceOptions = {
   "type": "postgres",
   "host": DB_HOST,
   "port": +DB_PORT,
   "username": DB_USER,
   "password": `${DB_PASS}`,
   "database": DB_NAME,
   "entities": ["dist/**/*.entity.js"],
   synchronize: true,
   // "migrations": [
   //    "src/migrations/*.{ts,js}"
   // ],
};

export default typeORMConfig;