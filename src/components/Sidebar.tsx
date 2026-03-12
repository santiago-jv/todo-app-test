import { CheckSquare, Plus } from 'lucide-react'
import { useState } from 'react'
import { useTodoStore } from '../store/useTodoStore'
import type { FilterStatus, Priority } from '../types'

const LIST_COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#06b6d4']

export function Sidebar() {
  const { lists, tasks, activeListId, filters, setActiveList, setFilter, addList } = useTodoStore()
  const [showNewList, setShowNewList] = useState(false)
  const [newName, setNewName] = useState('')
  const [newColor, setNewColor] = useState(LIST_COLORS[0])

  function handleAddList(e: React.FormEvent) {
    e.preventDefault()
    if (!newName.trim()) return
    addList(newName.trim(), newColor)
    setNewName('')
    setNewColor(LIST_COLORS[0])
    setShowNewList(false)
  }

  const totalPending = tasks.filter((t) => !t.completed).length

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-gray-100 bg-gray-50 p-4 gap-6">
      {/* Brand */}
      <div className="flex items-center gap-2 px-2">
        <CheckSquare className="h-6 w-6 text-indigo-500" />
        <span className="text-lg font-bold text-gray-800">TodoApp</span>
      </div>

      {/* Lists */}
      <div className="space-y-1">
        <p className="px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Lists</p>
        <button
          onClick={() => setActiveList(null)}
          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
            activeListId === null ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span>All tasks</span>
          <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600">{totalPending}</span>
        </button>
        {lists.map((list) => {
          const count = tasks.filter((t) => t.listId === list.id && !t.completed).length
          return (
            <button
              key={list.id}
              onClick={() => setActiveList(list.id)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                activeListId === list.id ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: list.color }} />
                {list.name}
              </span>
              {count > 0 && (
                <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600">{count}</span>
              )}
            </button>
          )
        })}

        {showNewList ? (
          <form onSubmit={handleAddList} className="space-y-2 px-2 pt-1">
            <input
              autoFocus
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="List name"
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-indigo-400"
            />
            <div className="flex gap-1">
              {LIST_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setNewColor(c)}
                  className={`h-5 w-5 rounded-full border-2 transition-transform ${newColor === c ? 'border-gray-800 scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <div className="flex gap-1">
              <button type="button" onClick={() => setShowNewList(false)} className="flex-1 rounded-lg py-1 text-xs text-gray-500 hover:bg-gray-200">
                Cancel
              </button>
              <button type="submit" className="flex-1 rounded-lg bg-indigo-500 py-1 text-xs text-white hover:bg-indigo-600">
                Add
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowNewList(true)}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <Plus className="h-4 w-4" />
            New list
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="space-y-1">
        <p className="px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Filter</p>
        {(['all', 'pending', 'completed'] as FilterStatus[]).map((s) => (
          <button
            key={s}
            onClick={() => setFilter({ status: s })}
            className={`flex w-full items-center rounded-lg px-3 py-2 text-sm capitalize transition-colors ${
              filters.status === s ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="space-y-1">
        <p className="px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Priority</p>
        <button
          onClick={() => setFilter({ priority: null })}
          className={`flex w-full items-center rounded-lg px-3 py-2 text-sm transition-colors ${
            !filters.priority ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          All
        </button>
        {(['high', 'medium', 'low'] as Priority[]).map((p) => (
          <button
            key={p}
            onClick={() => setFilter({ priority: p })}
            className={`flex w-full items-center rounded-lg px-3 py-2 text-sm capitalize transition-colors ${
              filters.priority === p ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    </aside>
  )
}
