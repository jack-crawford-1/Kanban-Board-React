import { useState } from 'react';
import TrashIcon from '../icons/TrashIcon';
import { Id, Task } from '../types/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { type: 'Task', task },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-slate-800 p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-green-500 cursor-grab relative cursor-grab opacity-50 "
      />
    );
  }

  if (editMode) {
    return (
      <>
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          className="bg-slate-800 p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-green-500 cursor-grab relative cursor-grab"
        >
          <textarea
            className=" h-[90%] w-full resize-none border-none bg-transparent text-white focus:outlilne-none"
            value={task.content}
            autoFocus
            placeholder="task content here"
            onBlur={toggleEditMode}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                toggleEditMode();
              }
            }}
            onChange={(e) => {
              updateTask(task.id, e.target.value);
            }}
          ></textarea>
        </div>
      </>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className=" p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-green-500 ring-inset ring-white text-white bg-slate-700 opacity-90 ring-[1px] cursor-grab relative cursor-grab task"
      onClick={toggleEditMode}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {task.content}
      </p>

      {mouseIsOver && (
        <button
          className="stroke-white aboslute right-4 top-1/2 tranlate-y-1/2 bg-green-500 rounded opacity-40 hover:stroke-red-500 hover:opacity-100"
          onClick={() => {
            deleteTask(task.id);
          }}
        >
          <div className="absolute right-3 top-1/3">
            <TrashIcon />
          </div>
        </button>
      )}
    </div>
  );
}

export default TaskCard;
