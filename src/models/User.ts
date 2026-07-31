import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

/**
 * Mirror of the Clerk user, kept in sync lazily. `clerkId` is the Clerk user
 * id and the value we scope every other collection by.
 */
const userSchema = new Schema(
  {
    clerkId: { type: String, required: true, unique: true, index: true },
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    image: { type: String },
  },
  { timestamps: true },
);

export type UserDoc = InferSchemaType<typeof userSchema>;

export const User: Model<UserDoc> =
  (models.User as Model<UserDoc>) ?? model<UserDoc>("User", userSchema);
