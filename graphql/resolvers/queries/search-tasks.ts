import { TaskModel } from "../../../mongoose/models/Task";

export const searchTasks = async (
  _: unknown,
  {
    searchTerm,
    priority,
    isDone,
    createdBefore,
    createdAfter,
  }: {
    searchTerm?: string;
    priority?: number;
    isDone?: boolean;
    createdBefore?: Date;
    createdAfter?: Date;
  }
) => {
  const filters: Record<string, any> = {};

  // Add search term filter
  if (searchTerm) {
    filters.$or = [
      { taskName: { $regex: searchTerm, $options: "i" } },
      { description: { $regex: searchTerm, $options: "i" } },
    ];
  }

  // Add priority filter
  if (priority !== undefined) {
    filters.priority = priority;
  }

  // Add isDone filter
  if (isDone !== undefined) {
    filters.isDone = isDone; // Ensure this matches the field used in your database model
  }

  // Add createdBefore filter
  if (createdBefore) {
    filters.createdAt = { ...filters.createdAt, $lt: createdBefore };
  }

  // Add createdAfter filter
  if (createdAfter) {
    if (filters.createdAt) {
      filters.createdAt.$gt = createdAfter;
    } else {
      filters.createdAt = { $gt: createdAfter };
    }
  }

  try {
    const tasks = await TaskModel.find(filters);
    return tasks;
  } catch (error) {
    throw new Error("Failed to fetch tasks based on search criteria.");
  }
};
