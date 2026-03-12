import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Task, TaskList, FilterStatus, Priority } from '../types'

const DEFAULT_LISTS: TaskList[] = [
  { id: 'personal', name: 'Personal', color: '#6366f1' },
  { id: 'work', name: 'Work', color: '#f59e0b' },
  { id: 'shopping', name: 'Shopping', color: '#10b981' },
]

interface Filters {
  status: FilterStatus
  listId: string | null
  priority: Priority | null
}

interface TodoStore {
  tasks: Task[]
  lists: TaskList[]
  filters: Filters
  activeListId: string | null

  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  toggleTask: (id: string) => void

  addList: (name: string, color: string) => void
  deleteList: (id: string) => void

  setActiveList: (listId: string | null) => void
  setFilter: (filters: Partial<Filters>) => void
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      tasks: [],
      lists: DEFAULT_LISTS,
      activeListId: null,
      filters: { status: 'all', listId: null, priority: null },

      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { ...task, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
          ],
        })),

      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),

      deleteTask: (id) =>
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),

      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t,
          ),
        })),

      addList: (name, color) =>
        set((state) => ({
          lists: [...state.lists, { id: crypto.randomUUID(), name, color }],
        })),

      deleteList: (id) =>
        set((state) => ({
          lists: state.lists.filter((l) => l.id !== id),
          tasks: state.tasks.filter((t) => t.listId !== id),
        })),

      setActiveList: (listId) => set({ activeListId: listId }),

      setFilter: (filters) =>
        set((state) => ({ filters: { ...state.filters, ...filters } })),
    }),
    { name: 'todo-store' },
  ),
)
