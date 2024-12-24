import { TaskModel } from "../../../mongoose/models/Task";

export const getFinishedTasksLists = async () => {
  try {
    const tasks = await TaskModel.find({ isFinished: true });
    return tasks;
  } catch (error) {
    throw new Error("Failed to fetch finished tasks");
  }
};
