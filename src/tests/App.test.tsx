import React from 'react'
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react'

import { ChakraProvider } from '@chakra-ui/provider'

import App from '../App'
import { TaskForm } from '../components'
import { Task } from '../types'

test('checking initial states of the addtask section', () => {
  // addTask prop is not going to be tested so we can just pass an empty function
  render(<TaskForm addTask={(task: Task) => {}} />)
  const button = screen.getByRole('button', {
    name: 'Add task',
  })
  const input = screen.getByLabelText('Task') as HTMLInputElement

  //button should be disabled by default
  expect(button).toBeDisabled()

  //input should be empty by default
  expect(input.value).toBe('')

  //changing input value should enable button
  fireEvent.change(input, { target: { value: 'new task' } })

  //button should be enabled when input is not empty
  expect(button).toBeEnabled()

  //removing input value should disable button again
  fireEvent.change(input, { target: { value: '' } })

  //button should be disabled when input is empty
  expect(button).toBeDisabled()
})

//Without a localstorage mockup we ensure that there are no stored tasks

test('Task list should be initially empty', () => {
  //workaround to fix matchMedia error with chakraUI (https://stackoverflow.com/a/57180950)
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query !== '(min-width: 240px) and (max-width: 767px)',
    media: '',
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }))
  render(
    // Chakraprovider is needed to fix the issue with chakraUI
    <ChakraProvider>
      <App />
    </ChakraProvider>
  )

  //task list should be empty so there should be a message saying so
  expect(
    screen.getByText('There are no listed tasks, please create a new one')
  ).toBeInTheDocument()
})

test('Add/Complete/delete tasks', async () => {
  //workaround to fix matchMedia error with chakraUI (https://stackoverflow.com/a/57180950)
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query !== '(min-width: 240px) and (max-width: 767px)',
    media: '',
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }))
  render(
    <ChakraProvider>
      <App />
    </ChakraProvider>
  )
  const input = screen.getByLabelText('Task')
  const addButton = screen.getByRole('button', { name: 'Add task' })
  expect(input).toBeInTheDocument()
  expect(input).toHaveFocus()

  //add 3 new tasks
  fireEvent.change(input, { target: { value: 'New task' } })
  fireEvent.click(addButton)
  fireEvent.change(input, { target: { value: 'Newer task' } })
  fireEvent.click(addButton)
  fireEvent.change(input, { target: { value: 'Third task' } })
  fireEvent.click(addButton)

  const pendingTasks = screen.getAllByTestId('task-pending')
  expect(pendingTasks.length).toBe(3)

  //mark the first task as completed
  const firstTaskCheckbox = screen.getAllByRole('checkbox', {
    name: 'Mark as completed',
  })
  fireEvent.click(firstTaskCheckbox[0])

  //wait for the animation to finish check that completed tasks now should be 1
  await screen.findByTestId('task-completed')
  const completedTasks = screen.getAllByTestId('task-completed')
  expect(completedTasks.length).toBe(1)

  //check that pending tasks now should be 2
  const pendingTasks2 = screen.getAllByTestId('task-pending')
  expect(pendingTasks2.length).toBe(2)

  //delete the confirmed task
  const deleteButton = screen.getByLabelText('Delete confirmed task')
  fireEvent.click(deleteButton)

  //wait for the animation to finish check that pending tasks now should be 1
  await waitForElementToBeRemoved(() => screen.queryByTestId('task-completed'))
  expect(screen.queryAllByTestId('task-completed').length).toBe(0)
})
