import {
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid
} from "drizzle-orm/pg-core"

export const genreEnum = pgEnum("genre", [
  "pop",
  "rock",
  "jazz",
  "classical",
  "electronic",
  "other"
])

export const eraEnum = pgEnum("era", [
  "50s",
  "60s",
  "70s",
  "80s",
  "90s",
  "00s",
  "10s",
  "20s"
])

export const progressionsTable = pgTable("progressions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  genre: genreEnum("genre").notNull(),
  era: eraEnum("era").notNull(),
  mood: text("mood"),
  data: jsonb("data").notNull().$type<{
    measures: Array<{
      id: string
      index: number
      timeSignature: {
        numerator: number
        denominator: number
      }
      chords: Array<{
        id: string
        name: string
        position: number
        variants?: Array<{
          id: string
          name: string
          voicing: number[]
          symbol: string
        }>
      }>
    }>
  }>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertProgression = typeof progressionsTable.$inferInsert
export type SelectProgression = typeof progressionsTable.$inferSelect
