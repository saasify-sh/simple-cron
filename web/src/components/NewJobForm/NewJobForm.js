import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cs from 'classnames'
import { isValidCron } from 'cron-validator'
import { minimalTimezoneSet } from 'compact-timezone-list'

import {
  Button,
  Divider,
  Form,
  Icon,
  Input,
  Select,
  Tooltip,
  notification
} from 'antd'

import { sdk } from '../../lib/sdk'

import styles from './styles.module.css'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  }
}

@Form.create()
export class NewJobForm extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    className: PropTypes.string,
    onCancel: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    loading: false
  }

  render() {
    const { className, form } = this.props
    const { getFieldDecorator } = form
    const { loading } = this.state

    return (
      <Form className={cs(styles.form, className)} onSubmit={this._onSubmit}>
        <Form.Item label='Name' {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [
              { required: true, message: 'Please enter a name for this job.' }
            ]
          })(<Input placeholder='Name' />)}
        </Form.Item>

        {/* <Form.Item label='Description' {...formItemLayout}>
          {getFieldDecorator('description')(
            <Input placeholder='Description' />
          )}
        </Form.Item> */}

        <Form.Item label='Cron Schedule' {...formItemLayout}>
          {getFieldDecorator('schedule', {
            initialValue: '* * * * *',
            rules: [
              {
                required: true,
                message: 'Please enter a cron schedule.'
              },
              {
                validator: (rule, value, cb) => {
                  if (!isValidCron(value)) {
                    return cb('Please enter a valid cron expression.')
                  } else {
                    return cb()
                  }
                }
              }
            ]
          })(
            <Input
              placeholder='Cron expression'
              suffix={
                <Tooltip title='Use standard cron syntax'>
                  <Icon
                    type='info-circle'
                    style={{ color: 'rgba(0,0,0,.45)' }}
                  />
                </Tooltip>
              }
            />
          )}
        </Form.Item>

        <Form.Item label='Timezone' {...formItemLayout}>
          {getFieldDecorator('timezone', {
            initialValue: 'America/New_York'
          })(
            <Select>
              {minimalTimezoneSet.map((tz) => (
                <Select.Option key={tz.tzCode} value={tz.tzCode}>
                  {tz.label}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Divider>HTTP Target</Divider>

        <Form.Item label='HTTP URL' {...formItemLayout}>
          {getFieldDecorator('url', {
            rules: [
              {
                required: true,
                message: 'Please enter a URL to target.'
              },
              {
                type: 'url',
                message: 'Please enter a valid URL.'
              }
            ]
          })(<Input placeholder='URL' />)}
        </Form.Item>

        <Form.Item label='HTTP Method' {...formItemLayout}>
          {getFieldDecorator('httpMethod', {
            initialValue: 'GET'
          })(
            <Select>
              <Select.Option value='GET'>GET</Select.Option>
              <Select.Option value='POST'>POST</Select.Option>
              <Select.Option value='PUT'>PUT</Select.Option>
              <Select.Option value='DELETE'>DELETE</Select.Option>
              <Select.Option value='PATCH'>PATCH</Select.Option>
              <Select.Option value='HEAD'>HEAD</Select.Option>
              <Select.Option value='OPTIONS'>OPTIONS</Select.Option>
            </Select>
          )}
        </Form.Item>

        {/* TODO: add httpHeaders, httpBody, and httpQuery */}

        <Divider onClick={this._onToggleNotifications}>Notifications</Divider>

        {/* <div
          className={cs(
            styles.collapsible,
            this.state.isNotificationsVisible && styles.expanded
          )}
        > */}
        <Form.Item label='Email' {...formItemLayout}>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'Please enter a valid email.'
              }
            ]
          })(<Input placeholder='Notification email' />)}
        </Form.Item>

        <Form.Item label='Slack URL' {...formItemLayout}>
          {getFieldDecorator('slackWebhookUrl', {
            rules: [
              {
                type: 'url',
                message: 'Please enter a valid URL.'
              },
              {
                validator: (rule, value, cb) => {
                  if (
                    value &&
                    !value.startsWith('https://hooks.slack.com/services/')
                  ) {
                    return cb(
                      'Please enter a valid Slack webhook URL: https://hooks.slack.com/services/...'
                    )
                  } else {
                    return cb()
                  }
                }
              }
            ]
          })(<Input placeholder='Slack webhook URL' />)}
        </Form.Item>

        <div className={styles.footer}>
          <Button onClick={this.props.onCancel}>Cancel</Button>

          <Button
            type='primary'
            htmlType='submit'
            className={styles.submit}
            loading={loading}
            onClick={this._onSubmit}
          >
            Create New Job
          </Button>
        </div>
      </Form>
    )
  }

  _onSubmit = (e) => {
    e.preventDefault()

    this.props.form.validateFields((err, data) => {
      if (!err) {
        this.setState({ loading: true })

        sdk.api
          .post('/jobs', { data })
          .then(this.props.onDone)
          .catch((err) => {
            console.error(err)
            this.setState({ loading: false })

            notification.error({
              message: 'Error creating job',
              description: err?.response?.data?.error || err.message,
              duration: 10
            })

            if (err?.response?.status === 402) {
              this.props.onCancel()
            }
          })
      }
    })
  }
}
