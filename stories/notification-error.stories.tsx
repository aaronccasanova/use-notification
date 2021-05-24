import React from 'react'
import { Meta, Story } from '@storybook/react'
import { useNotification } from '../src'

function NotificationError() {
  const { permission, error, requestPermission, notify } = useNotification()
  const notifcation = React.useRef<null | Notification>(null)

  function handleNotify() {
    notifcation.current = notify('Hi', {
      // This will through an error because the `renotify` option requires a
      // non-empty `tag` option is set.
      renotify: true,
    })
  }

  function handleClose() {
    notifcation.current?.close()
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
      <button onClick={handleNotify}>Notify</button>
      <button onClick={handleClose}>Close Notification</button>
    </div>
  )
}

const meta: Meta = {
  title: 'Notification Error',
  component: NotificationError,
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

const Template: Story<{}> = args => <NotificationError {...args} />

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({})

Default.args = {}
