import React, { Component } from 'react'
import cs from 'classnames'

import { ObjectInspector } from 'react-inspector'
import { Button, Table, Tag, Tooltip, notification } from 'antd'
import { format } from 'date-fns'

import { sdk } from '../../lib/sdk'

import styles from './styles.module.css'

export class JobLogsTable extends Component {
  columns = [
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      render: (timestamp) =>
        format(new Date(timestamp), 'MM/dd/yyyy HH:mm:ss OOOO')
    },
    {
      title: 'Method',
      dataIndex: 'httpMethod'
    },
    {
      title: 'URL',
      dataIndex: 'url',
      render: (url) => (
        <a href={url} target='_blank' rel='noopener noreferrer'>
          {url}
        </a>
      )
    },
    {
      title: 'Type',
      dataIndex: 'severity',
      render: (severity) => {
        switch (severity) {
          case 'INFO':
            return <Tag color='blue'>Info</Tag>
          case 'ERROR':
            return <Tag color='red'>Error</Tag>
          case 'WARN':
            return <Tag color='orange'>Warn</Tag>
          default:
            return null
        }
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => {
        if (status) {
          if (status.code) {
            return <Tooltip title={status.message}>{status.code}</Tooltip>
          } else {
            return status.message
          }
        }

        return null
      }
    }
  ]

  state = {
    data: [],
    pagination: {
      pageSize: 10
    },
    loading: true
  }

  componentDidMount() {
    this._fetch()
  }

  render() {
    const { match, className } = this.props
    const { data, pagination, loading } = this.state

    return (
      <div className={cs(styles.body, className)}>
        <h1 className={styles.title}>Job Logs - {match.params.jobId}</h1>

        <div className={styles.actions}>
          <Button
            type='secondary'
            icon='reload'
            loading={loading}
            onClick={this._onRefresh}
          >
            Refresh
          </Button>
        </div>

        <Table
          columns={this.columns}
          rowKey='id'
          dataSource={data}
          pagination={pagination}
          loading={loading}
          onChange={this._handleTableChange}
          expandedRowRender={this._renderExpandedRow}
        />
      </div>
    )
  }

  _renderExpandedRow = (record) => {
    return <ObjectInspector data={record} name='Log Entry' expandLevel={2} />
  }

  _handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({ pagination: pager })

    this._fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    })
  }

  _fetch = async (params = {}) => {
    const { jobId } = this.props.match.params
    let { data, pagination } = this.state

    if (params.reset) {
      data = []
      params.page = 0
    }

    const offset = (params.page || 0) * pagination.pageSize

    if (!params.page || offset >= data.length) {
      this.setState({ loading: true })

      const params = { limit: 100, offset }

      try {
        const { body: items } = await sdk.api.get(`/jobs/${jobId}/logs`, {
          params
        })

        const pagination = { ...this.state.pagination }

        if (!items.length) {
          pagination.total = data.length
        } else {
          data = data.concat(items)
          pagination.total = data.length
        }

        this.setState({
          loading: false,
          data,
          pagination
        })
      } catch (err) {
        console.error('error loading', err)
        this.setState({ loading: false })

        notification.error({
          message: 'Error loading logs',
          description: err?.response?.data?.error || err.message,
          duration: 10
        })
      }
    }
  }
  _onRefresh = () => {
    this._fetch({ reset: true })
  }
}
