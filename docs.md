# Simple Cron

## Cron Syntax

<p align="center">
  <img src="https://raw.githubusercontent.com/saasify-sh/simple-cron/master/media/cron-syntax.png" alt="Cron expression syntax" width="480" />
</p>

Simple Cron uses classic cron syntax to schedule cloud cron jobs to make HTTP calls on a regular schedule.

Here are some common examples to get you started.

| Cron Expression | Explanation                        |
| --------------- | ---------------------------------- |
| `* * * * *`     | Every minute                       |
| `0 0 * * *`     | Daily at midnight                  |
| `45 23 * * 6`   | Every Saturday at 23:45 (11:45 PM) |
| `0 9 * * 1`     | Every Monday at 09:00              |

## Dashboard

<p align="center">
  <img src="https://raw.githubusercontent.com/saasify-sh/simple-cron/master/media/docs/dashboard.png" alt="Simple Cron Dashboard" width="480" />
</p>
