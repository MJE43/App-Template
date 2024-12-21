// db/schema/messages-schema.ts

import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { progressionsTable } from "./progressions-schema"

export const roleEnum = pgEnum("role", ["assistant", "user"])

export const messagesTable = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  progressionId: uuid("progression_id")
    .references(() => progressionsTable.id, { onDelete: "cascade" })
    .notNull(),
  content: text("content").notNull(),
  role: roleEnum("role").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertMessage = typeof messagesTable.$inferInsert
export type SelectMessage = typeof messagesTable.$inferSelect
