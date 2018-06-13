import { IncomingMessage, ServerResponse } from 'http'

const fromEnvironment = () => {
  const apiKeys = process.env.API_KEYS
  if (!apiKeys) {
    throw new Error('No API_KEYS key available in environment.')
  }

  try {
    return JSON.parse(apiKeys)
  } catch (error) {
    throw new Error(`Cannot parse API_KEYS from env ${error.stack}`)
  }
}

const fromHeader = (req: IncomingMessage) => {
  if (!req.headers.authorization) {
    throw new Error('No Authorization header present.')
  }

  if (!req.headers.authorization.includes('Bearer ')) {
    throw new Error('No Bearer prefix in Auhtorization header.')
  }

  return req.headers.authorization.split('Bearer ')[1]
}

export default (
  getValidApiKeys: () => string[] = fromEnvironment,
  getApiKey: (req: IncomingMessage) => string = fromHeader,
) => (
  fn: (req: IncomingMessage, res: ServerResponse) => void
) => (req: IncomingMessage, res: ServerResponse) => {
  const keys = getValidApiKeys()
  const key = getApiKey(req)
  const hasPermission = keys.includes(key)
  if (!hasPermission) {
    throw new Error('Permission Denied')
  }

  return fn(req, res)
}
