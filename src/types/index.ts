export type Priority = 'low' | 'medium' | 'high'

export type FilterStatus = 'all' | 'pending' | 'completed'

export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: Priority
  listId: string
  dueDate?: string
  createdAt: string
}

export interface TaskList {
  id: string
  name: string
  color: string
}
