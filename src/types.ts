export type TaskPriority = '1' | '2' | '3'

export interface Task {
  date: Date //since date is an unique key, it's used as a primary key
  description: string
  priority: TaskPriority
  completed: boolean
}
