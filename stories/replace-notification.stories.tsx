import React from 'react'
import { Meta, Story } from '@storybook/react'
import { useNotification } from '../src'

function ReplaceNotification() {
  const { permission, error, requestPermission, notify } = useNotification()
  const notifcation = React.useRef<null | Notification>(null)
  const title = React.useRef('')

  function handleNotify() {
    title.current = title.current !== 'Hi' ? 'Hi' : 'Bye'

    notifcation.current = notify(title.current, {
      // Because this tag is static it will replace any existing notifications.
      tag: 'Replace Notification',
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
      <p>Click `Notify` more than once.</p>
      <button onClick={handleNotify}>Notify</button>
      <button onClick={handleClose}>Close Notification</button>
    </div>
  )
}

const meta: Meta = {
  title: 'Replace Notification',
  component: ReplaceNotification,
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

const Template: Story<{}> = args => <ReplaceNotification {...args} />

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({})

Default.args = {}
