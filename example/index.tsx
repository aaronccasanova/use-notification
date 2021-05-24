import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useNotification } from '../src'

const App = () => {
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

ReactDOM.render(<App />, document.getElementById('root'))
