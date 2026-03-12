import { useMemo } from 'react'
import { TaskCard } from './TaskCard'
import { TaskForm } from './TaskForm'
import { useTodoStore } from '../store/useTodoStore'

export function TaskList() {
  const { tasks, lists, activeListId, filters } = useTodoStore()

  const activeList = lists.find((l) => l.id === activeListId) ?? lists[0]

  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      const listMatch = activeListId ? t.listId === activeListId : true
      const statusMatch =
        filters.status === 'all'
          ? true
          : filters.status === 'completed'
          ? t.completed
          : !t.completed
      const priorityMatch = filters.priority ? t.priority === filters.priority : true
      return listMatch && statusMatch && priorityMatch
    })
  }, [tasks, activeListId, filters])

  const pending = filtered.filter((t) => !t.completed)
  const completed = filtered.filter((t) => t.completed)

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: activeList?.color ?? '#6366f1' }} />
        <h2 className="text-xl font-semibold text-gray-800">{activeList?.name ?? 'All tasks'}</h2>
        <span className="ml-auto rounded-full bg-gray-100 px-2.5 py-0.5 text-sm text-gray-500">
          {pending.length} pending
        </span>
      </div>

      <TaskForm defaultListId={activeList?.id ?? lists[0].id} />

      <div className="space-y-2">
        {pending.length === 0 && completed.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-400">No tasks yet. Add one above!</p>
        )}
        {pending.map((task) => <TaskCard key={task.id} task={task} />)}
      </div>

      {completed.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Completed</p>
          {completed.map((task) => <TaskCard key={task.id} task={task} />)}
        </div>
      )}
    </div>
  )
}
