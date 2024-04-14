import {
  ICheckEligibilityUseCaseRequest,
  ICheckEligibilityUseCaseResponse,
} from './interfaces/ICheckEligibilityUseCase'

export class CheckEligibilityUseCase {
  async execute({
    numeroDoDocumento,
    tipoDeConexao,
    classeDeConsumo,
    modailidadeTarifaria,
    historicoDeConsumo,
  }: ICheckEligibilityUseCaseRequest): Promise<ICheckEligibilityUseCaseResponse> {
    const ineligibilityReasons = []
  }
}
