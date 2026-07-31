import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const taskSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    // Stored as a Date at local midnight; queried by day range.
    date: { type: Date, required: true, index: true },
    startTime: { type: String }, // "HH:mm"
    endTime: { type: String },
    allDay: { type: Boolean, default: false },
    category: {
      type: String,
      enum: ["Coding", "Study", "Work", "Health", "Exercise", "Personal", "Reading", "Other"],
      default: "Other",
    },
    priority: { type: String, enum: ["high", "medium", "low"], default: "medium" },
    status: {
      type: String,
      enum: ["pending", "completed", "missed"],
      default: "pending",
      index: true,
    },
    estimatedDuration: { type: Number }, // minutes
    repeat: {
      type: String,
      enum: ["never", "daily", "weekdays", "weekly", "monthly"],
      default: "never",
    },
    reminderOffset: { type: Number, default: 0 }, // minutes before start
    isTopPriority: { type: Boolean, default: false },
    completedAt: { type: Date },
  },
  { timestamps: true },
);

export type TaskDoc = InferSchemaType<typeof taskSchema>;

// `models.Task` guard prevents "OverwriteModelError" on hot reload.
export const Task: Model<TaskDoc> =
  (models.Task as Model<TaskDoc>) ?? model<TaskDoc>("Task", taskSchema);
