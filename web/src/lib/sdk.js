import SaasifySDK from 'saasify-sdk'

export const sdk = new SaasifySDK({
  projectId: 'dev/cronic',
  deploymentId: 'dev/cronic@cf73536f',
  developmentToken: process.env.REACT_APP_SAASIFY_TOKEN
})
