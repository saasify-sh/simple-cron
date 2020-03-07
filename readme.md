# Cronic

> Dead simple cron service for making HTTP calls on a regular schedule.

[![Build Status](https://travis-ci.com/saasify-sh/cronic.svg?branch=master)](https://travis-ci.com/saasify-sh/cronic) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Features

- 💯 **Open source**
- 💪 Scales "infinitely" via serverless and Google Cloud Firestore
- 🤖 An OpenAPI spec is auto-generated from the code
- 💰 [Saasify](https://saasify.sh) makes it easy to monetize these types of APIs

## Local Usage

```bash
# install dependencies
yarn
```

TODO

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

---

- https://github.com/kelektiv/node-cron - Cron for Node.js.
- https://github.com/node-cron/node-cron - A simple cron-like job scheduler for Node.js.
- https://github.com/node-schedule/node-schedule - A cron-like and not-cron-like job scheduler for Node.js.
- https://github.com/bradymholt/cronstrue - Converts cron expressions into human readable descriptions.
- https://dkron.io/
- https://github.com/shunfei/cronsun
- https://github.com/Nextdoor/ndscheduler
- http://airflow.apache.org/

## License

MIT © [Saasify](https://saasify.sh)
