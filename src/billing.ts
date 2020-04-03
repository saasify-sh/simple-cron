import SaasifyProviderSDK = require('saasify-provider-sdk')

import * as db from './db'

const sdk = new SaasifyProviderSDK({
  token: process.env.SAASIFY_PROVIDER_TOKEN
})

export const updateUsage = async ({ userId, plan, delta }) => {
  console.time('updateUsage getUserJobDocs')
  const { size } = await db.getUserJobDocs({ userId })
  console.timeEnd('updateUsage getUserJobDocs')

  const quantity = size + delta

  if (plan === 'free') {
    if (quantity >= 1 && delta >= 0) {
      throw {
        message: 'Please upgrade your subscription to add more jobs.',
        status: 402
      }
    }
  } else {
    return sdk.updateUsage({
      metric: 'jobs',
      user: userId,
      quantity
    })
  }
}
