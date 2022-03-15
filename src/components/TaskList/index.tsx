import React, { FC } from 'react'

import {
  Box,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  Text,
} from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'

import { Task } from '../../types'
import TaskUnit from '../TaskUnit'

interface TaskListProps {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const TaskList: FC<TaskListProps> = ({ tasks, setTasks }) => {
  const completedTasks = tasks.filter((task) => task.completed)
  const pendingTasks = tasks
    .filter((task) => !task.completed)
    .sort((a, b) =>
      a.priority < b.priority //sorting by priority (the higher the priority the earlier it will be displayed)
        ? 1
        : a.priority === b.priority
        ? a.description > b.description //if priorities are equal, sort by description (A-Z)
          ? 1
          : -1
        : -1
    )
  if (tasks.length === 0) {
    return (
      <Box my={2}>
        <Text fontSize={'2xl'}>
          There are no listed tasks, please create a new one
        </Text>
      </Box>
    )
  }
  return (
    <Box h='100%' w='100%' overflow='auto' id='task-list'>
      {pendingTasks.map((task, index) => (
        <TaskUnit key={index} task={task} setTasks={setTasks} />
      ))}
      {completedTasks.length > 0 && (
        <Accordion allowMultiple my={2}>
          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton border='1px solid grey'>
                    <Box flex='1' textAlign='left'>
                      {isExpanded ? 'Hide' : 'Show'} {completedTasks.length}{' '}
                      completed tasks
                    </Box>
                    {isExpanded ? (
                      <ChevronUpIcon fontSize='12px' />
                    ) : (
                      <ChevronDownIcon fontSize='12px' />
                    )}
                  </AccordionButton>
                </h2>
                <AccordionPanel w='100%'>
                  {tasks
                    .filter((task) => task.completed)
                    .map((task, index) => (
                      <TaskUnit key={index} task={task} setTasks={setTasks} />
                    ))}
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        </Accordion>
      )}
    </Box>
  )
}

export default TaskList
