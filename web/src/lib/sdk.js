import SaasifySDK from 'saasify-sdk'

export const sdk = new SaasifySDK({
  projectId: 'dev/cronic',
  deploymentId: 'dev/cronic@38c5d594',
  developmentToken: process.env.REACT_APP_SAASIFY_TOKEN
})
