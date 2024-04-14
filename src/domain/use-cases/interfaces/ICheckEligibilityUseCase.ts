import { Either } from '@/core/either'
import { IElegibleResponse, IIneligibleResponse } from './IEligibilityResponse'

export interface ICheckEligibilityUseCaseRequest {
  documentNumber?: string
  connectionType: string
  consumptionClass: string
  taxModality: string
  consumptionHistory: number[]
}

export type ICheckEligibilityUseCaseResponse = Either<
  IIneligibleResponse,
  IElegibleResponse
>
