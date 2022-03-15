import { FC, useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

import {
  Box,
  Button,
  Stack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react'

import { Task, TaskPriority } from '../types'

interface TaskFormProps {
  addTask: (task: Task) => void
}

const TaskForm: FC<TaskFormProps> = ({ addTask }) => {
  const [newTaskValue, setNewTaskValue] = useState('')
  const [newTaskPriority, setNewTaskPriority] = useState<TaskPriority>('2')
  const inputRef = useRef<HTMLInputElement | null>(null)

  useHotkeys(
    'ctrl+a, command+a',
    (e) => {
      e.preventDefault() //default behaviour of ctrl+a is to select all text
      if (inputRef.current) {
        inputRef.current.focus()
      }
    },
    {},
    [inputRef]
  )

  const onClickAddTask = () => {
    const newTask: Task = {
      date: new Date(),
      description: newTaskValue,
      priority: newTaskPriority,
      completed: false,
    }
    addTask(newTask)
    setNewTaskPriority('2')
    setNewTaskValue('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <Box
      w='100%'
      bg={useColorModeValue('purple.50', 'gray.700')}
      px={2}
      py={3}
      borderRadius='md'
      display={'flex'}
      flexDirection={'column'}
      alignItems='flex-end'
    >
      <Stack
        direction={useBreakpointValue({ base: 'column', md: 'row' })}
        w='100%'
      >
        <FormControl>
          <FormLabel htmlFor='new-task' mb={0}>
            Task
          </FormLabel>
          <Input
            id='new-task'
            required
            autoFocus
            ref={inputRef}
            placeholder={useBreakpointValue({
              base: 'New task',
              md: 'New task (ctrl+A)',
            })}
            size='sm'
            value={newTaskValue}
            onChange={(e) => setNewTaskValue(e.target.value)}
          />
        </FormControl>
        <HStack w='100%' alignItems={'flex-end'} justifyContent='space-between'>
          <FormControl>
            <FormLabel htmlFor='priority' mb={0}>
              Priority
            </FormLabel>
            <Select
              size='sm'
              value={newTaskPriority}
              onChange={(e) =>
                setNewTaskPriority(e.target.value as TaskPriority)
              }
              id='priority'
            >
              <option value={'1'}> Low</option>
              <option value={'2'}>Medium</option>
              <option value={'3'}>High</option>
            </Select>
          </FormControl>
          <Button
            role={'button'}
            size={'sm'}
            colorScheme={'purple'}
            mt='auto'
            disabled={newTaskValue === ''}
            onClick={onClickAddTask}
          >
            Add task
          </Button>
        </HStack>
      </Stack>
    </Box>
  )
}

export default TaskForm
