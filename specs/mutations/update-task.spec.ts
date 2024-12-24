import { updateTask } from "../../graphql/resolvers/mutations/update-task";
import { TaskModel } from "../../mongoose/models/Task";

jest.mock("../../mongoose/models/Task");

describe("updateTask mutation", () => {
  it("should update an existing task", async () => {
    const mockUpdatedTask = {
      id: "123",
      title: "Updated Task",
      description: "Updated Description",
      isDeleted: false,
      isFinished: true,
    };

    (TaskModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(
      mockUpdatedTask
    );

    const result = await updateTask(null, {
      id: "123",
      input: {
        title: "Updated Task",
        description: "Updated Description",
        isFinished: true,
      },
    });

    expect(result).toEqual(mockUpdatedTask);
    expect(TaskModel.findByIdAndUpdate).toHaveBeenCalledWith(
      "123",
      {
        title: "Updated Task",
        description: "Updated Description",
        isFinished: true,
      },
      { new: true }
    );
  });

  it("should throw an error when the task is not found", async () => {
    (TaskModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(
      updateTask(null, {
        id: "123",
        input: { title: "Updated Task" },
      })
    ).rejects.toThrow("Task not found");
  });

  it("should include error message for known errors", async () => {
    (TaskModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(
      new Error("Database connection failed")
    );

    await expect(
      updateTask(null, {
        id: "123",
        input: { title: "Updated Task" },
      })
    ).rejects.toThrow("Failed to update task: Database connection failed");
  });

  it("should handle unknown error types", async () => {
    (TaskModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(
      "Unknown error"
    );

    await expect(
      updateTask(null, {
        id: "123",
        input: { title: "Updated Task" },
      })
    ).rejects.toThrow("An unknown error occurred during task update");
  });
});
