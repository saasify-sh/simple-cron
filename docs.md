# Simple Cron

## Dashboard

<p align="center">
  <img src="https://raw.githubusercontent.com/saasify-sh/simple-cron/master/media/docs/dashboard.png" alt="Simple Cron Dashboard" />
</p>

The dashboard lists all of your currently enabled and paused cron jobs. Click `Create New Job` to add your first cloud cron job for free.

For each job, the dashboard lists metadata and current status, the result of the job's last run, and gives you options to manage the job.

You can pause, resume, and permanently delete jobs. You can also view detailed information about a job including the result of its last run and logs for all past runs.

## Creating New Jobs

<p align="center">
  <img src="https://raw.githubusercontent.com/saasify-sh/simple-cron/master/media/jobs/create-new-job.png" alt="Create new job dialog" width="420" />
</p>

To create a new cloud cron job, you need to enter three required fields:

- `Name` - A short recognizable name describing this job.
- `Schedule` - A standard cron syntax expression specifying the schedule for this job. (See below for more info on cron syntax)
- `HTTP URL` - A URL for this cron job to target.

You may also specify a few optional fields:

- `Description` - A longer description of the job.
- `HTTP Method` - The HTTP method to use when pinging the target `HTTP URL`. Defaults to `GET` but you may use any valid HTTP method.

Upon creating a new job, it will begin executing automatically according to its schedule. If you expect a job to have run, you can refresh the dashboard and view its logs to ensure everything it working properly.

## Cron Syntax

<p align="center">
  <img src="https://raw.githubusercontent.com/saasify-sh/simple-cron/master/media/cron-syntax.png" alt="Cron expression syntax" width="420" />
</p>

Simple Cron uses classic cron syntax to schedule cloud cron jobs to make HTTP calls on a regular schedule.

Here are some common examples to get you started.

| Cron Expression | Explanation                        |
| --------------- | ---------------------------------- |
| `* * * * *`     | Every minute                       |
| `0 0 * * *`     | Daily at midnight                  |
| `45 23 * * 6`   | Every Saturday at 23:45 (11:45 PM) |
| `0 9 * * 1`     | Every Monday at 09:00              |

All cron jobs currently use the GMT-4 (America/New York) timezone. If you'd like to use a different timezone to run your job(s), please contact support.

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
