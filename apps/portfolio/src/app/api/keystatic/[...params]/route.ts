import { makeRouteHandler } from '@keystatic/next/route-handler'
import config, { keystaticAdminEnabled } from '../../../../../keystatic.config'

const notFound = () => new Response('Not found', { status: 404 })

export const { POST, GET } = keystaticAdminEnabled
  ? makeRouteHandler({ config })
  : { POST: notFound, GET: notFound }
