import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const dailyReviewSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    date: { type: Date, required: true, index: true },
    goodThings: { type: String, default: "" },
    unfinishedTasks: { type: String, default: "" },
    unfinishedReason: { type: String, default: "" },
    learnedToday: { type: String, default: "" },
    tomorrowPriority: { type: String, default: "" },
    rating: { type: Number, min: 1, max: 5, default: 3 },
    mood: {
      type: String,
      enum: ["Great", "Good", "Normal", "Tired", "Bad"],
      default: "Normal",
    },
  },
  { timestamps: true },
);

// One review per user per day.
dailyReviewSchema.index({ userId: 1, date: 1 }, { unique: true });

export type DailyReviewDoc = InferSchemaType<typeof dailyReviewSchema>;

export const DailyReview: Model<DailyReviewDoc> =
  (models.DailyReview as Model<DailyReviewDoc>) ??
  model<DailyReviewDoc>("DailyReview", dailyReviewSchema);
