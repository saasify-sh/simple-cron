# Development Notes

## TODO

- [x] API
  - Creates and manages CronJobs
  - Hosted on ZEIT now or Google Cloud Functions
- [ ] Scheduler
  - Creates CronJobRuns from CronJobs based on their schedules
  - Hosted anywhere?
  - How to scale scheduling horizontally?
    - Post-MVP; also may not be necessary given the Runner is doing the real work
    - Easiest solution would be static N servers and round-robin
- [ ] Runner
  - Executes CronJobRuns taking them from pending => success or failure
  - Triggered by the creation of CronJobRuns in Cloud Firestore
  - Implemented via Google Cloud Functions
- [ ] SaaS
  - Bundles this cron API into a SaaS product via [Saasify](https://saasify.sh)

## Use Cases

TODOG

## Related

---

serverless cron
cloudcron

---

- https://github.com/kelektiv/node-cron - Cron for Node.js.
- https://github.com/node-cron/node-cron - A simple cron-like job scheduler for Node.js.
- https://github.com/node-schedule/node-schedule - A cron-like and not-cron-like job scheduler for Node.js.
- https://github.com/bradymholt/cronstrue - Converts cron expressions into human readable descriptions.
- https://dkron.io/
- https://github.com/shunfei/cronsun
- https://github.com/Nextdoor/ndscheduler
- http://airflow.apache.org/

AWS https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html
https://github.com/capside/CloudCron
https://docs.aws.amazon.com/AmazonECS/latest/developerguide/scheduled_tasks.html
