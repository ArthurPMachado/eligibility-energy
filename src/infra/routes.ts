import { FastifyInstance } from 'fastify'
import { checkEligibility } from './controllers/checkEligibility'

export async function routes(app: FastifyInstance) {
  app.get('/health', async () => {
    return { status: 'ok' }
  })

  app.post('/eligibility', checkEligibility)
}
