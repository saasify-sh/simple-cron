import SaasifySDK from 'saasify-sdk'

export const sdk = new SaasifySDK({
  projectId: 'dev/simple-cron',
  // TODO; this should be a development-only property as well since it'll be inferred in production
  deploymentId: 'dev/simple-cron@dev',
  developmentToken: process.env.REACT_APP_SAASIFY_TOKEN,
  developmentTargetUrl: 'http://localhost:4000'
})
