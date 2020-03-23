import SaasifySDK from 'saasify-sdk'

export const sdk = new SaasifySDK({
  projectId: 'dev/cronic',
  deploymentId: 'dev/cronic@dc93486c',
  developmentToken: process.env.REACT_APP_SAASIFY_TOKEN,
  developmentTargetUrl: 'http://localhost:4000'
})
