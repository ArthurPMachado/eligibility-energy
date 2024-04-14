import {
  ICheckEligibilityUseCaseRequest,
  ICheckEligibilityUseCaseResponse,
} from './interfaces/ICheckEligibilityUseCase'
import { IneligibilityReasons } from './enums/ineligibilityReasons'
import { eligibleConsumptions } from '@/core/constants/classConsumption'
import { eligibleTaxModalities } from '@/core/constants/taxModality'
import { left, right } from '@/core/either'
import { getTotalPowerConsumption } from '@/utils/getTotalPowerConsumption'
import { energyConnectionTypes } from '@/core/constants/energyConnection'
import { getCO2Economy } from '@/utils/getCO2Economy'

export class CheckEligibilityUseCase {
  async execute({
    connectionType,
    consumptionClass,
    taxModality,
    consumptionHistory,
  }: ICheckEligibilityUseCaseRequest): Promise<ICheckEligibilityUseCaseResponse> {
    const ineligibilityReasons: string[] = []

    const isIneligibleConsumption = !eligibleConsumptions[consumptionClass]

    if (isIneligibleConsumption) {
      ineligibilityReasons.push(IneligibilityReasons.INVALID_CONSUMPTION_CLASS)
    }

    const isIneligibleTaxModality = !eligibleTaxModalities[taxModality]

    if (isIneligibleTaxModality) {
      ineligibilityReasons.push(IneligibilityReasons.INVALID_TAX_MODALITY)
    }

    const powerConsumption = getTotalPowerConsumption(consumptionHistory)
    const averagePowerConsumption = powerConsumption / consumptionHistory.length

    if (averagePowerConsumption < energyConnectionTypes[connectionType]) {
      ineligibilityReasons.push(
        IneligibilityReasons.LOW_POWER_PHASE_CONSUMPTION,
      )
    }

    if (ineligibilityReasons.length > 0) {
      const response = {
        elegivel: false,
        razoesDeInelegibilidade: ineligibilityReasons,
      }

      return left(response)
    }

    const co2Economy = getCO2Economy(powerConsumption)

    const response = {
      elegivel: true,
      economiaAnualDeCO2: co2Economy,
    }

    return right(response)
  }
}
