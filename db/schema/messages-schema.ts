import {
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid
} from "drizzle-orm/pg-core"
import { progressionsTable } from "./progressions-schema"

export const roleEnum = pgEnum("role", ["assistant", "user"])

export const messageTypeEnum = pgEnum("message_type", [
  "text",
  "suggestion",
  "system"
])

export const messagesTable = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  progressionId: uuid("progression_id")
    .references(() => progressionsTable.id, { onDelete: "cascade" })
    .notNull(),
  content: jsonb("content")
    .$type<{
      text: string
      suggestion?: {
        chords: string[]
        explanation: string
        context: string
      }
    }>()
    .notNull(),
  type: messageTypeEnum("type").notNull(),
  role: roleEnum("role").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertMessage = typeof messagesTable.$inferInsert
export type SelectMessage = typeof messagesTable.$inferSelect
