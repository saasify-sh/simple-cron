import SaasifyProviderSDK = require('saasify-provider-sdk')

import * as db from './db'

const token = process.env.SAASIFY_PROVIDER_TOKEN

const sdk = token ? new SaasifyProviderSDK({ token }) : null
const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV

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
  console.log('updateUsage', { userId, plan, delta, size })

  const quantity = Math.max(0, size + delta)

  if (plan === 'free') {
    if (quantity > 1 && delta >= 0) {
      if (isDev) {
        console.error('warning: disabling subscription limits')
        return
      } else {
        throw {
          message: 'Please upgrade your subscription to add more jobs.',
          status: 402
        }
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
