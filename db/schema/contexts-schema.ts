import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { progressionsTable } from "./progressions-schema"
import { eraEnum, genreEnum } from "./progressions-schema"

export const contextsTable = pgTable("contexts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  progressionId: uuid("progression_id")
    .references(() => progressionsTable.id, { onDelete: "cascade" })
    .notNull(),
  genre: genreEnum("genre").notNull(),
  era: eraEnum("era").notNull(),
  mood: text("mood"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertContext = typeof contextsTable.$inferInsert
export type SelectContext = typeof contextsTable.$inferSelect
