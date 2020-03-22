import React, { Component } from 'react'
import cs from 'classnames'

import { format } from 'date-fns'
import { Button, Divider, Modal, Table, Tag } from 'antd'

import { Paper } from '../Paper/Paper'
import { NewJobForm } from '../NewJobForm/NewJobForm'
import { RemoveJobModal } from '../RemoveJobModal/RemoveJobModal'
import { sdk } from '../../lib/sdk'

import styles from './styles.module.css'

export class DataTable extends Component {
  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (id) => <b>{id}</b>
    },
    // {
    //   title: 'ID',
    //   dataIndex: 'id',
    //   render: (id) => <i>{id}</i>
    // },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      render: (timestamp) => format(new Date(timestamp), 'MM/dd/yyyy')
    },
    {
      title: 'Schedule',
      dataIndex: 'schedule'
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
      title: 'Method',
      dataIndex: 'httpMethod'
    },
    {
      title: 'State',
      dataIndex: 'state',
      render: (state) => {
        switch (state) {
          case 'enabled':
            return <Tag color='green'>enabled</Tag>
          case 'disabled':
            return <Tag color='red'>disabled</Tag>
          case 'paused':
            return <Tag color='orange'>paused</Tag>
          default:
            return <Tag color='purple'>unknown</Tag>
        }
      }
    },
    {
      title: 'Actions',
      render: (_, job) => (
        <span>
          <a>TODO</a>
          <Divider type='vertical' />
          <a onClick={() => this._onOpenRemoveJobModal(job)}>Delete</a>
        </span>
      )
    }
  ]

  state = {
    data: [],
    pagination: {
      pageSize: 25
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
    const { className, ...rest } = this.props
    const {
      data,
      pagination,
      loading,
      isOpenAddNewJobModal,
      isOpenRemoveJobModal,
      selectedJob
    } = this.state

    return (
      <Paper className={cs(styles.body, className)} {...rest}>
        <h2 className={styles.title}>Scheduled Jobs</h2>

        <div style={{ alignSelf: 'flex-end', marginBottom: '1em' }}>
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

        <RemoveJobModal
          isOpen={isOpenRemoveJobModal}
          job={selectedJob}
          onCancel={this._onCloseRemoveJobModal}
          onDone={this._onDoneRemoveJobModal}
        />
      </Paper>
    )
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
    let { data, pagination } = this.state

    if (params.reset) {
      data = []
      params.page = 0
    }

    const offset = (params.page || 0) * pagination.pageSize

    if (!params.page || offset >= data.length) {
      this.setState({ loading: true })

      const params = { limit: pagination.pageSize, offset }

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

  _onOpenAddNewJobModal = () => {
    this.setState({ isOpenAddNewJobModal: true })
  }

  _onDoneAddNewJobModal = () => {
    this._fetch({ reset: true })
    this._onCloseAddNewJobModal()
  }

  _onCloseAddNewJobModal = () => {
    this.setState({ isOpenAddNewJobModal: false })
  }

  _onOpenRemoveJobModal = (job) => {
    this.setState({ isOpenRemoveJobModal: true, selectedJob: job })
  }

  _onDoneRemoveJobModal = () => {
    this._fetch({ reset: true })
    this._onCloseRemoveJobModal()
  }

  _onCloseRemoveJobModal = () => {
    this.setState({ isOpenRemoveJobModal: false })
  }
}
