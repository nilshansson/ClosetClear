import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/app/server/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: "postgres://default:8K4SXNiAfqhZ@ep-still-mud-a4rnoiqs-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
  },
});
