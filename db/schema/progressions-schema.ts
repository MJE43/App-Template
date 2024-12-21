// db/schema/progressions-schema.ts

import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const genreEnum = pgEnum("genre", [
  "pop",
  "rock",
  "jazz",
  "classical",
  "electronic",
  "other"
])

export const progressionsTable = pgTable("progressions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  genre: genreEnum("genre").notNull(),
  era: text("era").notNull(),
  data: text("data").notNull(), // JSON string of chord progression
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertProgression = typeof progressionsTable.$inferInsert
export type SelectProgression = typeof progressionsTable.$inferSelect
