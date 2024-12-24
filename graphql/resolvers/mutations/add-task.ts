import { TaskModel } from "../../../mongoose/models/Task";

export const addTask = async (
  _: unknown,
  { input }: { input: { title: string; description: string } }
) => {
  try {
    const task = await TaskModel.create(input);
    return task;
  } catch (error) {
    throw new Error("Failed to create task");
  }
};
