
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const databaseUrl = process.env.DATABASE_URL;

// ตั้งค่าการเชื่อมต่อ PostgreSQL
const options = {
  dialect: "postgres",
  logging: false,
  dialectOptions: isProduction
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
};

let sequelize;

if (databaseUrl) {
  // ใช้ DATABASE_URL จาก Render
  sequelize = new Sequelize(databaseUrl, options);
} else {
  // ใช้ค่าฐานข้อมูลจาก .env
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      ...options,
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 5432,
    }
  );
}

// เชื่อมต่อฐานข้อมูล
const connectDB = async () => {
  try {
    console.log("Connecting to PostgreSQL...");

    await sequelize.authenticate();
    console.log("PostgreSQL connected successfully!");

    await sequelize.sync();
    console.log("Database tables synchronized!");
  } catch (error) {
    console.error("PostgreSQL connection failed:");
    console.error(error.message);
    throw error;
  }
};

export { sequelize, connectDB };
