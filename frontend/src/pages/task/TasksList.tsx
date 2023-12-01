import React from 'react';
import { TaskWithCategory } from '../../interfaces/task';
import { TaskBaseProps } from '.';
import TaskRow from './TaskRow';
import { sortTasks } from './utils';

interface TaskListProps extends TaskBaseProps {
  tasks: Array<TaskWithCategory>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  const sortedTasks = sortTasks(tasks);

  return (
    <div className="flex flex-col w-full gap-2 text-black dark:text-white sm:w-[600px] overflow-y-auto">
      {sortedTasks.map((task) => (
        <TaskRow key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TaskList;
