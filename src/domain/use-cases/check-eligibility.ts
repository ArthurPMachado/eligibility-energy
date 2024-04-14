import {
  ICheckEligibilityUseCaseRequest,
  ICheckEligibilityUseCaseResponse,
} from './interfaces/ICheckEligibilityUseCase'
import { IneligibilityReasons } from './enums/ineligibilityReasons'
import { eligibleConsumptions } from '@/core/constants/classConsumption'
import { eligibleTaxModalities } from '@/core/constants/taxModality'
import { left } from '@/core/either'

export class CheckEligibilityUseCase {
  async execute({
    numeroDoDocumento,
    tipoDeConexao,
    classeDeConsumo,
    modailidadeTarifaria,
    historicoDeConsumo,
  }: ICheckEligibilityUseCaseRequest): Promise<ICheckEligibilityUseCaseResponse> {
    const ineligibilityReasons: string[] = []

    if (!eligibleConsumptions[classeDeConsumo]) {
      ineligibilityReasons.push(IneligibilityReasons.INVALID_CONSUMPTION_CLASS)
    }

    if (!eligibleTaxModalities[modailidadeTarifaria]) {
      ineligibilityReasons.push(IneligibilityReasons.INVALID_TAX_MODALITY)
    }

    // TODO: implement utils to calculate power consumption (reduce)
    // TODO; check eligibility of power consumption based on energy type connection
    // TODO: implement utils to calculateCO2 economy

    if (ineligibilityReasons.length > 0) {
      const response = {
        elegivel: false,
        razoesDeInelegibilidade: ineligibilityReasons,
      }

      return left(response)
    }
  }
}
