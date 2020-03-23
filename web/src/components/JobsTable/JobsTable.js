import React, { Component } from 'react'
import cs from 'classnames'
import cronstrue from 'cronstrue'

import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { ObjectInspector } from 'react-inspector'
import {
  Button,
  Divider,
  Modal,
  Table,
  Tag,
  Tooltip,
  message,
  notification
} from 'antd'

import { NewJobForm } from '../NewJobForm/NewJobForm'
import { RemoveJobModal } from '../RemoveJobModal/RemoveJobModal'
import { sdk } from '../../lib/sdk'

import styles from './styles.module.css'

export class JobsTable extends Component {
  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (id) => <b>{id}</b>
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      render: (timestamp) => (
        <Tooltip
          title={format(new Date(timestamp), 'MM/dd/yyyy HH:mm:ss OOOO')}
        >
          {format(new Date(timestamp), 'MM/dd/yyyy')}
        </Tooltip>
      )
    },
    {
      title: 'Schedule',
      dataIndex: 'schedule',
      render: (schedule, job) => (
        <Tooltip
          title={`${cronstrue.toString(schedule)} (${job.timezone} timezone)`}
        >
          {schedule}
        </Tooltip>
      )
    },
    {
      title: 'Method',
      dataIndex: 'httpMethod'
    },
    {
      title: 'URL',
      dataIndex: 'url',
      ellipsis: true,
      width: '12em',
      render: (url) => (
        <Tooltip title={url}>
          <a href={url} target='_blank' rel='noopener noreferrer'>
            {url}
          </a>
        </Tooltip>
      )
    },
    {
      title: 'Status',
      dataIndex: 'state',
      render: (state) => {
        switch (state) {
          case 'enabled':
            return <Tag color='green'>Enabled</Tag>
          case 'disabled':
            return <Tag color='red'>Disabled</Tag>
          case 'paused':
            return <Tag color='orange'>Paused</Tag>
          default:
            return <Tag color='purple'>Unknown</Tag>
        }
      }
    },
    {
      title: 'Last Run',
      dataIndex: 'lastAttemptTime',
      render: (timestamp) =>
        timestamp ? (
          <Tooltip
            title={format(new Date(timestamp), 'MM/dd/yyyy HH:mm:ss OOOO')}
          >
            {format(new Date(timestamp), 'MM/dd/yyyy')}
          </Tooltip>
        ) : null
    },
    {
      title: 'Result',
      dataIndex: 'status',
      render: (status) =>
        status ? (
          <Tooltip title={status.message}>
            {status.code !== 200 ? <b>{status.code}</b> : status.code}
          </Tooltip>
        ) : null
    },
    {
      title: 'Logs',
      render: (text, record) => <Link to={`/${record.id}`}>View Logs</Link>
    },
    {
      title: 'Actions',
      render: (_, job) => (
        <span>
          {job.state === 'enabled' && (
            <a
              onClick={(event) =>
                this._onUpdateJob(event, job, { state: 'paused' })
              }
            >
              Pause
            </a>
          )}

          {job.state === 'paused' && (
            <a
              onClick={(event) =>
                this._onUpdateJob(event, job, { state: 'enabled' })
              }
            >
              Resume
            </a>
          )}

          <Divider type='vertical' />

          <a onClick={(event) => this._onOpenRemoveJobModal(event, job)}>
            Delete
          </a>
        </span>
      )
    }
  ]

  state = {
    data: [],
    pagination: {
      pageSize: 10
    },
    loading: true,
    isOpenAddNewJobModal: false,
    isOpenRemoveJobModal: false,
    selectedJob: null
  }

  componentDidMount() {
    this._fetch()
  }

  render() {
    const { className } = this.props
    const {
      data,
      pagination,
      loading,
      isOpenAddNewJobModal,
      isOpenRemoveJobModal,
      selectedJob
    } = this.state

    return (
      <div className={cs(styles.body, className)}>
        <h1 className={styles.title}>Scheduled Jobs</h1>

        <div className={styles.actions}>
          <Button
            type='secondary'
            icon='reload'
            loading={loading}
            onClick={this._onRefresh}
          >
            Refresh
          </Button>

          <Button
            type='primary'
            className={styles.addJobButton}
            onClick={this._onOpenAddNewJobModal}
          >
            Add New Job
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
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                this.props.history.push(`/${record.id}`)
              }
            }
          }}
        />

        <Modal
          title='Add New Job'
          visible={isOpenAddNewJobModal}
          footer={null}
          onCancel={this._onCloseAddNewJobModal}
        >
          {isOpenAddNewJobModal && (
            <NewJobForm
              onCancel={this._onCloseAddNewJobModal}
              onDone={this._onDoneAddNewJobModal}
            />
          )}
        </Modal>

        {isOpenRemoveJobModal && (
          <RemoveJobModal
            isOpen={isOpenRemoveJobModal}
            job={selectedJob}
            onCancel={this._onCloseRemoveJobModal}
            onDone={this._onDoneRemoveJobModal}
          />
        )}
      </div>
    )
  }

  _renderExpandedRow = (record) => {
    return <ObjectInspector data={record} name='Job' expandLevel={2} />
  }

  _handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({ pagination: pager })

    this._fetch({
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    })
  }

  _fetch = async (params = {}) => {
    let { data, pagination } = this.state

    if (params.reset) {
      data = []
      params.page = 0
    }

    const offset = (params.page || 0) * pagination.pageSize

    if (!params.page || offset >= data.length) {
      this.setState({ loading: true })

      const params = { limit: 25, offset }

      try {
        const { body: items } = await sdk.api.get('/jobs', {
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
        this.setState({
          loading: false
        })
      }
    }
  }

  _onRefresh = () => {
    this._fetch({ reset: true })
  }

  _onOpenAddNewJobModal = () => {
    this.setState({ isOpenAddNewJobModal: true })
  }

  _onDoneAddNewJobModal = () => {
    this._onRefresh()
    this._onCloseAddNewJobModal()
  }

  _onCloseAddNewJobModal = () => {
    this.setState({ isOpenAddNewJobModal: false })
  }

  _onOpenRemoveJobModal = (event, job) => {
    event.stopPropagation()
    this.setState({ isOpenRemoveJobModal: true, selectedJob: job })
  }

  _onDoneRemoveJobModal = () => {
    this._onRefresh()
    this._onCloseRemoveJobModal()
  }

  _onCloseRemoveJobModal = () => {
    this.setState({ isOpenRemoveJobModal: false })
  }

  _onUpdateJob = (event, job, data) => {
    event.stopPropagation()
    this.setState({ loading: true })

    sdk.api
      .put(`/jobs/${job.id}`, { data })
      .then(() => {
        message.success('Job updated')
        this._onRefresh()
      })
      .catch((err) => {
        console.error(err)
        this.setState({ loading: false })

        notification.error({
          message: 'Error updating job',
          description: err?.response?.data?.error || err.message,
          duration: 10
        })
      })
  }
}
