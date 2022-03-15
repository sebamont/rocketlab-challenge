import { useEffect, useState } from 'react'

import { Container } from '@chakra-ui/react'

import { TaskForm, Header, Navbar, TasksList, TasksInfo } from './components'
import { Task } from './types'

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = (task: Task) => {
    setTasks([...tasks, task])
  }

  useEffect(() => {
    //loading tasks from localStorage
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])

  useEffect(() => {
    //updating localStorage when tasks change
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  return (
    <>
      <Navbar />
      <Container
        centerContent
        pt={3}
        maxW='container.md'
        maxH={'calc(100vh - 45px)'} // 45px = navbar height
        overflowY='hidden'
      >
        <Header />
        <TaskForm addTask={addTask} />
        <TasksInfo tasks={tasks} />
        <TasksList tasks={tasks} setTasks={setTasks} />
      </Container>
    </>
  )
}

export default App
