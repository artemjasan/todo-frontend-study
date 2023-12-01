import { TaskWithCategory } from "../../interfaces/task";

export const getRowTaskBorderClasses = (isCompleted: boolean): string => {
  return isCompleted ? 'border-green-500' : 'border-gray-500';
};


export const sortTasks = (tasks: Array<TaskWithCategory>): Array<TaskWithCategory> => {
   return tasks.sort((a, b) => {
    const completedComparison = a.completed ? 1 : b.completed ? -1 : 0;
    const updatedComparison = new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(); 
    return completedComparison || updatedComparison;
  });
};
