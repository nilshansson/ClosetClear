import { sql } from "drizzle-orm";
import {
  integer,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `closetclear_${name}`);

export const productTable = createTable("product", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  url: varchar("url", { length: 1024 }).notNull(),
  category: varchar("category", { length: 256 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  usedAmount: integer("usedamount").default(0).notNull(),
  countedDays: integer("counteddays").default(0).notNull(),
});
