import React from 'react'
import { Meta, Story } from '@storybook/react'
import { useNotification } from '../src'

function StackedNotifications() {
  const { permission, error, requestPermission, notify } = useNotification()
  const notifications = React.useRef<Notification[]>([])

  function handleNotify() {
    const notification = notify('Hi')

    if (notification) {
      notifications.current.push(notification)
    }
  }

  function handleClose() {
    notifications.current.pop()?.close()
  }

  if (error) {
    return (
      <div>
        Notification Error:
        <pre>{error.message}</pre>
      </div>
    )
  }

  return (
    <div>
      {permission === 'default' && (
        <button onClick={requestPermission}>Enable Notifications</button>
      )}
      <p>Click `Notify` more than once. (Notice they are stacked.)</p>
      <button onClick={handleNotify}>Notify</button>
      <p>`Close Notifications` will close the notifications in order.</p>
      <button onClick={handleClose}>Close Notifications</button>
    </div>
  )
}

const meta: Meta = {
  title: 'Stacked Notifications',
  component: StackedNotifications,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

const Template: Story<{}> = args => <StackedNotifications {...args} />

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({})

Default.args = {}
