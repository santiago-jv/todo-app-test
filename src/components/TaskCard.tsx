import { Trash2, Calendar } from 'lucide-react'
import type { Task } from '../types'
import { useTodoStore } from '../store/useTodoStore'

const PRIORITY_STYLES = {
  high: 'bg-red-100 text-red-700 border-red-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  low: 'bg-green-100 text-green-700 border-green-200',
}

interface Props {
  task: Task
}

export function TaskCard({ task }: Props) {
  const { toggleTask, deleteTask } = useTodoStore()

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border p-4 transition-all ${
        task.completed ? 'border-gray-100 bg-gray-50 opacity-60' : 'border-gray-200 bg-white shadow-sm'
      }`}
    >
      <button
        onClick={() => toggleTask(task.id)}
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          task.completed
            ? 'border-indigo-500 bg-indigo-500 text-white'
            : 'border-gray-300 hover:border-indigo-400'
        }`}
      >
        {task.completed && (
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p className={`font-medium text-gray-800 ${task.completed ? 'line-through text-gray-400' : ''}`}>
          {task.title}
        </p>
        {task.description && (
          <p className="mt-0.5 text-sm text-gray-500 truncate">{task.description}</p>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${PRIORITY_STYLES[task.priority]}`}>
            {task.priority}
          </span>
          {task.dueDate && (
            <span className="inline-flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="h-3 w-3" />
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={() => deleteTask(task.id)}
        className="shrink-0 rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}
