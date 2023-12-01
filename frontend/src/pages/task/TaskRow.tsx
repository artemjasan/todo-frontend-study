import React from 'react';
import { TaskWithCategory } from '../../interfaces/task';
import { BaseButton } from '../../components/buttons/BaseButton';
import { ButtonSize, ButtonType } from '../../components/buttons/utils';
import { useModal } from '../../hooks/useModal';
import { TaskBaseProps } from '.';
import { BsFillPencilFill, BsFillTrashFill, BsFlagFill } from 'react-icons/bs';
import { ModalTypes } from '../../components/modals/factory/ModalFacotry';
import { getRowTaskBorderClasses } from './utils';

interface TaskItemProps extends TaskBaseProps {
  task: TaskWithCategory;
}

const TaskRow: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  const { showModal } = useModal();
  const bgClasses = getRowTaskBorderClasses(task.completed);
  const rowTaskClasses = `w-full p-3 flex justify-between items-center rounded-lg shadow border ${bgClasses} bg-gray-400 dark:bg-gray-800`;
  return (
    <div className={rowTaskClasses}>
      <span>{task.body}</span>
      <div className="flex items-center gap-3">
        <BaseButton
          type={ButtonType.DEFAULT}
          size={ButtonSize.SMALL}
          onClick={() => onEdit(task.id, { completed: !task.completed })}
          icon={<BsFlagFill size={18} />}
        />
        <BaseButton
          type={ButtonType.WARNING}
          size={ButtonSize.SMALL}
          onClick={() => showModal(ModalTypes.TASK_EDIT, { task, onEdit })}
          icon={<BsFillPencilFill size={18} />}
          disabled={task.completed}
        />
        <BaseButton
          type={ButtonType.DANGER}
          size={ButtonSize.SMALL}
          onClick={() => onDelete(task.id)}
          icon={<BsFillTrashFill size={18} />}
        />
      </div>
    </div>
  );
};

export default TaskRow;
