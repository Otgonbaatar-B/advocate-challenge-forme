import { TaskModel } from "../../../mongoose/models/Task";

export const addTask = async (
  _: unknown,
  {
    taskName,
    description,
    isDone = false,
    priority,
    tags = [],
  }: {
    taskName: string;
    description: string;
    isDone?: boolean;
    priority: number;
    tags?: string[];
  }
) => {
  if (description.length < 10) {
    throw new Error("Description must be at least 10 characters long");
  }
  if (priority < 1 || priority > 5) {
    throw new Error("Priority must be between 1 and 5");
  }

  const newTask = new TaskModel({
    taskName,
    description,
    isDone,
    priority,
    tags,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  try {
    const savedTask = await newTask.save();
    return savedTask;
  } catch (error) {
    throw new Error("Failed to create task");
  }
};
