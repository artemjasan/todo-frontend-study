import React, { useEffect } from 'react';
import { Task, TaskCreate, TaskWithCategory, TaskUpdate } from '../../interfaces/task';
import { getTasks, getTask, createTask, updateTask, deleteTask } from '../../services/api/taskAPIHandlers';
import { BaseProps } from '../../interfaces/basic';

export interface TaskBaseProps extends BaseProps {
  // TODO: With type TaskWithCategory or Task?
  onEdit: (editedTask: Task) => void;
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

  const fetchTask = async (id: string) => {
    const fetchedTask = await getTask(id);
    if (fetchedTask) {
      console.log(fetchedTask);
      // setTasks([...tasks, fetchedTask]);
    }
  };

  const handleCreateTask = async (newTask: TaskCreate) => {
    const createdTask = await createTask(newTask);
    if (createdTask) {
      setTasks([...tasks, createdTask]);
    }
  };

  const handleDeleteTask = async (id: string) => {
    const deletedTaskID = await deleteTask(id);
    if (deletedTaskID && deletedTaskID.id === id) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  return (
    // TODO: Add correct styles
    <div className="flex flex-col justify-items-center">
      {/* <TaskForm onSubmit={handleCreateTask}/> */}
      {/* <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask}/> */}
    </div>
  );
};

export default TasksPage;
