import { FastifyReply, FastifyRequest } from 'fastify'
import { checkEligibilitySchema } from '../schemas/checkEligibilitySchema'
import { CheckEligibilityUseCase } from '@/domain/use-cases/check-eligibility'

export async function checkEligibility(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const {
    tipoDeConexao: connectionType,
    classeDeConsumo: consumptionClass,
    modalidadeTarifaria: taxModality,
    historicoDeConsumo: consumptionHistory,
  } = checkEligibilitySchema.parse(request.body)

  const checkEligibilityUseCase = new CheckEligibilityUseCase()

  const response = await checkEligibilityUseCase.execute({
    connectionType,
    consumptionClass,
    taxModality,
    consumptionHistory,
  })

  return reply.status(200).send(response.value)
}
