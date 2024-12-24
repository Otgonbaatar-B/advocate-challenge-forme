import { addTask } from "../../graphql/resolvers/mutations/add-task";
import { TaskModel } from "../../mongoose/models/Task";

jest.mock("../../mongoose/models/Task");

describe("addTask mutation", () => {
  it("should create a new task", async () => {
    const mockTask = {
      id: "123",
      title: "Test Task",
      description: "Test Description",
      isDeleted: false,
      isFinished: false,
    };

    (TaskModel.create as jest.Mock).mockResolvedValue(mockTask);

    const result = await addTask(null, {
      input: { title: "Test Task", description: "Test Description" },
    });

    expect(result).toEqual(mockTask);
    expect(TaskModel.create).toHaveBeenCalledWith({
      title: "Test Task",
      description: "Test Description",
    });
  });

  it("should throw error when creation fails", async () => {
    (TaskModel.create as jest.Mock).mockRejectedValue(new Error("DB Error"));

    await expect(
      addTask(null, {
        input: { title: "Test Task", description: "Test Description" },
      })
    ).rejects.toThrow("Failed to create task");
  });
});
