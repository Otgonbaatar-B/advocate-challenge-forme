import { TaskModel } from "../../../mongoose/models/Task";

export const updateTask = async (
  _: unknown,
  {
    id,
    input,
  }: {
    id: string;
    input: {
      title?: string;
      description?: string;
      isFinished?: boolean;
      isDeleted?: boolean;
    };
  }
) => {
  try {
    const task = await TaskModel.findByIdAndUpdate(id, input, { new: true });
    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  } catch (error) {
    if (error instanceof Error && error.message === "Task not found") {
      throw error;
    }
    if (error instanceof Error) {
      throw new Error(`Failed to update task: ${error.message}`);
    }
    throw new Error("An unknown error occurred during task update");
  }
};
