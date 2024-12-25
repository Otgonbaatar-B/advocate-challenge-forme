import { sayHello } from "./mutations/say-hello";
import { addTask } from "./mutations/add-task";
import { updateTask } from "./mutations/update-task";
import { helloQuery } from "./queries/hello-query";
import { getAllTasks } from "./queries/get-all-tasks";
import { getFinishedTasksLists } from "./queries/get-done-tasks-lists";

export const resolvers = {
  Query: {
    helloQuery,
    getAllTasks,
    getFinishedTasksLists,
  },
  Mutation: {
    sayHello,
    addTask,
    updateTask,
  },
};
