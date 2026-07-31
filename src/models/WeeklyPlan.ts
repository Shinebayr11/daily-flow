import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const weeklyPlanSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    // Monday of the week (Date at local midnight). Unique per user+week.
    weekStartDate: { type: Date, required: true, index: true },
    goals: { type: [String], default: [] },
    taskIds: { type: [String], default: [] },
  },
  { timestamps: true },
);

weeklyPlanSchema.index({ userId: 1, weekStartDate: 1 }, { unique: true });

export type WeeklyPlanDoc = InferSchemaType<typeof weeklyPlanSchema>;

export const WeeklyPlan: Model<WeeklyPlanDoc> =
  (models.WeeklyPlan as Model<WeeklyPlanDoc>) ??
  model<WeeklyPlanDoc>("WeeklyPlan", weeklyPlanSchema);
