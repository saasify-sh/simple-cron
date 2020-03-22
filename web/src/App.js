import React from 'react'
import { Spin } from 'antd'
import { sdk } from './lib/sdk'
import { DataTable } from './components'

import styles from './styles/app.module.css'

export class App extends React.Component {
  state = {
    status: 'loading'
  }

  componentDidMount() {
    sdk.ready
      .then(() => {
        this.setState({ status: 'ready' })
      })
      .catch((err) => {
        console.error(err)
        this.setState({ status: 'error' })
      })
  }

  render() {
    const { status } = this.state

    return (
      <div className={styles.body}>
        {status === 'loading' && <Spin />}
        {status === 'error' && 'Error connecting to Saasify'}
        {status === 'ready' && (
          <>
            <DataTable />
          </>
        )}
      </div>
    )
  }
}
