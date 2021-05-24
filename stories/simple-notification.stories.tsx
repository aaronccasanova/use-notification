import React from 'react'
import { Meta, Story } from '@storybook/react'
import { useNotification } from '../src'

function SimpleNotification() {
  const { permission, error, requestPermission, notify } = useNotification()

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
      <button onClick={() => notify('Hi')}>Notify</button>
    </div>
  )
}

const meta: Meta = {
  title: 'Simple Notification',
  component: SimpleNotification,
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

const Template: Story<{}> = args => <SimpleNotification {...args} />

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({})

Default.args = {}
