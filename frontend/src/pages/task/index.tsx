import React, { useEffect } from 'react';
import { TaskCreate, TaskWithCategory, TaskUpdate } from '../../interfaces/task';
import { getTasks, createTask, updateTask, deleteTask } from '../../services/api/taskAPIHandlers';
import { BaseProps } from '../../interfaces/basic';
import TaskList from './TasksList';
import TaskForm from './TaskForm';

export interface TaskBaseProps extends BaseProps {
  onEdit: (id: string, data: TaskUpdate) => void;
}

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = React.useState<TaskWithCategory[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const fetchedTasks = await getTasks();
    if (fetchedTasks) {
      setTasks(fetchedTasks);
    }
  };

  const handleCreateTask = async (newTask: TaskCreate) => {
    const createdTask = await createTask(newTask);
    if (createdTask) {
      setTasks([...tasks, createdTask]);
    }
  };

  const handleEditTask = async (id: string, data: TaskUpdate) => {
    const updatedTask = await updateTask(id, data);
    if (updatedTask && updatedTask.id === id) {
      setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    }
  };

  const handleDeleteTask = async (id: string) => {
    const deletedTaskID = await deleteTask(id);
    if (deletedTaskID && deletedTaskID.id === id) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };
  return (
    <div className="flex flex-col items-center py-3 px-3 gap-3 h-[80vh]">
      <TaskForm onSubmit={handleCreateTask} />
      <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
    </div>
  );
};

export default TasksPage;
