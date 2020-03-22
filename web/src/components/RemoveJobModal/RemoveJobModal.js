import React, { Component } from 'react'

import { Modal, notification } from 'antd'

import { sdk } from '../../lib/sdk'

export class RemoveJobModal extends Component {
  state = {
    loading: false
  }

  render() {
    const { isOpen, job, onCancel } = this.props
    const { loading } = this.state

    return (
      <Modal
        title='Remove Job'
        visible={isOpen}
        okText='Remove'
        okType='danger'
        onOk={this._onConfirm}
        confirmLoading={loading}
        onCancel={onCancel}
      >
        {job && (
          <div>Are you sure you want to remove job "{job.name || job.id}"?</div>
        )}
      </Modal>
    )
  }

  _onConfirm = () => {
    this.setState({ loading: true })
    sdk.api
      .delete(`/jobs/${this.props.job.id}`)
      .then(this.props.onDone)
      .catch((err) => {
        console.error(err)
        this.setState({ loading: false })

        notification.error({
          message: 'Error removing job',
          description: err?.response?.data?.error || err.message,
          duration: 10000
        })
      })
  }
}
