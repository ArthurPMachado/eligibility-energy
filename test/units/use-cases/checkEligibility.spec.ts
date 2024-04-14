import { CheckEligibilityUseCase } from '@/domain/use-cases/check-eligibility'
import { IneligibilityReasons } from '@/domain/use-cases/enums/ineligibilityReasons'
import { ICheckEligibilityUseCaseRequest } from '@/domain/use-cases/interfaces/ICheckEligibilityUseCase'
import { consumptionHistory } from 'test/data/consumptionHistory'

const checkEligibilityBody = {
  documentNumber: '12345678901',
  connectionType: 'monofasico',
  consumptionClass: 'industrial',
  taxModality: 'branca',
  consumptionHistory,
} as ICheckEligibilityUseCaseRequest

describe('Check Eligibility Use Case', () => {
  it('should be able to check eligibility', async () => {
    const checkEligibilityUseCase = new CheckEligibilityUseCase()

    const result = await checkEligibilityUseCase.execute(checkEligibilityBody)

    expect(result.isRight()).toEqual(true)
    expect(result.value).toEqual({
      elegivel: true,
      economiaAnualDeCO2: expect.any(Number),
    })
  })

  it('should be able to make ineligible if the consumption class is not eligible', async () => {
    const checkEligibilityBodyIneligibleConsumption = {
      ...checkEligibilityBody,
      consumptionClass: 'rural',
    }

    const checkEligibilityUseCase = new CheckEligibilityUseCase()

    const result = await checkEligibilityUseCase.execute(
      checkEligibilityBodyIneligibleConsumption,
    )

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toEqual({
      elegivel: false,
      razoesDeInelegibilidade: [IneligibilityReasons.INVALID_CONSUMPTION_CLASS],
    })
  })

  it('should be able to make ineligible if the tax modality is not eligible', async () => {
    const checkEligibilityBodyIneligibleTaxModality = {
      ...checkEligibilityBody,
      taxModality: 'azul',
    }

    const checkEligibilityUseCase = new CheckEligibilityUseCase()

    const result = await checkEligibilityUseCase.execute(
      checkEligibilityBodyIneligibleTaxModality,
    )

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toEqual({
      elegivel: false,
      razoesDeInelegibilidade: [IneligibilityReasons.INVALID_TAX_MODALITY],
    })
  })

  it('should be able to make ineligible if the consumption is lower than the minimum allowed', async () => {
    const checkEligibilityBodyIneligibleLowConsumption = {
      ...checkEligibilityBody,
      consumptionHistory: [100, 300, 500, 100, 100, 50],
    }

    const checkEligibilityUseCase = new CheckEligibilityUseCase()

    const result = await checkEligibilityUseCase.execute(
      checkEligibilityBodyIneligibleLowConsumption,
    )

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toEqual({
      elegivel: false,
      razoesDeInelegibilidade: [
        IneligibilityReasons.LOW_POWER_PHASE_CONSUMPTION,
      ],
    })
  })

  it('should be able to make ineligible for all rules', async () => {
    const checkEligibilityBodyIneligibleAllRules = {
      ...checkEligibilityBody,
      consumptionClass: 'poderPublico',
      taxModality: 'verde',
      connectionType: 'trifasico',
      consumptionHistory: [812, 300, 2467, 100, 100, 50],
    }

    const checkEligibilityUseCase = new CheckEligibilityUseCase()

    const result = await checkEligibilityUseCase.execute(
      checkEligibilityBodyIneligibleAllRules,
    )

    expect(result.isRight()).toEqual(false)
    expect(result.value).toEqual({
      elegivel: false,
      razoesDeInelegibilidade: [
        IneligibilityReasons.INVALID_CONSUMPTION_CLASS,
        IneligibilityReasons.INVALID_TAX_MODALITY,
        IneligibilityReasons.LOW_POWER_PHASE_CONSUMPTION,
      ],
    })
  })
})
