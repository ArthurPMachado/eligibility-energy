import { FastifyReply, FastifyRequest } from 'fastify'
import { checkEligibilitySchema } from '../schemas/checkEligibilitySchema'
import { CheckEligibilityUseCase } from '@/domain/use-cases/check-eligibility'

export async function checkEligibility(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const {
    tipoDeConexao,
    classeDeConsumo,
    modalidadeTarifaria,
    historicoDeConsumo,
  } = checkEligibilitySchema.parse(request.body)

  const checkEligibilityUseCase = new CheckEligibilityUseCase()

  const response = await checkEligibilityUseCase.execute({
    tipoDeConexao,
    classeDeConsumo,
    modalidadeTarifaria,
    historicoDeConsumo,
  })

  return reply.status(200).send(response)
}
