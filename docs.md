# Simple Cron

Simple Cron is a dead simple cloud service to make HTTP calls on a regular schedule. It is named after the classic UNIX Cron program which allowed you to schedule jobs to be run locally.

Some common use cases for cron jobs include:

- Monitoring uptime of websites or services
- Sending out reports or emails once a week
- Kicking off a backup process once a day
- Running workflows on a regular schedule
- Powering bots to automate social media

## Dashboard

<p align="center">
  <img src="https://raw.githubusercontent.com/saasify-sh/simple-cron/master/media/docs/dashboard.png" alt="Simple Cron Dashboard" />
</p>

Once you sign in, the dashboard lists all of your currently enabled and paused cron jobs.

For each job, the dashboard lists metadata, current status, the result of the job's last run, and gives you options to manage the job.

You can pause, resume, and permanently delete jobs. You can also view detailed information about a job including the result of its last run and logs for all past runs.

## Creating New Jobs

<p align="center">
  <img src="https://raw.githubusercontent.com/saasify-sh/simple-cron/master/media/docs/create-new-job-2.png" alt="Create new job dialog" width="538" />
</p>

From the dashboard, select `Add New Job` to add your first cloud cron job for free.

You can customize a cron job with the following options:

- `Name` - A short recognizable name describing this job.
- `Schedule` - A standard cron syntax expression specifying the schedule for this job. (See below for more info on cron syntax)
- `Timezone` - Timezone to run your job's schedule against.
- `HTTP URL` - The URL for this job to target.
- `HTTP Method` - The HTTP method to use when pinging the target `HTTP URL`. All HTTP methods are supported. Defaults to `GET`.

The following notification channels are available for job failures:

- `Email` - Email address for notifications related to this job.
- `Slack URL` - Slack webhook URL for notifications related to this job.
  - Follow this [guide](https://api.slack.com/tutorials/slack-apps-hello-world) to create a new Slack App with an incoming webhook that will post to a specific workspace and channel.
  - Your incoming webhook URL should resemble `https://hooks.slack.com/services/XXX/YYY/ZZZZZZZZ`.

Upon creating a new job, it will begin executing automatically according to its schedule. If you expect a job to have run, you can refresh the dashboard and view its logs to ensure everything it working properly.

## Upgrading

<p align="center">
  <img src="https://raw.githubusercontent.com/saasify-sh/simple-cron/master/media/docs/error-creating-job.png" alt="Error creating job" width="412" />
</p>

If you get an error when you try to create a new job, then you've run out of free jobs and will need to [upgrade your account](/pricing) to continue.

## Cron Syntax

<p align="center">
  <img src="https://raw.githubusercontent.com/saasify-sh/simple-cron/master/media/cron-syntax.png" alt="Cron expression syntax" width="420" />
</p>

Simple Cron uses classic UNIX cron syntax to schedule cloud cron jobs to make HTTP calls on a regular schedule.

Here are some common examples to get you started.

| Cron Expression | Explanation                        |
| --------------- | ---------------------------------- |
| `* * * * *`     | Every minute                       |
| `0 0 * * *`     | Daily at midnight                  |
| `45 23 * * 6`   | Every Saturday at 23:45 (11:45 PM) |
| `0 9 * * 1`     | Every Monday at 09:00              |

## Job Detail

<p align="center">
  <img src="https://raw.githubusercontent.com/saasify-sh/simple-cron/master/media/docs/job-detail.png" alt="Cron job detail" />
</p>

From the dashboard, you can click the `+` icon to the left of any job to view its full JSON metadata in detail.

## Job Logs

<p align="center">
  <img src="https://raw.githubusercontent.com/saasify-sh/simple-cron/master/media/docs/job-logs.png" alt="Cron job logs" />
</p>

From the dashboard, you can click `View Logs` on any job to view the full history of its call logs.

## Job Logs Detail

<p align="center">
  <img src="https://raw.githubusercontent.com/saasify-sh/simple-cron/master/media/docs/job-logs-detail.png" alt="Cron job logs detail" />
</p>

From the Job Logs screen, you can click the `+` icon to the left of any call log to view its full JSON metadata in detail.

## REST API

In addition to the dashboard UI, all of Simple Cron's functionality is easily accessible via a straightforward REST API.

Pricing for the API is the same as using the dashboard:

- You're billed based on the number of cron jobs you use.
- Cron jobs have no limit to the number of executions they're allowed to run.
- You're allowed one free cron job with an unlimited number of executions per month.

## Roadmap

In the near future, we'll be adding support for:

- Webhook notifications for job failures
- Customizable HTTP bodies for PUT and POST requests
- Customizable HTTP headers
- Customizable retry logic
- Customizable success / fail logic
- More control over notifications
- Job analytics over time

Have a use case or feature request not listed here? Please don't hesitate to [email us](mailto:support@saasify.sh).
