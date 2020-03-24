import SaasifySDK from 'saasify-sdk'

export const sdk = new SaasifySDK({
  projectId: 'dev/simple-cron',
  deploymentId: 'dev/simple-cron@dc93486c', // TODO; this should be a development-only property since it'll be inferred in production
  developmentToken: process.env.REACT_APP_SAASIFY_TOKEN,
  developmentTargetUrl: 'http://localhost:4000'
})
