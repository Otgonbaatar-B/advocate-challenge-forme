import { getFinishedTasksLists } from "../../graphql/resolvers/queries/get-finished-tasks";
import { TaskModel } from "../../mongoose/models/Task";

jest.mock("../../mongoose/models/Task");

describe("getFinishedTasksLists query", () => {
  it("should return all finished tasks", async () => {
    const mockTasks = [
      {
        id: "1",
        title: "Task 1",
        description: "Description 1",
        isDeleted: false,
        isFinished: true,
      },
      {
        id: "2",
        title: "Task 2",
        description: "Description 2",
        isDeleted: true,
        isFinished: true,
      },
    ];

    (TaskModel.find as jest.Mock).mockResolvedValue(mockTasks);

    const result = await getFinishedTasksLists();

    expect(result).toEqual(mockTasks);
    expect(TaskModel.find).toHaveBeenCalledWith({ isFinished: true });
  });

  it("should throw error when fetch fails", async () => {
    (TaskModel.find as jest.Mock).mockRejectedValue(new Error("DB Error"));

    await expect(getFinishedTasksLists()).rejects.toThrow(
      "Failed to fetch finished tasks"
    );
  });
});
