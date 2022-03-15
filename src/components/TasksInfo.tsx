import { FC } from 'react'

import { Text, HStack } from '@chakra-ui/react'

import { Task } from '../types'

interface TasksInfoProps {
  tasks: Task[]
}
const TasksInfo: FC<TasksInfoProps> = ({ tasks }) => {
  const pendingTasks = tasks.filter((task) => !task.completed)
  return (
    <HStack w='100%' justifyContent={'space-around'} mt={2}>
      <Text fontSize={'xs'}>Pending tasks: {pendingTasks.length}</Text>
      <Text fontSize={'xs'}>
        Completed tasks: {tasks.length - pendingTasks.length}
      </Text>
      <Text fontSize={'xs'}>Total tasks: {tasks.length}</Text>
    </HStack>
  )
}

export default TasksInfo
