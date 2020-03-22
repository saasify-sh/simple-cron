import SaasifySDK from 'saasify-sdk'

export const sdk = new SaasifySDK({
  projectId: 'dev/cronic',
  deploymentId: 'dev/cronic@0bee417d',
  developmentToken: process.env.REACT_APP_SAASIFY_TOKEN
})
