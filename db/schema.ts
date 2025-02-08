import {
  varchar,
  integer,
  text,
  pgTable,
  uuid,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";

export const ROLE_ENUM = pgEnum("roles", ["USER", "ADMIN"]);
export const BORROWED_STATUS_ENUM = pgEnum("borrow_status", [
  "BORROWED",
  "RETURNED",
]);
export const STATUS_ENUM = pgEnum("stats", ["ACCEPTED", "REJECTED", "PENDING"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().unique().notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  universityId: integer("university_id").notNull().unique(),
  universityCard: text("university_card").notNull(),
  role: ROLE_ENUM().default("USER").notNull(),
  status: STATUS_ENUM().default("PENDING").notNull(),
  borrowedBooksStatus: BORROWED_STATUS_ENUM().default("RETURNED").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  lastActivityDate: timestamp("last_Activity_date", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
