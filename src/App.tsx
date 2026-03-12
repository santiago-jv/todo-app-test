import { Sidebar } from './components/Sidebar'
import { TaskList } from './components/TaskList'

export default function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-white font-sans">
      <Sidebar />
      <TaskList />
    </div>
  )
}
