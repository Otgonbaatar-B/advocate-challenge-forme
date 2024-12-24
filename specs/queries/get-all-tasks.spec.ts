import { getAllTasks } from "../../graphql/resolvers/queries/get-all-tasks";
import { TaskModel } from "../../mongoose/models/Task";

jest.mock("../../mongoose/models/Task");

describe("getAllTasks query", () => {
  it("should return all non-deleted tasks", async () => {
    const mockTasks = [
      {
        id: "1",
        title: "Task 1",
        description: "Description 1",
        isDeleted: false,
        isFinished: false,
      },
      {
        id: "2",
        title: "Task 2",
        description: "Description 2",
        isDeleted: false,
        isFinished: true,
      },
    ];

    (TaskModel.find as jest.Mock).mockResolvedValue(mockTasks);

    const result = await getAllTasks();

    expect(result).toEqual(mockTasks);
    expect(TaskModel.find).toHaveBeenCalledWith({ isDeleted: false });
  });

  it("should throw error when fetch fails", async () => {
    (TaskModel.find as jest.Mock).mockRejectedValue(new Error("DB Error"));

    await expect(getAllTasks()).rejects.toThrow("Failed to fetch tasks");
  });
});
