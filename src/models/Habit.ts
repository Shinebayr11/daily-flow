import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const habitSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    name: { type: String, required: true, trim: true },
    icon: { type: String, default: "🎯" },
    // Weekday keys the habit is active on ("mon".."sun"); empty = every day.
    frequency: { type: [String], default: [] },
    currentStreak: { type: Number, default: 0 },
    bestStreak: { type: Number, default: 0 },
    // ISO dates ("yyyy-mm-dd") the habit was completed on.
    completedDates: { type: [String], default: [] },
  },
  { timestamps: true },
);

export type HabitDoc = InferSchemaType<typeof habitSchema>;

export const Habit: Model<HabitDoc> =
  (models.Habit as Model<HabitDoc>) ?? model<HabitDoc>("Habit", habitSchema);
