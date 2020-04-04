import SaasifyProviderSDK = require('saasify-provider-sdk')

import * as db from './db'

const token = process.env.SAASIFY_PROVIDER_TOKEN

const sdk = token ? new SaasifyProviderSDK({ token }) : null

export const updateUsage = async ({ userId, plan, delta }) => {
  if (!sdk) {
    console.warn(
      'We recommend you configure "SAASIFY_PROVIDER_TOKEN" to report usage to Saasify.'
    )

    return
  }

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
