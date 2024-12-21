// db/schema/contexts-schema.ts

import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { progressionsTable } from "./progressions-schema"

export const contextsTable = pgTable("contexts", {
  id: uuid("id").defaultRandom().primaryKey(),
  progressionId: uuid("progression_id")
    .references(() => progressionsTable.id, { onDelete: "cascade" })
    .notNull(),
  genre: text("genre").notNull(),
  era: text("era").notNull(),
  mood: text("mood"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertContext = typeof contextsTable.$inferInsert
export type SelectContext = typeof contextsTable.$inferSelect
