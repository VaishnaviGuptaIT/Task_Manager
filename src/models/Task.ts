import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done" | "cancelled";
  priority: "low" | "medium" | "high";
  label: "bug" | "feature" | "documentation" | "enhancement";
  dueDate?: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done", "cancelled"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    label: {
      type: String,
      enum: ["bug", "feature", "documentation", "enhancement"],
      default: "feature",
    },
    dueDate: { type: Date },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export const Task =
  mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);
