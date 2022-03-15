import { FC, useState, useRef, useEffect } from 'react'

import {
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  HStack,
  IconButton,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  DeleteIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  MinusIcon,
  EditIcon,
} from '@chakra-ui/icons'

import { Task } from '../types'

interface TaskItemProps {
  task: Task
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const TaskItem: FC<TaskItemProps> = ({ task, setTasks }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isMarkingAsComplete, setIsMarkingAsComplete] = useState(false)
  const editableRef = useRef<HTMLInputElement | null>(null)

  const toggleTaskCompleted = () => {
    setTasks((prev) =>
      prev.map((tsk) => {
        if (tsk.date === task.date) {
          tsk.completed = !tsk.completed
        }
        return tsk
      })
    )
  }

  const handleClickCheckbox = () => {
    if (task.completed) {
      return toggleTaskCompleted()
    }
    setIsMarkingAsComplete(true)
  }

  useEffect(() => {
    if (isMarkingAsComplete) {
      const timeoutId = setTimeout(() => {
        toggleTaskCompleted()
        setIsMarkingAsComplete(false)
      }, 500) //giving some time to show the animation before moving the task from pending to completed
      return () => clearTimeout(timeoutId) //clearing the timeout when the component is unmounted
    }
    //eslint-disable-next-line
  }, [isMarkingAsComplete])

  const editTaskDescription = (newDescription: string) => {
    setTasks((prev) =>
      prev.map((tsk) => {
        if (tsk.date === task.date) {
          tsk.description = newDescription
        }
        return tsk
      })
    )
    setIsEditing(false)
  }

  const handleClickDeleteTask = () => {
    setIsDeleting(true)
    //setting isDelete to true will trigger the animation (css class)
  }

  useEffect(() => {
    if (isDeleting) {
      const timeoutId = setTimeout(() => {
        setTasks((prev) => prev.filter((tsk) => tsk.date !== task.date))
        setIsDeleting(false)
      }, 500) //giving some time to show the animation before actually deleting the task
      return () => clearTimeout(timeoutId) //clearing the timeout when the component is unmounted
    }
    //eslint-disable-next-line
  }, [isDeleting])

  const handleClickEdit = () => {
    setIsEditing(true)
  }

  const getPriorityInfo = () => {
    switch (task.priority) {
      case '1':
        return {
          name: 'Low',
          icon: <ArrowDownIcon color='green.500' />,
        }
      case '3':
        return {
          name: 'High',
          icon: <ArrowUpIcon color='red.500' />,
        }
      default:
        return {
          name: 'Medium',
          icon: <MinusIcon color='gray.500' />,
        }
    }
  }

  return (
    <HStack
      data-testid={task.completed ? 'task-completed' : 'task-pending'}
      w='100%'
      h='36px'
      justifyContent={'space-between'}
      mt={1}
      px={3}
      bg={useColorModeValue('gray.50', 'gray.900')}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      className={
        isDeleting
          ? 'animate__animated animate__backOutLeft'
          : isMarkingAsComplete
          ? 'animate__animated animate__backOutDown'
          : ''
      }
    >
      <Flex w='70%' h='100%' alignItems='center'>
        <Checkbox
          colorScheme={'purple'}
          isChecked={task.completed}
          onChange={handleClickCheckbox}
          p={2}
          aria-label={
            task.completed ? 'Mark as uncompleted' : 'Mark as completed'
          }
          title={task.completed ? 'Mark as uncompleted' : 'Mark as completed'}
        />
        <Tooltip
          label={`${task.description} - ${new Date(
            task.date
          ).toLocaleDateString('en-AU')}`}
          openDelay={500}
        >
          {task.completed || !isEditing ? (
            <Text
              decoration={task.completed ? 'line-through' : 'none'}
              maxW='70%'
              isTruncated
            >
              {task.description}
            </Text>
          ) : (
            <Editable
              defaultValue={task.description}
              w='70%'
              isTruncated
              onSubmit={(newDescription: string) => {
                editTaskDescription(newDescription)
                setIsEditing(false)
              }}
              onCancel={() => setIsEditing(false)}
              startWithEditView //forcing the focus once the editable is rendered
            >
              <EditablePreview />
              <EditableInput w='100%' ref={editableRef} />
            </Editable>
          )}
        </Tooltip>
      </Flex>
      <Flex
        h='100%'
        w='25%'
        justifyContent={'space-between'}
        alignItems='center'
      >
        <Tooltip label={`Priority: ${getPriorityInfo().name}`} openDelay={500}>
          {getPriorityInfo().icon}
        </Tooltip>
        {!isEditing && !task.completed && (
          <Tooltip label={'Edit task description'} openDelay={500}>
            <IconButton
              colorScheme={'orange'}
              icon={<EditIcon />}
              onClick={handleClickEdit}
              aria-label='Edit task description'
              size={'xs'}
              variant='outline'
            />
          </Tooltip>
        )}
        <Tooltip label={'Delete'} openDelay={500}>
          <IconButton
            colorScheme={'red'}
            icon={<DeleteIcon />}
            onClick={handleClickDeleteTask}
            aria-label={
              task.completed ? 'Delete confirmed task' : 'Delete task'
            }
            size={'xs'}
            variant='outline'
          />
        </Tooltip>
      </Flex>
    </HStack>
  )
}

export default TaskItem
