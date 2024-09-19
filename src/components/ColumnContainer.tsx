import { SortableContext, useSortable } from '@dnd-kit/sortable';
import TrashIcon from '../icons/TrashIcon';
import { Column, Id, Task } from '../types/types';
import { CSS } from '@dnd-kit/utilities';
import { useMemo, useState } from 'react';
import PlusIcon from '../icons/PlusIcon';
import TaskCard from './TaskCard';

interface ColumnContainerProps {
  column: Column;
  deleteColumn: (id: Id | number) => void;
  updateColumn: (id: Id | number, title: string) => void;
  createTask: (columnId: Id | number) => void;
  tasks: Task[];
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

const ColumnContainer = (props: ColumnContainerProps) => {
  const {
    column,
    deleteColumn,
    updateColumn,
    createTask,
    tasks,
    deleteTask,
    updateTask,
  } = props;

  const [editMode, setEditMode] = useState(false);

  const taskIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: { type: 'Column', column },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-slate-600 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col opacity-60 border-4 border-rose-500"
      ></div>
    );
  }

  return (
    <div
      style={style}
      ref={setNodeRef}
      className="text-white bg-slate-600 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
        className="bg-slate-700 rounded-md rounded-b-none h-[60px] text-md p-3 font-bold border-4 border-green-400 cursor-grab flex justify-between items-center"
      >
        <div className="flex items-center gap-2">
          <div className="flex justify-center items-center bg-slate-600 px-2 py-1 text-sm rounded-full">
            {tasks.length}
          </div>

          <div>
            {!editMode && column.title}

            {editMode && (
              <input
                className="bg-slate-900 focus:border-rose-500 border rounded-md p-1 outline-none px-2"
                autoFocus
                value={column.title}
                onChange={(e) => updateColumn(column.id, e.target.value)}
                onBlur={() => {
                  setEditMode(false);
                }}
                onKeyDown={(e) => {
                  if (e.key !== 'Enter') return;
                  setEditMode(false);
                }}
              />
            )}
          </div>
        </div>

        <button
          className="stroke-gray-500 hover:stroke-white"
          onClick={(e) => {
            e.stopPropagation();
            deleteColumn(column.id);
          }}
        >
          <TrashIcon />
        </button>
      </div>

      <div className="flex flex-grow flex-col gap-4 p-4 overflow-x-hidden overflow-y-auto">
        <SortableContext items={taskIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>

      <div className="max-h-[60px] min-h-[60px] bg-slate-900">
        <button
          className="w-full flex gap-2 items-center border-2 border-slate-600 rounded-md p-4 hover:text-green-500 hover:bg-slate-900 active:bg-slate-900"
          onClick={() => {
            createTask(column.id);
          }}
        >
          <PlusIcon />
          Add Task
        </button>
      </div>
    </div>
  );
};

export default ColumnContainer;
